import {
  getMyStakingAmount,
  getRewardsAmount,
  getTotalStakingAmount,
  withdrawHolderAmount,
  getMyHolderAmount,
  stakeDev,
  cancelStaking,
  getLastAssetValueEachMetrics,
  getLastAssetValueEachMarketPerBlock,
  allocate,
  withdrawStakingRewardAmount,
  withdrawStakingAmount,
  getMyStakingRewardAmount,
  createProperty,
  marketScheme,
  authenticate
} from './client'
import { SWRCachePath } from './cache-path'
import { UnwrapFunc, toNaturalNumber, toAmountNumber } from 'src/fixtures/utility'
import useSWR from 'swr'
import { message } from 'antd'
import { useState, useCallback } from 'react'

export const useGetTotalRewardsAmount = (propertyAddress: string) => {
  const { data, error } = useSWR<UnwrapFunc<typeof getRewardsAmount>, Error>(
    SWRCachePath.getTotalRewardsAmount(propertyAddress),
    () => getRewardsAmount(propertyAddress),
    { onError: err => message.error(err.message) }
  )
  return { totalRewardsAmount: data ? toNaturalNumber(data) : undefined, error }
}

export const useWithdrawHolderReward = () => {
  const key = 'useWithdrawHolderReward'
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error>()
  const withdrawHolder = useCallback(async (propertyAddress: string) => {
    setIsLoading(true)
    message.loading({ content: 'now withdrawing holder reward...', duration: 0, key })
    setError(undefined)
    return withdrawHolderAmount(propertyAddress)
      .then(() => {
        message.success({ content: 'success withdrawing!', key })
        setIsLoading(false)
      })
      .catch(err => {
        setError(err)
        message.error({ content: err.message, key })
        setIsLoading(false)
      })
  }, [])

  return { withdrawHolder, isLoading, error }
}

export const useGetMyHolderAmount = (propertyAddress: string) => {
  const { data, error } = useSWR<UnwrapFunc<typeof getMyHolderAmount>, Error>(
    SWRCachePath.getMyHolderAmount(propertyAddress),
    () => getMyHolderAmount(propertyAddress),
    { onError: err => message.error(err.message) }
  )
  return { myHolderAmount: data ? toNaturalNumber(data) : undefined, error }
}

export const useGetTotalStakingAmount = (propertyAddress: string) => {
  const { data, error } = useSWR<UnwrapFunc<typeof getTotalStakingAmount>, Error>(
    SWRCachePath.getTotalStakingAmount(propertyAddress),
    () => getTotalStakingAmount(propertyAddress),
    { onError: err => message.error(err.message) }
  )
  return { totalStakingAmount: data ? toNaturalNumber(data) : undefined, error }
}

export const useGetMyStakingRewardAmount = (propertyAddress: string) => {
  const { data, error } = useSWR<UnwrapFunc<typeof getMyStakingRewardAmount>, Error>(
    SWRCachePath.getMyStakingRewardAmount(propertyAddress),
    () => getMyStakingRewardAmount(propertyAddress),
    {
      onError: err => message.error(err.message)
    }
  )

  return { myStakingRewardAmount: data ? toNaturalNumber(data) : undefined, error }
}

export const useGetMyStakingAmount = (propertyAddress: string) => {
  const { data, error } = useSWR<UnwrapFunc<typeof getMyStakingAmount>, Error>(
    SWRCachePath.getMyStakingAmount(propertyAddress),
    () => getMyStakingAmount(propertyAddress),
    {
      onError: err => message.error(err.message)
    }
  )

  return { myStakingAmount: data ? toNaturalNumber(data) : undefined, error }
}

export const useWithdrawStakingReward = () => {
  const key = 'useWithdrawStakingReward'
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error>()
  const withdrawStakingReward = useCallback(async (propertyAddress: string) => {
    setIsLoading(true)
    message.loading({ content: 'now withdrawing staking reward...', duration: 0, key })
    setError(undefined)
    return withdrawStakingRewardAmount(propertyAddress)
      .then(() => {
        message.success({ content: 'success withdrawing!', key })
        setIsLoading(false)
      })
      .catch(err => {
        setError(err)
        message.error({ content: err.message, key })
        setIsLoading(false)
      })
  }, [])

  return { withdrawStakingReward, isLoading, error }
}

export const useWithdrawStaking = () => {
  const key = 'useWithdrawStaking'
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error>()
  const withdrawStaking = useCallback(async (propertyAddress: string) => {
    setIsLoading(true)
    message.loading({ content: 'now withdrawing staking...', duration: 0, key })
    setError(undefined)
    return withdrawStakingAmount(propertyAddress)
      .then(() => {
        message.success({ content: 'success withdrawing!', key })
        setIsLoading(false)
      })
      .catch(err => {
        setError(err)
        message.error({ content: err.message, key })
        setIsLoading(false)
      })
  }, [])

  return { withdrawStaking, isLoading, error }
}

