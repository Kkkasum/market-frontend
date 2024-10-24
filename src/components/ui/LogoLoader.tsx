import { motion } from 'framer-motion'

import Circle from './Circle'
import LogoIcon from './icons/LogoIcon'

export default function LogoLoader() {
	return (
		<motion.div
			animate={{ scale: [1, 1.05, 1.1, 1.05, 1] }}
			transition={{ repeat: Infinity, repeatDelay: 0.5 }}
			className='flex items-center justify-center fixed bottom-0 left-0 w-full h-full'
		>
			<Circle className='absolute bg-blue -z-50' />
			<LogoIcon width={100} height={100} />
		</motion.div>
	)
}
