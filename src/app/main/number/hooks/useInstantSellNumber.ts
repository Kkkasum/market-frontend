import { useMutation, useQueryClient } from '@tanstack/react-query'

import MarketService from '@/services/market.service'
import { IInstantSellNumberRequest } from '@/types/market.type'

export default function useInstantSellNumber(userId: number, number: string) {
	const queryClient = useQueryClient()

	const {
		mutate: instantSellNumber,
		isPending: isSellPending,
		isError,
	} = useMutation({
		mutationKey: ['instant-sell-number', { number: number }],
		mutationFn: (data: IInstantSellNumberRequest) =>
			MarketService.instantSellNumber(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['user', { userId: userId }],
			})
			queryClient.invalidateQueries({
				queryKey: ['number', { number: number }],
			})
		},
	})

	return { instantSellNumber, isSellPending, isError }
}
