import DepositService from '@/services/deposit.service'
import { useQuery } from '@tanstack/react-query'

export default function useDepositRequisite(
	userId: number,
	amount: number,
	paymentType?: string,
	enabled?: boolean
) {
	const { data, isLoading } = useQuery({
		queryKey: ['deposit-requisite', { userId: userId }],
		queryFn: () =>
			DepositService.getDepositRequisite(userId, amount, paymentType),
		enabled: enabled,
	})

	return { data, isLoading }
}
