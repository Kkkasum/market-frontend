import WebApp from '@twa-dev/sdk'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function useBackButton(route: string) {
	const { push } = useRouter()

	useEffect(() => {
		if (typeof window !== 'undefined') {
			WebApp.BackButton.show()
			WebApp.BackButton.onClick(() => push(route))
		}
	}, [])
}
