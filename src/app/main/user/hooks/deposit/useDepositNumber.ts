import { useMutation, useQueryClient } from '@tanstack/react-query'

import DepositService from '@/services/deposit.service'
import { IDepositNumberRequest } from '@/types/deposit.type'

export default function useDepositNumber(userId: number) {
	const queryClient = useQueryClient()

	const { mutate: depositNumber, isPending: isDepositPending } = useMutation({
		mutationKey: ['deposit-number'],
		mutationFn: (data: IDepositNumberRequest) =>
			DepositService.depositNumber(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['user', { userId: userId }],
			})
		},
	})

	return { depositNumber, isDepositPending }
}
