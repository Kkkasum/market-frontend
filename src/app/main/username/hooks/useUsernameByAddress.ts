import { useQuery } from '@tanstack/react-query'

import UsernameService from '@/services/username.service'

export default function useUsernameByAddress(
	address: string,
	enabled: boolean
) {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['username-by-address', { address: address }],
		queryFn: () => UsernameService.getUsernameByAddress(address),
		enabled: enabled,
	})

	return { data, isLoading, isError }
}
