import { treeClient, settsClient } from './../../apollo/client'
import { CHAIN } from './../../constants/index'
import { ANALYTICS_API_URL, EXPLORER_BLOCK_URL } from 'data/urls'
import gql from 'graphql-tag'

export async function fetchCycles(page: number) {
  const FETCH_CYCLES_DATA = gql`
    query($skipAmount: Int) {
      cycles(first: 5, skip: $skipAmount, orderBy: endBlock, orderDirection: desc) {
        id
        startBlock
        endBlock
        root
        contentHash
      }
    }
  `

  try {
    const { data, errors, loading } = await treeClient.query({
      query: FETCH_CYCLES_DATA,
      variables: {
        skipAmount: page * 5,
      },
    })
    const rewardsDataPromises = data.cycles.map((c: any) => fetch(`${ANALYTICS_API_URL}/cycle/${Number(c.id)}`))
    const rewardsDataResponse = await Promise.all(rewardsDataPromises)
    const rewardsData = await Promise.all(rewardsDataResponse.map((r: any) => r.json()))
    return {
      error: false,
      data: data.cycles.map((c: any, index: number) => {
        return {
          cycle: Number(c.id),
          merkleRoot: c.root,
          contentHash: c.contentHash,
          startBlock: c.startBlock,
          endBlock: c.endBlock,
          rewardsData: simplifyRewardsData(rewardsData[index].rewardsData),
        }
      }),
    }
  } catch (error) {
    return {
      error: true,
      data: [],
    }
  }
}
function isEmpty(obj: any): boolean {
  return Object.keys(obj).length === 0
}

function simplifyRewardsData(rewardsData: any) {
  const rewardsByToken: any = {}
  for (const sett of Object.keys(rewardsData)) {
    const rewardsInfo = rewardsData[sett]
    const boosted = rewardsInfo.boosted_rewards
    const flat = rewardsInfo.flat_rewards
    if (isEmpty(boosted) && isEmpty(flat)) {
      continue
    }
    const tokens = [...new Set([...Object.keys(boosted), ...Object.keys(flat)])]
    for (const token of tokens) {
      if (!(token in rewardsByToken)) {
        rewardsByToken[token] = []
      }
      rewardsByToken[token].push({
        flat: token in flat ? Number(flat[token]) : 0,
        boosted: token in boosted ? Number(boosted[token]) : 0,
        vault: rewardsInfo.sett_name.split(' ').pop().toLowerCase(),
        token: token,
      })
    }
  }
  return rewardsByToken
}
export async function fetchCycle(cycle: number) {
  const FETCH_CYCLES_DATA = gql`
    query($cycleNumber: Int) {
      cycle(id: $cycleNumber) {
        id
        startBlock
        endBlock
        root
        contentHash
      }
    }
  `

  const { data, errors, loading } = await treeClient.query({
    query: FETCH_CYCLES_DATA,
    variables: {
      cycleNumber: cycle,
    },
  })
  const cycleRewardsResponse = await fetch(`${ANALYTICS_API_URL}/cycle/${cycle}`)
  const cycleData = await cycleRewardsResponse.json()

  return {
    error: false,
    data: {
      cycle: data.cycle.id,
      merkleRoot: data.cycle.root,
      contentHash: data.cycle.contentHash,
      startBlock: data.cycle.startBlock,
      endBlock: data.cycle.endBlock,
      rewardsData: simplifyRewardsData(cycleData.rewardsData),
    },
  }
}

export async function getTimestampOfBlock(blockNumber: number) {
  try {
    const result = await fetch(`${EXPLORER_BLOCK_URL}${blockNumber}&apikey=B3M5SZUJQ6SFHI3KBFWSW6QITTH2PFZRTQ`)
    const json = await result.json()
    return {
      error: false,
      data: Number(json['result']['timeStamp']),
    }
  } catch (error) {
    return {
      error: true,
      data: 0,
    }
  }
}

export async function fetchHarvests(start: number, end: number) {
  const FETCH_HARVESTS_DATA = gql`
    query($blockRange: BadgerTreeDistribution_filter) {
      badgerTreeDistributions(first: 500, where: $blockRange, orderBy: blockNumber, orderDirection: desc) {
        id
        token {
          symbol
          id
        }
        sett {
          name
          id
        }
        amount
        timestamp
        blockNumber
      }
    }
  `
  try {
    const { data, errors, loading } = await settsClient.query({
      query: FETCH_HARVESTS_DATA,
      variables: {
        blockRange: {
          blockNumber_gt: start.toString(),
          blockNumber_lt: end.toString(),
        },
      },
    })
    return {
      error: false,
      data: data.badgerTreeDistributions,
    }
  } catch (error) {
    console.log(error)
    return {
      error: true,
      data: [],
    }
  }
}
