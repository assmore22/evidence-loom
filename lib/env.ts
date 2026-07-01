export const ENV = {
  network: process.env.NEXT_PUBLIC_GENLAYER_NETWORK ?? "testnetBradbury",
  rpcUrl: process.env.NEXT_PUBLIC_GENLAYER_RPC_URL ?? "https://rpc-bradbury.genlayer.com",
  chainId: process.env.NEXT_PUBLIC_GENLAYER_CHAIN_ID ?? "0x107d",
  contractAddress:
    process.env.NEXT_PUBLIC_WEAVE_ADDRESS ?? "0x4432929424994780e69C9e99Fb59f16c1A5Ec03a",
} as const;
export const PREVIEW_MODE = !/^0x[0-9a-fA-F]{40}$/.test(ENV.contractAddress);
