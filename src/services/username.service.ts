import { axiosBase } from '@/api/interceptors'
import {
	IUsernameByAddressResponse,
	IUsernameResponse,
} from '@/types/username.type'

const UsernameService = {
	async getUsername(username: string) {
		const response = await axiosBase.get<IUsernameResponse>(
			`/username/${username}`
		)
		return response.data
	},

	async getUsernameByAddress(address: string) {
		const response = await axiosBase.get<IUsernameByAddressResponse>(
			`/username/contract/${address}`
		)
		return response.data
	},
}

export default UsernameService
