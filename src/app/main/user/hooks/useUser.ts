import { useQuery } from '@tanstack/react-query'

import UserService from '@/services/user.service'

export default function useUser(userId?: number) {
	const { data, isLoading, isFetching } = useQuery({
		queryKey: ['user', { userId: userId }],
		queryFn: () => UserService.getUser(userId),
		gcTime: 100000,
	})

	return { data, isLoading, isFetching }
}
