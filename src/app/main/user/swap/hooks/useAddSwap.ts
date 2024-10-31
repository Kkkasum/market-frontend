import SwapService from '@/services/swap.service'
import { IAddSwapRequest } from '@/types/swap.type'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function useAddSwap(userId: number) {
	const queryClient = useQueryClient()

	const {
		mutate: addSwap,
		isPending: isAddPending,
		isError,
		isSuccess,
		reset: resetAddSwap,
	} = useMutation({
		mutationFn: (data: IAddSwapRequest) => SwapService.addSwap(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['user', { userId: userId }],
			})
		},
	})

	return { addSwap, isAddPending, isError, isSuccess, resetAddSwap }
}
