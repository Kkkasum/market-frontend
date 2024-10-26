import { useMutation, useQueryClient } from '@tanstack/react-query'

import WithdrawService from '@/services/withdrawal.service'
import { IWithdrawUsdtRequest } from '@/types/withdrawal.type'

export default function useWithdrawUsdt(userId: number) {
	const queryClient = useQueryClient()

	const {
		mutate: withdrawUsdt,
		isPending: isWithdrawPending,
		isError,
	} = useMutation({
		mutationKey: ['withdraw-usdt', { userId: userId }],
		mutationFn: (data: IWithdrawUsdtRequest) =>
			WithdrawService.withdrawUsdt(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['user', { userId: userId }],
			})
		},
	})

	return { withdrawUsdt, isWithdrawPending, isError }
}
