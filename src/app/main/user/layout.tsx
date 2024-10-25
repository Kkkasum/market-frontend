import Nav from '@/components/ui/nav/Nav'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Nav />

			<div className='mt-24'>{children}</div>
		</>
	)
}
