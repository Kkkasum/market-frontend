import UserService from '@/services/user.service'
import { IAddUserRequest } from '@/types/user.type'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function useAddUser(userId: number) {
	const queryClient = useQueryClient()

	const { mutate: addUser, isPending: isAddPending } = useMutation({
		mutationKey: ['add-user', { userId: userId }],
		mutationFn: (data: IAddUserRequest) => UserService.addUser(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['user', { userId: userId }],
			})
		},
	})

	return { addUser, isAddPending }
}
