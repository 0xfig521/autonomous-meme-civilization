import { useState } from "react";
import type { Signer } from "@mysten/sui/cryptography";
import type { CivilizationWalrusData } from "../types/walrus";

let clientPromise: Promise<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  client: any;
  WalrusFile: typeof import("@mysten/walrus").WalrusFile;
}> | null = null;

async function getClient() {
  if (!clientPromise) {
    clientPromise = Promise.all([import("@mysten/sui/grpc"), import("@mysten/walrus")]).then(
      ([grpc, walrusMod]) => {
        const client = new grpc.SuiGrpcClient({
          network: "testnet",
          baseUrl: "https://fullnode.testnet.sui.io:443",
        }).$extend(walrusMod.walrus());
        return { client, WalrusFile: walrusMod.WalrusFile };
      },
    );
  }
  return clientPromise;
}

export function useWalrusUpload() {
  const [blobId, setBlobId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const upload = async (data: CivilizationWalrusData, signer: Signer): Promise<string> => {
    setLoading(true);
    setError(null);
    try {
      const { client, WalrusFile } = await getClient();
      const file = WalrusFile.from({
        contents: new TextEncoder().encode(JSON.stringify(data)),
        identifier: `${data.name.toLowerCase().replace(/\s+/g, "-")}.json`,
      });
      const results = await client.walrus.writeFiles({
        files: [file],
        epochs: 3,
        deletable: true,
        signer,
      });
      const id = results[0].blobId;
      setBlobId(id);
      return id;
    } catch (e) {
      const err = e instanceof Error ? e : new Error(String(e));
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { upload, blobId, loading, error };
}
