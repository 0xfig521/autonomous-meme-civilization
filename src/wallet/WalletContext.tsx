import { createContext, useContext } from "react";

export interface WalletState {
  isReady: boolean;
  isLoading: boolean;
  connection: {
    account: null | { address: string; icon?: string };
  };
  network: string;
  dAppKit: null | {
    signAndExecuteTransaction: (opts: { transaction: unknown }) => Promise<unknown>;
    connectWallet: (opts: { wallet: unknown }) => Promise<void>;
  };
  activate: () => Promise<void>;
  error: null | string;
}

export const WalletContext = createContext<WalletState>({
  isReady: false,
  isLoading: false,
  connection: { account: null },
  network: "testnet",
  dAppKit: null,
  activate: async () => {},
  error: null,
});

export function useWallet(): WalletState {
  return useContext(WalletContext);
}
