import { createConfig, http, cookieStorage, createStorage } from "wagmi";
import { mainnet, bsc, polygon, arbitrum } from "wagmi/chains";
import { injected, safe, walletConnect } from "wagmi/connectors";

const walletConnectClientId = process.env
  .NEXT_PUBLIC_WALLET_CONNECT_CLIENT_ID as string;

export const wagmiConfig = createConfig({
  chains: [mainnet, bsc, polygon, arbitrum],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  multiInjectedProviderDiscovery: false,
  connectors: [
    injected({ target: "metaMask", shimDisconnect: true }),
    injected({ target: "phantom", shimDisconnect: true }),
    walletConnect({ projectId: walletConnectClientId }),
    safe(),
  ],
  transports: {
    [mainnet.id]: http(),
    [bsc.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
  },
});
