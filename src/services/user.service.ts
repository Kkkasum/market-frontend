import { axiosBase } from '@/api/interceptors'
import {
	IAddUserRequest,
	IUserHistoryResponse,
	IUserResponse,
	IUserWalletResponse,
} from '@/types/user.type'

const UserService = {
	async getUser(userId?: number) {
		const response = await axiosBase.get<IUserResponse>(`/user/${userId}`)
		return response.data
	},

	async getUserWallet(userId: number) {
		const response = await axiosBase.get<IUserWalletResponse>(
			`/user/wallet/${userId}`
		)
		return response.data
	},

	async getUserHistory(userId: number) {
		const response = await axiosBase.get<IUserHistoryResponse>(
			`/user/history/${userId}`
		)
		return response.data
	},

	async addUser(data: IAddUserRequest) {
		const response = await axiosBase.post('/user', data)
		return response.status
	},
}

export default UserService
