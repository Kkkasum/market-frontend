import { useMutation, useQueryClient } from '@tanstack/react-query'

import MarketService from '@/services/market.service'
import { IInstantSellUsernameRequest } from '@/types/market.type'

export default function useInstantSellUsername(
	userId: number,
	username: string
) {
	const queryClient = useQueryClient()

	const {
		mutate: instantSellUsername,
		isPending: isSellPending,
		isError,
	} = useMutation({
		mutationKey: ['instant-sell', { username: username }],
		mutationFn: (data: IInstantSellUsernameRequest) =>
			MarketService.instantSellUsername(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['user', { userId: userId }],
			})
			queryClient.invalidateQueries({
				queryKey: ['username', { username: username }],
			})
		},
	})

	return { instantSellUsername, isSellPending, isError }
}
