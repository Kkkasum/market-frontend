import { useMutation, useQueryClient } from '@tanstack/react-query'

import UserService from '@/services/user.service'
import { IAddUserSwapRequest } from '@/types/user.type'

export default function useAddUserSwap(userId: number) {
	const queryClient = useQueryClient()

	const {
		mutate: addUserSwap,
		reset: resetUserSwap,
		isPending: isAddPending,
		isSuccess: isSwapSuccess,
	} = useMutation({
		mutationKey: ['add-swap'],
		mutationFn: (data: IAddUserSwapRequest) =>
			UserService.addUserSwap(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['user', { userId: userId }],
			})
		},
	})

	return { addUserSwap, resetUserSwap, isAddPending, isSwapSuccess }
}
