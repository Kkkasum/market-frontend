import { useQuery } from '@tanstack/react-query'

import MarketService from '@/services/market.service'
import { InstantSellAsset } from '@/types/market.type'

export default function useInstantSellPrice(asset: InstantSellAsset) {
	const { data, isLoading } = useQuery({
		queryKey: ['instant-sell', { asset: asset }],
		queryFn: () => MarketService.getInstantSellPrice(asset),
	})

	return { data, isLoading }
}
