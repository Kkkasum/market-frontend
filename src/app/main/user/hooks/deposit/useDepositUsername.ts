import { useMutation, useQueryClient } from '@tanstack/react-query'

import DepositService from '@/services/deposit.service'
import { IDepositUsernameRequest } from '@/types/deposit.type'

export default function useDepositUsername(userId: number) {
	const queryClient = useQueryClient()

	const { mutate: depositUsername, isPending: isDepositPending } =
		useMutation({
			mutationKey: ['deposit-username'],
			mutationFn: (data: IDepositUsernameRequest) =>
				DepositService.depositUsername(data),
			onSuccess() {
				queryClient.invalidateQueries({
					queryKey: ['user', { userId: userId }],
				})
			},
		})

	return { depositUsername, isDepositPending }
}
