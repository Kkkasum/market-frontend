import { useQuery } from '@tanstack/react-query'

import WithdrawalService from '@/services/withdrawal.service'
import { NETWORK } from '@/types/deposit.type'

export default function useFee(network: NETWORK) {
	const { data, isLoading } = useQuery({
		queryKey: ['withdrawal-fee', { network: network }],
		queryFn: () => WithdrawalService.getFee(network),
	})

	return { data, isLoading }
}
