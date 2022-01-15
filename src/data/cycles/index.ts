import { treeClient, settsClient } from './../../apollo/client'
import gql from 'graphql-tag'
import { CHAIN } from './../../constants/index'
import { ANALYTICS_API_URL, EXPLORER_BLOCK_URL } from 'data/urls'
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

    return {
      error: false,
      data: data.cycles.map((c: any) => {
        return {
          cycle: Number(c.id),
          merkleRoot: c.root,
          contentHash: c.contentHash,
          startBlock: c.startBlock,
          endBlock: c.endBlock,
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
export async function fetchCycle(cycleNumber: number) {
  try {
    const result = await fetch(`${ANALYTICS_API_URL}/cycle/${cycleNumber}/?chain=${CHAIN}`)
    const json = await result.json()
    return {
      error: false,
      data: json,
    }
  } catch (error) {
    return {
      error: true,
      data: {},
    }
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
    console.log(data)
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
