import { useQuery } from '@tanstack/react-query'

import SwapService from '@/services/swap.service'

export default function useIsSwapAvailable() {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['swap'],
		queryFn: () => SwapService.getIsSwapAvailable(),
	})

	return { data, isLoading, isError }
}
