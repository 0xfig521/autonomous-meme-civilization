import { useMemo, type ReactNode } from "react";
import { WalletContext, type WalletState } from "./WalletContext";

interface WalletProviderContentProps {
  walletModule: typeof import("@mysten/dapp-kit-react");
  dAppKit: ReturnType<typeof import("@mysten/dapp-kit-react").createDAppKit>;
  children: ReactNode;
}

export function WalletProviderContent({
  walletModule,
  dAppKit,
  children,
}: WalletProviderContentProps) {
  const { DAppKitProvider, useWalletConnection, useCurrentNetwork, useDAppKit } = walletModule;

  const WalletContextBridge = () => {
    const connection = useWalletConnection();
    const network = useCurrentNetwork();
    const kit = useDAppKit();

    const realState = useMemo<WalletState>(
      () => ({
        isReady: true,
        isLoading: false,
        connection: {
          account: connection.account
            ? {
                address: connection.account.address,
                icon: connection.account.icon,
              }
            : null,
        },
        network,
        dAppKit: {
          signAndExecuteTransaction: async (opts: { transaction: unknown }) =>
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (kit as any).signAndExecuteTransaction(opts),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          connectWallet: async (opts: { wallet: unknown }) => (kit as any).connectWallet(opts),
        },
        activate: async () => {},
        error: null,
      }),
      [connection, network, kit],
    );

    return <WalletContext.Provider value={realState}>{children}</WalletContext.Provider>;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <DAppKitProvider dAppKit={dAppKit as any}>{<WalletContextBridge />}</DAppKitProvider>;
}
