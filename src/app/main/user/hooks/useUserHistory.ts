import { useQuery } from '@tanstack/react-query'

import UserService from '@/services/user.service'

export default function useUserHistory(userId: number) {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['user-history', { userId: userId }],
		queryFn: () => UserService.getUserHistory(userId),
	})

	return { data, isLoading, isError }
}
