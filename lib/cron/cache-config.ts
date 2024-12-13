import { Protocol } from '@uniswap/router-sdk'
import { V2SubgraphProvider, V3SubgraphProvider, V4SubgraphProvider } from '@uniswap/smart-order-router'
import { ChainId } from '@uniswap/sdk-core'

// during local cdk stack update, the env vars are not populated
// make sure to fill in the env vars below
// process.env.ALCHEMY_QUERY_KEY = ''

export const v4SubgraphUrlOverride = (chainId: ChainId) => {
  switch (chainId) {
    case ChainId.SEPOLIA:
      return `https://subgraph.satsuma-prod.com/${process.env.ALCHEMY_QUERY_KEY}/uniswap/uniswap-v4-sepolia-test/api`
    default:
      return undefined
  }
}

export const v3SubgraphUrlOverride = (chainId: ChainId) => {
  switch (chainId) {
    case ChainId.MAINNET:
      return `https://subgraph.satsuma-prod.com/${process.env.ALCHEMY_QUERY_KEY}/uniswap/uniswap-v3-mainnet/api`
    case ChainId.ARBITRUM_ONE:
      return `https://subgraph.satsuma-prod.com/${process.env.ALCHEMY_QUERY_KEY}/uniswap/uniswap-v3-arbitrum-ii/api`
    case ChainId.POLYGON:
      return `https://subgraph.satsuma-prod.com/${process.env.ALCHEMY_QUERY_KEY}/uniswap/uniswap-v3-polygon/api`
    case ChainId.OPTIMISM:
      return `https://subgraph.satsuma-prod.com/${process.env.ALCHEMY_QUERY_KEY}/uniswap/uniswap-v3-optimism-ii/api`
    case ChainId.AVALANCHE:
      return `https://subgraph.satsuma-prod.com/${process.env.ALCHEMY_QUERY_KEY}/uniswap/uniswap-v3-avalanche/api`
    case ChainId.BNB:
      return `https://subgraph.satsuma-prod.com/${process.env.ALCHEMY_QUERY_KEY}/uniswap/uniswap-v3-bsc-ii/api`
    case ChainId.BLAST:
      return `https://subgraph.satsuma-prod.com/${process.env.ALCHEMY_QUERY_KEY}/uniswap/uniswap-v3-blast/api`
    case ChainId.BASE:
      return `https://subgraph.satsuma-prod.com/${process.env.ALCHEMY_QUERY_KEY}/uniswap/uniswap-v3-base/api`
    case ChainId.CELO:
      return `https://subgraph.satsuma-prod.com/${process.env.ALCHEMY_QUERY_KEY}/uniswap/uniswap-v3-celo/api`
    case ChainId.WORLDCHAIN:
      return `https://subgraph.satsuma-prod.com/${process.env.ALCHEMY_QUERY_KEY}/uniswap/uniswap-v3-worldchain/api`
    case ChainId.ASTROCHAIN_SEPOLIA:
      return `https://subgraph.satsuma-prod.com/${process.env.ALCHEMY_QUERY_KEY}/uniswap/uniswap-v3-astrochain-sepolia/api`
    default:
      return undefined
  }
}

export const v2SubgraphUrlOverride = (chainId: ChainId) => {
  switch (chainId) {
    case ChainId.MAINNET:
      return `https://subgraph.satsuma-prod.com/${process.env.ALCHEMY_QUERY_KEY}/uniswap/uniswap-v2-mainnet/api`
    case ChainId.ARBITRUM_ONE:
      return `https://subgraph.satsuma-prod.com/${process.env.ALCHEMY_QUERY_KEY}/uniswap/uniswap-v2-arbitrum/api`
    case ChainId.POLYGON:
      return `https://subgraph.satsuma-prod.com/${process.env.ALCHEMY_QUERY_KEY}/uniswap/uniswap-v2-polygon/api`
    case ChainId.OPTIMISM:
      return `https://subgraph.satsuma-prod.com/${process.env.ALCHEMY_QUERY_KEY}/uniswap/uniswap-v2-optimism/api`
    case ChainId.AVALANCHE:
      return `https://subgraph.satsuma-prod.com/${process.env.ALCHEMY_QUERY_KEY}/uniswap/uniswap-v2-avalanche/api`
    case ChainId.BNB:
      return `https://subgraph.satsuma-prod.com/${process.env.ALCHEMY_QUERY_KEY}/uniswap/uniswap-v2-bsc/api`
    case ChainId.BLAST:
      return `https://subgraph.satsuma-prod.com/${process.env.ALCHEMY_QUERY_KEY}/uniswap/uniswap-v2-blast/api`
    case ChainId.BASE:
      return `https://subgraph.satsuma-prod.com/${process.env.ALCHEMY_QUERY_KEY}/uniswap/uniswap-v2-base/api`
    case ChainId.WORLDCHAIN:
      return `https://subgraph.satsuma-prod.com/${process.env.ALCHEMY_QUERY_KEY}/uniswap/uniswap-v2-worldchain/api`
    case ChainId.ASTROCHAIN_SEPOLIA:
      return `https://subgraph.satsuma-prod.com/${process.env.ALCHEMY_QUERY_KEY}/uniswap/uniswap-v2-astrochain-sepolia/api`
    default:
      return undefined
  }
}

