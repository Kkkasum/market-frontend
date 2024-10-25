import { useQuery } from '@tanstack/react-query'

import MarketService from '@/services/market.service'

export default function useInstantSellNumberPrice() {
	const { data, isLoading } = useQuery({
		queryKey: ['instant-sell-number'],
		queryFn: () => MarketService.getInstantSellNumberPrice(),
	})

	return { data, isLoading }
}
