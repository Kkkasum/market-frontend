import { ITx } from '@/types/history.type'
import { IMarketAsset } from '@/types/market.type'
import { TimeSort } from '@/types/user.type'

export function sortByTime<T extends ITx | IMarketAsset>(
	arr: T[],
	sort: TimeSort
): T[] {
	return arr.sort(
		sort === TimeSort.OLDEST
			? (a, b) => {
					let da = new Date(a.createdAt),
						db = new Date(b.createdAt)
					return da.getTime() - db.getTime()
			  }
			: (a, b) => {
					let da = new Date(a.createdAt),
						db = new Date(b.createdAt)
					return db.getTime() - da.getTime()
			  }
	) as T[]
}
