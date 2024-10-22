import { useMutation, useQueryClient } from '@tanstack/react-query'

import WithdrawService from '@/services/withdrawal.service'
import { IWithdrawalUsdtRequest } from '@/types/withdrawal.type'

export default function useWithdrawUsdt(userId: number) {
	const queryClient = useQueryClient()

	const { mutate: withdrawUsdt, isPending: isWithdrawPending } = useMutation({
		mutationKey: ['withdraw-usdt', { userId: userId }],
		mutationFn: (data: IWithdrawalUsdtRequest) =>
			WithdrawService.withdrawUsdt(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['user', { userId: userId }],
			})
		},
	})

	return { withdrawUsdt, isWithdrawPending }
}
