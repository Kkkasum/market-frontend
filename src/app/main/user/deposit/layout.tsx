'use client'

import { THEME, TonConnectUIProvider } from '@tonconnect/ui-react'

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<TonConnectUIProvider
				manifestUrl='https://raw.githubusercontent.com/Kkkasum/tonconnect-data/main/manifest.json'
				uiPreferences={{ theme: THEME.DARK }}
				// actionsConfiguration={{
				// twaReturnUrl: 'https://lizartsworld.com'
				// }}
			>
				{children}
			</TonConnectUIProvider>
		</>
	)
}
