import { useMutation, useQueryClient } from '@tanstack/react-query'

import MarketService from '@/services/market.service'
import { IBuyUsernameRequest } from '@/types/market.type'

export default function useBuyUsername(userId: number, username: string) {
	const queryClient = useQueryClient()

	const {
		mutate: buyUsername,
		isPending: isBuyPending,
		isError,
	} = useMutation({
		mutationKey: ['buy-username', { userId: userId, username: username }],
		mutationFn: (data: IBuyUsernameRequest) =>
			MarketService.buyUsername({ userId: userId, username: username }),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['user', { userId: userId }],
			})
			queryClient.invalidateQueries({
				queryKey: ['username', { username: username }],
			})
		},
	})

	return { buyUsername, isBuyPending, isError }
}