export const useStake = () => {
  const key = 'useStake'
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error>()
  const stake = useCallback(async (propertyAddress: string, amount: string) => {
    setIsLoading(true)
    message.loading({ content: 'now staking...', duration: 0, key })
    setError(undefined)
    return stakeDev(propertyAddress, toAmountNumber(amount).toFormat({ decimalSeparator: '' }))
      .then(() => {
        message.success({ content: 'success staking!', key })
        setIsLoading(false)
      })
      .catch(err => {
        setError(err)
        message.error({ content: err.message, key })
        setIsLoading(false)
      })
  }, [])

  return { stake, isLoading, error }
}

export const useCancelStaking = () => {
  const key = 'useCancelStaking'
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error>()
  const cancel = useCallback(async (propertyAddress: string) => {
    setIsLoading(true)
    message.loading({ content: 'now canceling staking...', duration: 0, key })
    setError(undefined)
    return cancelStaking(propertyAddress)
      .then(() => {
        message.success({ content: 'canceled staking', key })
        setIsLoading(false)
      })
      .catch(err => {
        setError(err)
        message.error({ content: err.message, key })
        setIsLoading(false)
      })
  }, [])

  return { cancel, isLoading, error }
}

export const useAssetStrength = (metricsAddress: string, marketAddress: string) => {
  const { data: metrics, error: metricsError } = useSWR<UnwrapFunc<typeof getLastAssetValueEachMetrics>, Error>(
    SWRCachePath.getLastAssetValueEachMetrics(metricsAddress),
    () => getLastAssetValueEachMetrics(metricsAddress),
    {
      onError: err => message.error(err.message)
    }
  )
  const { data: market, error: marketError } = useSWR<UnwrapFunc<typeof getLastAssetValueEachMarketPerBlock>, Error>(
    SWRCachePath.getLastAssetValueEachMarketPerBlock(marketAddress),
    () => getLastAssetValueEachMarketPerBlock(marketAddress),
    { onError: err => message.error(err.message) }
  )
  return {
    assetStrength: metrics && market ? Number(metrics) / Number(market) : undefined,
    error: metricsError || marketError
  }
}

export const useAllocate = () => {
  const key = 'useAllocate'
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error>()
  const allocateDev = useCallback(async (metricsAddress: string) => {
    setIsLoading(true)
    message.loading({ content: 'now mining...', duration: 0, key })
    setError(undefined)
    return allocate(metricsAddress)
      .then(() => {
        message.success({ content: 'success mining!', key })
        setIsLoading(false)
      })
      .catch(err => {
        setError(err)
        message.error({ content: err.message, key })
        setIsLoading(false)
      })
  }, [])

  return { allocate: allocateDev, isLoading, error }
}

export const useCreateProperty = () => {
  const key = 'useCreateProperty'
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error>()
  const callback = useCallback(async (name: string, symbol: string, author: string) => {
    setIsLoading(true)
    message.loading({ content: 'now creating property...', duration: 0, key })
    setError(undefined)
    return createProperty(name, symbol, author)
      .then(result => {
        message.success({ content: 'success creating property!', key })
        setIsLoading(false)
        return result || ''
      })
      .catch(err => {
        setError(err)
        message.error({ content: err.message, key })
        setIsLoading(false)
        return ''
      })
  }, [])
  return { createProperty: callback, isLoading, error }
}

export const useMarketScheme = () => {
  const key = 'useMarketScheme'
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error>()
  const callback = useCallback(async (marketAddress: string) => {
    setIsLoading(true)
    message.loading({ content: 'now loading...', duration: 0, key })
    setError(undefined)
    return marketScheme(marketAddress)
      .then(result => {
        message.success({ content: 'success!', key })
        setIsLoading(false)
        return result || []
      })
      .catch(err => {
        setError(err)
        message.error({ content: err.message, key })
        setIsLoading(false)
      })
  }, [])
  return { marketScheme: callback, isLoading, error }
}

export const useAuthenticate = () => {
  const key = 'useAuthenticate'
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error>()
  const callback = useCallback(async (marketAddress: string, propertyAddress: string, args: string[]) => {
    setIsLoading(true)
    message.loading({ content: 'now authenticating...', duration: 0, key })
    setError(undefined)
    return authenticate(marketAddress, propertyAddress, args)
      .then(metricsAddress => {
        setIsLoading(false)
        message.success({ content: 'success authenticate!', key })
        return metricsAddress
      })
      .catch(err => {
        setError(err)
        message.error({ content: err.message, key })
        setIsLoading(false)
        return ''
      })
  }, [])
  return { authenticate: callback, isLoading, error }
}
