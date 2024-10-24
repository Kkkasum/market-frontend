import { axiosBase } from '@/api/interceptors'
import {
	IAddMarketNumberRequest,
	IAddMarketUsernameRequest,
	IBuyNumberRequest,
	IBuyUsernameRequest,
	IInstantSellNumberRequest,
	IInstantSellPriceResponse,
	IInstantSellUsernameRequest,
	IMarketNumbersResponse,
	IMarketUsernamesResponse,
	InstantSellAsset,
} from '@/types/market.type'

const MarketService = {
	async getNumbers() {
		const response = await axiosBase.get<IMarketNumbersResponse>(
			'/market/numbers'
		)
		return response.data
	},

	async getUsernames() {
		const response = await axiosBase.get<IMarketUsernamesResponse>(
			'/market/usernames'
		)
		return response.data
	},

	async getInstantSellPrice(asset: InstantSellAsset) {
		const response = await axiosBase.get<IInstantSellPriceResponse>(
			'/market/instant-sell/price',
			{ params: { asset: asset } }
		)
		return response.data
	},

	async addNumber(data: IAddMarketNumberRequest) {
		const response = await axiosBase.post('/market/add/number', data)
		return response.status
	},

	async addUsername(data: IAddMarketUsernameRequest) {
		const response = await axiosBase.post('/market/add/username', data)
		return response.status
	},

	async removeNumber(userId: number, numberId: number) {
		const response = await axiosBase.put(
			`/market/remove/number/${userId}/${numberId}`
		)
		return response.status
	},

	async removeUsername(userId: number, usernameId: number) {
		const response = await axiosBase.put(
			`/market/remove/username/${userId}/${usernameId}`
		)
		return response.status
	},

	async buyNumber(data: IBuyNumberRequest) {
		const response = await axiosBase.post('/market/buy/number', data)
		return response.status
	},

	async buyUsername(data: IBuyUsernameRequest) {
		const response = await axiosBase.post('/market/buy/username', data)
		return response.status
	},

	async instantSellNumber(data: IInstantSellNumberRequest) {
		const response = await axiosBase.post(
			'/market/instant-sell/number',
			data
		)
		return response.status
	},

	async instantSellUsername(data: IInstantSellUsernameRequest) {
		const response = await axiosBase.post(
			'/market/instant-sell/username',
			data
		)
		return response.status
	},
}

export default MarketService
