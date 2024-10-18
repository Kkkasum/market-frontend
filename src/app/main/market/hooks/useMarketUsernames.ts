import MarketService from '@/services/market.service'
import { useQuery } from '@tanstack/react-query'

export default function useMarketUsernames() {
	const { data, isLoading } = useQuery({
		queryKey: ['market-usernames'],
		queryFn: () => MarketService.getUsernames(),
	})

	return { data, isLoading }
}
