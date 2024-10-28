import { FC, useState } from 'react'

import NftWithdrawalTxModal from '@/components/modals/history/NftWithdrawalTxModal'
import Table from '@/components/ui/Table'
import { INftWithdrawalTx } from '@/types/history.type'
import { formatAddress, formatNumber } from '@/utils/formatters'
import isNumber from '@/utils/isNumber'

interface Props {
	txs: INftWithdrawalTx[]
}

const NftWithdrawalTable: FC<Props> = ({ txs }) => {
	const [tx, setTx] = useState<INftWithdrawalTx>()
	const [modalOpen, setModalOpen] = useState<boolean>(false)

	const fields = ['NFT', 'Address']

	const onClick = (tx: INftWithdrawalTx) => {
		setTx(tx)
		setModalOpen(true)
	}

	return (
		<>
			<Table fields={fields}>
				{txs.map(tx => (
					<tr
						key={tx.id}
						className='bg-dark hover:bg-gray-blue transition-colors duration-150 cursor-pointer border-b-[1px] border-black'
						onClick={() => onClick(tx)}
					>
						<th className='flex items-center gap-1 font-medium'>
							{isNumber(tx.nftName)
								? formatNumber(tx.nftName)
								: `@${tx.nftName}`}
						</th>

						<td className='relative'>
							<span className='right-caret'>
								{formatAddress(tx.nftAddress)}
							</span>
						</td>
					</tr>
				))}
			</Table>

			{tx && (
				<NftWithdrawalTxModal
					modalOpen={modalOpen}
					setModalOpen={setModalOpen}
					tx={tx}
				/>
			)}
		</>
	)
}

export default NftWithdrawalTable
