import { useQuery } from '@tanstack/react-query'

import NumberService from '@/services/number.service'

export default function useNumberByAddress(address: string, enabled: boolean) {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['number-by-address', { address: address }],
		queryFn: () => NumberService.getNumberByAddress(address),
		enabled: enabled,
	})

	return { data, isLoading, isError }
}
