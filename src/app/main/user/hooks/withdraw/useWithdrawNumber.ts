import { useMutation, useQueryClient } from '@tanstack/react-query'

import WithdrawService from '@/services/withdraw.service'
import { IWithdrawNumberRequest } from '@/types/withdraw.type'

export default function useWithdrawNumber(userId: number) {
	const queryClient = useQueryClient()

	const { mutate: withdrawNumber, isPending: isWithdrawPending } =
		useMutation({
			mutationKey: ['withdraw-number'],
			mutationFn: (data: IWithdrawNumberRequest) =>
				WithdrawService.withdrawNumber(data),
			onSuccess() {
				queryClient.invalidateQueries({
					queryKey: ['user', { userId: userId }],
				})
			},
		})

	return { withdrawNumber, isWithdrawPending }
}
