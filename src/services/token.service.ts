import { axiosBase } from '@/api/interceptors'
import { ITokenRateResponse } from '@/types/token.type'

const TokenService = {
	async getTokenRate(fromToken: string, toToken: string) {
		const response = await axiosBase.get<ITokenRateResponse>(
			`/token/rate/${fromToken}`
		)
		return response.data
	},
}

export default TokenService
