import MarketService from '@/services/market.service'
import { IAddMarketUsernameRequest } from '@/types/market.type'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function useAddUsername(userId: number, username: string) {
	const queryClient = useQueryClient()

	const { mutate: addUsername, isPending: isAddPending } = useMutation({
		mutationKey: ['add-username', { userId: userId }],
		mutationFn: (data: IAddMarketUsernameRequest) =>
			MarketService.addUsername(data),
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

	return { addUsername, isAddPending }
}
