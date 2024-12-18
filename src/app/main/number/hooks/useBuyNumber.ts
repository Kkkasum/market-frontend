import { useMutation, useQueryClient } from '@tanstack/react-query'

import MarketService from '@/services/market.service'
import { IBuyNumberRequest } from '@/types/market.type'

export default function useBuyNumber(userId: number, number: string) {
	const queryClient = useQueryClient()

	const {
		mutate: buyNumber,
		isPending: isBuyPending,
		isError,
	} = useMutation({
		mutationKey: ['buy-number', { userId: userId, number: number }],
		mutationFn: (data: IBuyNumberRequest) => MarketService.buyNumber(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['user', { userId: userId }],
			})
			queryClient.invalidateQueries({
				queryKey: ['number', { number: number }],
			})
		},
	})

	return { buyNumber, isBuyPending, isError }
}
