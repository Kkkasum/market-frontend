import { useQuery } from '@tanstack/react-query'

import TokenService from '@/services/token.service'

export default function useTokenRate(fromToken: string, toToken: string) {
	const { data, isLoading } = useQuery({
		queryKey: ['token-rate', { fromToken: fromToken, toToken: toToken }],
		queryFn: () => TokenService.getTokenRate(fromToken, toToken),
		gcTime: 10,
	})

	return { data, isLoading }
}
