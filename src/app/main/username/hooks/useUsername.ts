import { useQuery } from '@tanstack/react-query'

import UsernameService from '@/services/username.service'

export default function useUsername(username: string) {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['username', { username: username }],
		queryFn: () => UsernameService.getUsername(username),
	})

	return { data, isLoading, isError }
}
