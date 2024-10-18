import { useMutation, useQueryClient } from '@tanstack/react-query'

import MarketService from '@/services/market.service'

export default function useRemoveUsername(userId: number, username: string) {
	const queryClient = useQueryClient()

	const { mutate: removeUsername, isPending: isRemovePending } = useMutation({
		mutationKey: ['remove-username', { userId: userId }],
		mutationFn: (usernameId: number) =>
			MarketService.removeUsername(userId, usernameId),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['user', { userId: userId }],
			})
			queryClient.invalidateQueries({
				queryKey: ['username', { username: username }],
			})
			queryClient.invalidateQueries({
				queryKey: ['market-usernames'],
			})
		},
	})

	return { removeUsername, isRemovePending }
}
