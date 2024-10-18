import { useMutation, useQueryClient } from '@tanstack/react-query'

import MarketService from '@/services/market.service'

export default function useBuyNumber(userId: number, number: string) {
	const queryClient = useQueryClient()

	const { mutate: buyNumber, isPending: isBuyPending } = useMutation({
		mutationKey: ['buy-number', { userId: userId, number: number }],
		mutationFn: () =>
			MarketService.buyNumber({ userId: userId, number: number }),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['user', { userId: userId }],
			})
			queryClient.invalidateQueries({
				queryKey: ['number', { number: number }],
			})
		},
	})

	return { buyNumber, isBuyPending }
}
