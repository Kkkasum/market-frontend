import { useQuery } from '@tanstack/react-query'

import NumberService from '@/services/number.service'

export default function useNumber(number: string) {
	const { data, isLoading } = useQuery({
		queryKey: ['number', { number: number }],
		queryFn: () => NumberService.getNumber(number),
	})

	return { data, isLoading }
}
