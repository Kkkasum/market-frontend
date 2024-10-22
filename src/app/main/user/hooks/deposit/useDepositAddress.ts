import { useQuery } from '@tanstack/react-query'

import DepositService from '@/services/deposit.service'

export default function useDepositAddress(network: string, userId: number) {
	const { data, isLoading } = useQuery({
		queryKey: ['deposit-address', { network: network, userId: userId }],
		queryFn: () => DepositService.getDepositAddress(network, userId),
		gcTime: 15000,
	})

	return { data, isLoading }
}
