import { FC, useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface Tab {
	label: string
	value: string
	content: React.ReactNode
}

interface Props {
	tabs: Tab[]
}

const Tabs: FC<Props> = ({ tabs }) => {
	const [activeTab, setActiveTab] = useState<string>(tabs[0].value)

	return (
		<div className='flex flex-col justify-center gap-3'>
			<div className='flex items-center justify-between'>
				{tabs.map(({ label, value }) => (
					<p
						key={value}
						className={twMerge(
							'flex justify-center border-b-4 border-solid w-1/2 p-2 transition-all duration-300 cursor-pointer font-medium',
							activeTab === value
								? 'border-blue'
								: 'border-transparent text-gray-text'
						)}
						onClick={() => setActiveTab(value)}
					>
						{label}
					</p>
				))}
			</div>

			{tabs
				.filter(tab => tab.value === activeTab)
				.map(tab => tab.content)}
		</div>
	)
}

export default Tabs
