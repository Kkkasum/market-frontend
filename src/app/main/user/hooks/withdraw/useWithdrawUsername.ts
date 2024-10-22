import { useMutation, useQueryClient } from '@tanstack/react-query'

import WithdrawService from '@/services/withdrawal.service'
import { IWithdrawUsernameRequest } from '@/types/withdrawal.type'

export default function useWithdrawUsername(userId: number) {
	const queryClient = useQueryClient()

	const { mutate: withdrawUsername, isPending: isWithdrawPending } =
		useMutation({
			mutationKey: ['withdraw-username'],
			mutationFn: (data: IWithdrawUsernameRequest) =>
				WithdrawService.withdrawUsername(data),
			onSuccess() {
				queryClient.invalidateQueries({
					queryKey: ['user', { userId: userId }],
				})
			},
		})

	return { withdrawUsername, isWithdrawPending }
}
