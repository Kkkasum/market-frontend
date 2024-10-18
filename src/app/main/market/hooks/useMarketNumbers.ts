import { useQuery } from '@tanstack/react-query'

import MarketService from '@/services/market.service'

export default function useMarketNumbers() {
	const { data, isLoading } = useQuery({
		queryKey: ['market-numbers'],
		queryFn: () => MarketService.getNumbers(),
	})

	return { data, isLoading }
}
