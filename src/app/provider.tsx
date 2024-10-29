'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'

import { IWebApp, TelegramContext } from '@/types/webapp.type'

const TelegramProvider = ({ children }: { children: React.ReactNode }) => {
	const [webApp, setWebApp] = useState<IWebApp | null>(null)

	useEffect(() => {
		const app = (window as any).Telegram?.WebApp
		if (app) {
			app.ready()
			setWebApp(app)
		}
	}, [])

	const value = useMemo(() => {
		return webApp
			? {
					webApp,
					unsafeData: webApp.initDataUnsafe,
					user: webApp.initDataUnsafe.user,
			  }
			: {}
	}, [webApp])

	return (
		<TelegramContext.Provider value={value}>
			{children}
		</TelegramContext.Provider>
	)
}

export default function Provider({ children }: { children: React.ReactNode }) {
	const client = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
				retry: 0,
			},
		},
	})

	return (
		<QueryClientProvider client={client}>
			<TelegramProvider>{children}</TelegramProvider>
		</QueryClientProvider>
	)
}
