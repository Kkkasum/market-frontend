import { useMutation, useQueryClient } from '@tanstack/react-query'

import WithdrawService from '@/services/withdraw.service'
import { IWithdrawTokenRequest } from '@/types/withdraw.type'

export default function useWithdrawToken(userId: number) {
	const queryClient = useQueryClient()

	const { mutate: withdrawToken, isPending: isWithdrawPending } = useMutation(
		{
			mutationKey: ['withdraw-token'],
			mutationFn: (data: IWithdrawTokenRequest) =>
				WithdrawService.withdrawToken(data),
			onSuccess() {
				queryClient.invalidateQueries({
					queryKey: ['user', { userId: userId }],
				})
			},
		}
	)

	return { withdrawToken, isWithdrawPending }
}
