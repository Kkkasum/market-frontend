'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function Provider({ children }: { children: React.ReactNode }) {
	const client = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
				retry: 0,
			},
		},
	})

	return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
