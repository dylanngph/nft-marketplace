"use client";

import { wagmiConfig } from "@/configs/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { type State, WagmiProvider } from "wagmi";

type Props = {
  children: ReactNode;
  initialState?: State;
};

const queryClient = new QueryClient();

export function Web3Providers({ children, initialState }: Props) {
  return (
    <WagmiProvider config={wagmiConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
