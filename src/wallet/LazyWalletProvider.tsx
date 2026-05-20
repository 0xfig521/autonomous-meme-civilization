import { useState, useCallback, Suspense, type ReactNode, lazy } from "react";
import { WalletContext, type WalletState } from "./WalletContext";

const WalletProviderContent = lazy(() =>
  import("./WalletProviderContent").then((m) => ({ default: m.WalletProviderContent })),
);

interface LoadedWalletState {
  module: typeof import("@mysten/dapp-kit-react");
  dAppKit: ReturnType<typeof import("@mysten/dapp-kit-react").createDAppKit>;
}

export function LazyWalletProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [loadedState, setLoadedState] = useState<LoadedWalletState | null>(null);

  const activate = useCallback(async () => {
    if (isLoading || isReady) return;

    setIsLoading(true);
    setError(null);

    try {
      const walletModule = await import("@mysten/dapp-kit-react");
      const { SuiGrpcClient } = await import("@mysten/sui/grpc");

      const grpcUrls = {
        testnet: "https://fullnode.testnet.sui.io:443",
        mainnet: "https://fullnode.mainnet.sui.io:443",
      } as const;

      const dAppKit = walletModule.createDAppKit({
        networks: ["testnet", "mainnet"],
        defaultNetwork: "testnet",
        createClient: (network) => new SuiGrpcClient({ network, baseUrl: grpcUrls[network] }),
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setLoadedState({ module: walletModule, dAppKit: dAppKit as any });
      setIsReady(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load wallet SDK");
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, isReady]);

  if (!isReady) {
    const stubState: WalletState = {
      isReady: false,
      isLoading,
      connection: { account: null },
      network: "testnet",
      dAppKit: null,
      activate,
      error,
    };

    return <WalletContext.Provider value={stubState}>{children}</WalletContext.Provider>;
  }

  return (
    <Suspense fallback={<div className="wallet-loading">Loading wallet...</div>}>
      <WalletProviderContent walletModule={loadedState!.module} dAppKit={loadedState!.dAppKit}>
        {children}
      </WalletProviderContent>
    </Suspense>
  );
}
