import { useMutation, useQueryClient } from '@tanstack/react-query'

import MarketService from '@/services/market.service'

export default function useRemoveNumber(userId: number, number: string) {
	const queryClient = useQueryClient()

	const { mutate: removeNumber, isPending: isRemovePending } = useMutation({
		mutationKey: ['remove-number', { userId: userId }],
		mutationFn: (numberId: number) =>
			MarketService.removeNumber(userId, numberId),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['user', { userId: userId }],
			})
			queryClient.invalidateQueries({
				queryKey: ['number', { number: number }],
			})
			queryClient.invalidateQueries({
				queryKey: ['market-numbers'],
			})
		},
	})

	return { removeNumber, isRemovePending }
}
