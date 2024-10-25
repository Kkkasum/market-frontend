'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
	href: string
	svg: React.ReactNode
	text: string
}

const NavLink: FC<Props> = ({ href, svg, text }) => {
	const pathname = usePathname()

	return (
		<Link
			href={href}
			className={twMerge(
				'flex flex-col flex-1 items-center justify-center cursor-pointer gap-1 transition-colors duration-300 h-16 rounded-lg',
				pathname === href && 'bg-white/20'
			)}
		>
			{svg}
			{text}
		</Link>
	)
}

export default NavLink
