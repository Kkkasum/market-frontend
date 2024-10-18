import MarketService from '@/services/market.service'
import { IAddMarketNumberRequest } from '@/types/market.type'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function useAddNumber(userId: number, number: string) {
	const queryClient = useQueryClient()

	const { mutate: addNumber, isPending: isAddPending } = useMutation({
		mutationKey: ['add-number', { userId: userId }],
		mutationFn: (data: IAddMarketNumberRequest) =>
			MarketService.addNumber(data),
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

	return { addNumber, isAddPending }
}
