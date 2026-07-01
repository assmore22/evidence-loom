export const ENV = {
  network: process.env.NEXT_PUBLIC_GENLAYER_NETWORK ?? "studionet",
  rpcUrl: process.env.NEXT_PUBLIC_GENLAYER_RPC_URL ?? "https://studio.genlayer.com/api",
  chainId: process.env.NEXT_PUBLIC_GENLAYER_CHAIN_ID ?? "0xf22f",
  contractAddress:
    process.env.NEXT_PUBLIC_WEAVE_ADDRESS ?? "0xD490c1cE340B6F705F3D5F89d95355b3cA2f2aee",
} as const;
export const PREVIEW_MODE = !/^0x[0-9a-fA-F]{40}$/.test(ENV.contractAddress);
