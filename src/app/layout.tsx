import type { Metadata } from 'next'
import { Albert_Sans } from 'next/font/google'

import Provider from './providers'

import './globals.css'

const font = Albert_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'UseTON',
	icons: {
		icon: [
			{
				url: '/blue-ton.svg',
				href: '/blue-ton.svg',
			},
		],
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={`${font.className} antialiased`}>
				<Provider>{children}</Provider>
			</body>
		</html>
	)
}
