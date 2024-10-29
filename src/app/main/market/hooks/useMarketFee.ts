import { useQuery } from '@tanstack/react-query'

import MarketService from '@/services/market.service'
import { MarketAction } from '@/types/market.type'

export default function useMarketFee(action: MarketAction) {
	const { data, isLoading } = useQuery({
		queryKey: ['market-fees', { action: action }],
		queryFn: () => MarketService.getFee(action),
	})

	return { data, isLoading }
}
