import { useState } from "react";
import type { CivilizationWalrusData } from "../types/walrus";

let clientPromise: Promise<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  client: any;
}> | null = null;

async function getClient() {
  if (!clientPromise) {
    clientPromise = Promise.all([import("@mysten/sui/grpc"), import("@mysten/walrus")]).then(
      ([grpc, walrusMod]) => ({
        client: new grpc.SuiGrpcClient({
          network: "testnet",
          baseUrl: "https://fullnode.testnet.sui.io:443",
        }).$extend(walrusMod.walrus()),
      }),
    );
  }
  return clientPromise;
}

export function useWalrusRead() {
  const [data, setData] = useState<CivilizationWalrusData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const read = async (blobId: string): Promise<CivilizationWalrusData> => {
    setLoading(true);
    setError(null);
    try {
      const { client } = await getClient();
      const [file] = await client.walrus.getFiles({ ids: [blobId] });

      if (!file) {
        throw new Error(`Blob not found: ${blobId}`);
      }

      const parsed = (await file.json()) as CivilizationWalrusData;

      setData(parsed);
      return parsed;
    } catch (e) {
      const err = e instanceof Error ? e : new Error(String(e));
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { read, data, loading, error };
}