const v4TrackedEthThreshold = 0.01 // Pools need at least 0.01 of trackedEth to be selected
const v4UntrackedUsdThreshold = 0 // v4 subgraph totalValueLockedUSDUntracked returns 0, even with the pools that have appropriate liqudities and correct pool pricing

export const v3TrackedEthThreshold = 0.01 // Pools need at least 0.01 of trackedEth to be selected
const v3UntrackedUsdThreshold = 25000 // Pools need at least 25K USD (untracked) to be selected (for metrics only)

export const v2TrackedEthThreshold = 0.025 // Pairs need at least 0.025 of trackedEth to be selected
const v2UntrackedUsdThreshold = Number.MAX_VALUE // Pairs are effectively excluded due to an untracked USD threshold of Number.MAX_VALUE

export const chainProtocols = [
  // V3.
  {
    protocol: Protocol.V3,
    chainId: ChainId.MAINNET,
    timeout: 90000,
    provider: new V3SubgraphProvider(
      ChainId.MAINNET,
      3,
      90000,
      true,
      v3TrackedEthThreshold,
      v3UntrackedUsdThreshold,
      v3SubgraphUrlOverride(ChainId.MAINNET)
    ),
  },
  {
    protocol: Protocol.V3,
    chainId: ChainId.ARBITRUM_ONE,
    timeout: 90000,
    provider: new V3SubgraphProvider(
      ChainId.ARBITRUM_ONE,
      5,
      90000,
      true,
      v3TrackedEthThreshold,
      v3UntrackedUsdThreshold,
      v3SubgraphUrlOverride(ChainId.ARBITRUM_ONE)
    ),
  },
  {
    protocol: Protocol.V3,
    chainId: ChainId.POLYGON,
    timeout: 90000,
    provider: new V3SubgraphProvider(
      ChainId.POLYGON,
      3,
      90000,
      true,
      v3TrackedEthThreshold,
      v3UntrackedUsdThreshold,
      v3SubgraphUrlOverride(ChainId.POLYGON)
    ),
  },
  // Waiting for Alchemy subgraph
  {
    protocol: Protocol.V3,
    chainId: ChainId.OPTIMISM,
    timeout: 90000,
    provider: new V3SubgraphProvider(
      ChainId.OPTIMISM,
      3,
      90000,
      true,
      v3TrackedEthThreshold,
      v3UntrackedUsdThreshold,
      v3SubgraphUrlOverride(ChainId.OPTIMISM)
    ),
  },
  {
    protocol: Protocol.V3,
    chainId: ChainId.CELO,
    timeout: 90000,
    provider: new V3SubgraphProvider(
      ChainId.CELO,
      3,
      90000,
      true,
      v3TrackedEthThreshold,
      v3UntrackedUsdThreshold,
      v3SubgraphUrlOverride(ChainId.CELO)
    ),
  },
  {
    protocol: Protocol.V3,
    chainId: ChainId.BNB,
    timeout: 90000,
    provider: new V3SubgraphProvider(
      ChainId.BNB,
      3,
      90000,
      true,
      v3TrackedEthThreshold,
      v3UntrackedUsdThreshold,
      v3SubgraphUrlOverride(ChainId.BNB)
    ),
  },
  {
    protocol: Protocol.V3,
    chainId: ChainId.AVALANCHE,
    timeout: 90000,
    provider: new V3SubgraphProvider(
      ChainId.AVALANCHE,
      3,
      90000,
      true,
      v3TrackedEthThreshold,
      v3UntrackedUsdThreshold,
      v3SubgraphUrlOverride(ChainId.AVALANCHE)
    ),
  },
  {
    protocol: Protocol.V3,
    chainId: ChainId.BASE,
    timeout: 90000,
    provider: new V3SubgraphProvider(
      ChainId.BASE,
      3,
      90000,
      true,
      v3TrackedEthThreshold,
      v3UntrackedUsdThreshold,
      v3SubgraphUrlOverride(ChainId.BASE)
    ),
  },
  {
    protocol: Protocol.V3,
    chainId: ChainId.BLAST,
    timeout: 90000,
    provider: new V3SubgraphProvider(
      ChainId.BLAST,
      3,
      90000,
      true,
      v3TrackedEthThreshold,
      v3UntrackedUsdThreshold,
      v3SubgraphUrlOverride(ChainId.BLAST)
    ),
  },

  // V2.
  {
    protocol: Protocol.V2,
    chainId: ChainId.MAINNET,
    timeout: 840000,
    provider: new V2SubgraphProvider(
      ChainId.MAINNET,
      5,
      900000,
      true,
      1000,
      v2TrackedEthThreshold,
      v2UntrackedUsdThreshold,
      v2SubgraphUrlOverride(ChainId.MAINNET)
    ), // 1000 is the largest page size supported by thegraph
  },
  {
    protocol: Protocol.V2,
    chainId: ChainId.ARBITRUM_ONE,
    timeout: 90000,
    provider: new V2SubgraphProvider(
      ChainId.ARBITRUM_ONE,
      3,
      90000,
      true,
      1000,
      v2TrackedEthThreshold,
      v2UntrackedUsdThreshold,
      v2SubgraphUrlOverride(ChainId.ARBITRUM_ONE)
    ),
  },
  {
    protocol: Protocol.V2,
    chainId: ChainId.POLYGON,
    timeout: 90000,
    provider: new V2SubgraphProvider(
      ChainId.POLYGON,
      3,
      90000,
      true,
      1000,
      v2TrackedEthThreshold,
      v2UntrackedUsdThreshold,
      v2SubgraphUrlOverride(ChainId.POLYGON)
    ),
  },
  {
    protocol: Protocol.V2,
    chainId: ChainId.OPTIMISM,
    timeout: 90000,
    provider: new V2SubgraphProvider(
      ChainId.OPTIMISM,
      3,
      90000,
      true,
      1000,
      v2TrackedEthThreshold,
      v2UntrackedUsdThreshold,
      v2SubgraphUrlOverride(ChainId.OPTIMISM)
    ),
  },
  {
    protocol: Protocol.V2,
    chainId: ChainId.BNB,
    timeout: 90000,
    provider: new V2SubgraphProvider(
      ChainId.BNB,
      3,
      90000,
      true,
      1000,
      v2TrackedEthThreshold,
      v2UntrackedUsdThreshold,
      v2SubgraphUrlOverride(ChainId.BNB)
    ),
  },
  {
    protocol: Protocol.V2,
    chainId: ChainId.AVALANCHE,
    timeout: 90000,
    provider: new V2SubgraphProvider(
      ChainId.AVALANCHE,
      3,
      90000,
      true,
      1000,
      v2TrackedEthThreshold,
      v2UntrackedUsdThreshold,
      v2SubgraphUrlOverride(ChainId.AVALANCHE)
    ),
  },
  {
    protocol: Protocol.V2,
    chainId: ChainId.BASE,
    timeout: 840000,
    provider: new V2SubgraphProvider(
      ChainId.BASE,
      5,
      900000,
      true,
      1000,
      v2TrackedEthThreshold,
      v2UntrackedUsdThreshold,
      v2SubgraphUrlOverride(ChainId.BASE)
    ),
  },
  {
    protocol: Protocol.V2,
    chainId: ChainId.BLAST,
    timeout: 90000,
    provider: new V2SubgraphProvider(
      ChainId.BLAST,
      3,
      90000,
      true,
      1000,
      v2TrackedEthThreshold,
      v2UntrackedUsdThreshold,
      v2SubgraphUrlOverride(ChainId.BLAST)
    ),
  },
  {
    protocol: Protocol.V4,
    chainId: ChainId.SEPOLIA,
    timeout: 90000,
    provider: new V4SubgraphProvider(
      ChainId.SEPOLIA,
      3,
      90000,
      true,
      v4TrackedEthThreshold,
      v4UntrackedUsdThreshold,
      v4SubgraphUrlOverride(ChainId.SEPOLIA)
    ),
  },
]
