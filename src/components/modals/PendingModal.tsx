import { FC } from 'react'

import Modal from '../ui/Modal'

interface Props {
	modalOpen: boolean
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const PendingModal: FC<Props> = ({ modalOpen, setModalOpen }) => {
	return (
		<Modal
			modalOpen={modalOpen}
			setModalOpen={setModalOpen}
			header='Pending...'
		>
			<></>
		</Modal>
	)
}

export default PendingModal
