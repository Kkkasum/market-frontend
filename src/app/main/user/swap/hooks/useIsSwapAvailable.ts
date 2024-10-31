import { useQuery } from '@tanstack/react-query'

import SwapService from '@/services/swap.service'

export default function useIsSwapAvailable() {
	const { isLoading, isSuccess, isError } = useQuery({
		queryKey: ['swap'],
		queryFn: () => SwapService.getIsSwapAvailable(),
	})

	return { isLoading, isSuccess, isError }
}
