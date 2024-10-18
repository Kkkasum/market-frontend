import { useQuery } from '@tanstack/react-query'

import DepositService from '@/services/deposit.service'

export default function useDepositAddress() {
	const { data, isLoading } = useQuery({
		queryKey: ['deposit-address'],
		queryFn: () => DepositService.getDepositAddress(),
	})

	return { data, isLoading }
}
