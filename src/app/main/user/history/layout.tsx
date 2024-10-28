export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className='flex flex-col gap-3'>
			<span className='text-start text-2xl font-bold'>History</span>

			{children}
		</div>
	)
}
