interface CycleData {
  root: string
  contentHash: string
  cycleNumber: number
  startBlock: number
  endBlock: number
  totalTokenDistribution: Array<TokenDistributon>
  treeDistributions: TreeDistributions
  rewardsPerToken: TokenRewards
}

interface TokenDistributon {
  [address: string]: number;
}
interface TreeDistributions {
  [sett: string]: Array<TreeDistribution>
}
interface TreeDistribution {
  amount: number
  blockNumber: number
  token: Token 
  id: string
  timestamp: number
}

interface Token {
  address: string
  symbol: string
}

interface SettRewards {
  sett: string
  amount: number
}
interface TokenRewards {
  [token: string]: Array<SettRewards>;
}
interface BoostData {
  address: string
  boost: number
  stakeRatio: number
  nftMultiplier: number
  nativeBalance: number
  nonNativeBalance: number
}
