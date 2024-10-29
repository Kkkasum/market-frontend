import type { Metadata } from 'next'
import { Albert_Sans } from 'next/font/google'

import Provider from './provider'

import WebApp from '@twa-dev/sdk'
import './globals.css'

const font = Albert_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'UseTON',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	if (typeof window !== 'undefined') {
		WebApp.ready()
	}

	return (
		<html lang='en'>
			<body className={`${font.className} antialiased`}>
				<Provider>{children}</Provider>
			</body>
		</html>
	)
}
