import { useMutation, useQueryClient } from '@tanstack/react-query'

import DepositService from '@/services/deposit.service'
import { IDepositTokenRequest } from '@/types/deposit.type'

export default function useDepositToken(userId: number) {
	const queryClient = useQueryClient()

	const { mutate: depositToken, isPending: isDepositPending } = useMutation({
		mutationKey: ['deposit-token'],
		mutationFn: (data: IDepositTokenRequest) =>
			DepositService.depositToken(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['user', { userId: userId }],
			})
		},
	})

	return { depositToken, isDepositPending }
}
