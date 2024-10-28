import UserService from '@/services/user.service'
import { IAddUserRequest } from '@/types/user.type'
import { useMutation } from '@tanstack/react-query'

export default function useAddUser() {
	const { mutate: addUser, isPending: isAddPending } = useMutation({
		mutationFn: (data: IAddUserRequest) => UserService.addUser(data),
	})

	return { addUser, isAddPending }
}
