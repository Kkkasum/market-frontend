import {
	AnimatePresence,
	motion,
	useAnimate,
	useDragControls,
	useMotionValue,
} from 'framer-motion'
import { FC } from 'react'

interface Props {
	modalOpen: boolean
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
	header?: string
	children: React.ReactNode
}

const Modal: FC<Props> = ({ modalOpen, setModalOpen, header, children }) => {
	const [scope, animate] = useAnimate()

	const y = useMotionValue(0)
	const controls = useDragControls()

	const handleClose = async () => {
		animate(scope.current, {
			opacity: [1, 0],
		})

		const yStart = typeof y.get() === 'number' ? y.get() : 0

		await animate('#drawer', {
			y: [yStart, 200],
		})

		setModalOpen(false)
	}

	return (
		<AnimatePresence>
			{modalOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					onClick={handleClose}
					ref={scope}
					className='fixed inset-0 backdrop-blur-xl'
				>
					<motion.div
						id='drawer'
						className='flex flex-col fixed bottom-0 left-0 right-0 h-auto w-full pt-5 gap-3 rounded-tl-2xl rounded-tr-2xl border border-white/5 bg-gray-blue z-20'
						onClick={e => e.stopPropagation()}
						initial={{ y: '100%' }}
						animate={{ y: '0%' }}
						style={{ y }}
						transition={{ ease: 'easeInOut' }}
						drag='y'
						dragControls={controls}
						dragListener={false}
						dragConstraints={{
							top: 0,
							bottom: 0,
						}}
						dragElastic={{
							top: 0,
							bottom: 0.5,
						}}
						onDragEnd={() => {
							if (y.get() >= 20) handleClose()
						}}
					>
						<div
							className='absolute top-0 bottom-0 left-0 right-0 flex justify-center p-4 cursor-grab active:cursor-grabbing'
							onPointerDown={e => {
								controls.start(e)
							}}
						>
							<button className='h-1 w-10 touch-none rounded-full bg-white' />
						</div>

						{header && (
							<>
								<p className='flex items-center justify-start text-lg font-medium px-5 py-1'>
									<span>{header}</span>
								</p>
								<hr className='border border-solid border-white/10 w-full' />
							</>
						)}

						<div className='flex flex-col justify-between px-5 py-3 z-0'>
							{children}
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}

export default Modal
