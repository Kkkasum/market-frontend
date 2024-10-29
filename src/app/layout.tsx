import type { Metadata } from 'next'
import { Albert_Sans } from 'next/font/google'

import Provider from './provider'

import Head from 'next/head'
import Script from 'next/script'
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
	return (
		<html lang='en'>
			<body className={`${font.className} antialiased`}>
				<Head>
					<Script src='https://telegram.org/js/telegram-web-app.js' />
				</Head>

				<Provider>{children}</Provider>
			</body>
		</html>
	)
}
