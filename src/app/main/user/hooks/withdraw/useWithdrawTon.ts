import { useMutation, useQueryClient } from '@tanstack/react-query'

import WithdrawService from '@/services/withdrawal.service'
import { IWithdrawalTonRequest } from '@/types/withdrawal.type'

export default function useWithdrawTon(userId: number) {
	const queryClient = useQueryClient()

	const { mutate: withdrawTon, isPending: isWithdrawPending } = useMutation({
		mutationKey: ['withdraw-Ton', { userId: userId }],
		mutationFn: (data: IWithdrawalTonRequest) =>
			WithdrawService.withdrawTon(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['user', { userId: userId }],
			})
		},
	})

	return { withdrawTon, isWithdrawPending }
}
