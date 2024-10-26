import { useMutation, useQueryClient } from '@tanstack/react-query'

import WithdrawService from '@/services/withdrawal.service'
import { IWithdrawTonRequest } from '@/types/withdrawal.type'

export default function useWithdrawTon(userId: number) {
	const queryClient = useQueryClient()

	const {
		mutate: withdrawTon,
		isPending: isWithdrawPending,
		isError,
	} = useMutation({
		mutationKey: ['withdraw-ton', { userId: userId }],
		mutationFn: (data: IWithdrawTonRequest) =>
			WithdrawService.withdrawTon(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['user', { userId: userId }],
			})
		},
	})

	return { withdrawTon, isWithdrawPending, isError }
}
