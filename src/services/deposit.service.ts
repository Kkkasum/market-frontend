import { axiosBase } from '@/api/interceptors'
import {
	IDepositAddressResponse,
	IDepositNumberRequest,
	IDepositTokenRequest,
	IDepositTokenTransaction,
	IDepositUsernameRequest,
} from '@/types/deposit.type'
import { beginCell, toNano } from '@ton/core'
import { CHAIN, SendTransactionRequest } from '@tonconnect/ui-react'

const DepositService = {
	async getDepositAddress() {
		const response = await axiosBase.get<IDepositAddressResponse>(
			'/user/deposit/address'
		)
		return response.data
	},

	async depositToken(data: IDepositTokenRequest) {
		const response = await axiosBase.post('/user/deposit/token', data)
		return response.status
	},

	async depositNumber(data: IDepositNumberRequest) {
		const response = await axiosBase.post('/user/deposit/number', data)
		return response.status
	},

	async depositUsername(data: IDepositUsernameRequest) {
		const response = await axiosBase.post('/user/deposit/username', data)
		return response.status
	},

	createDepositTokenTransaction(
		tx: IDepositTokenTransaction
	): SendTransactionRequest {
		const body = beginCell()
			.storeUint(0, 32)
			.storeStringTail(tx.userId.toString())
			.endCell()

		return {
			network: CHAIN.TESTNET,
			validUntil: Math.floor(Date.now() / 1000) + 300,
			messages: [
				{
					address: tx.depositAddress,
					amount: toNano(tx.amount).toString(),
					payload: body.toBoc().toString('base64'),
				},
			],
		}
	},
}

export default DepositService
