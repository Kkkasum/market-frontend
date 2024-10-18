import Header from '@/components/ui/Header'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header />

			<main className='flex flex-col mt-16 h-full overflow-hidden px-5'>
				{children}
			</main>
		</>
	)
}
