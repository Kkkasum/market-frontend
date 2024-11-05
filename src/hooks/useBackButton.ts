import WebApp from '@twa-dev/sdk'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'

export default function useBackButton() {
	const router = useRouter()

	const handleBackButtonClick = useCallback(() => router.back(), [router])

	useEffect(() => {
		WebApp.BackButton.onClick(handleBackButtonClick)
		WebApp.BackButton.show()

		return () => {
			WebApp.BackButton.hide()
			WebApp.BackButton.offClick(handleBackButtonClick)
		}
	}, [])
}
