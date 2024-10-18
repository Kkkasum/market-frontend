interface Props {
	width: number
	height: number
	color?: string
}

export default function TonIcon({ width, height, color }: Props) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={width}
			height={height}
			viewBox='0 0 48 48'
		>
			<path
				fill={color || '#fff'}
				d='M40.205 0H7.792c-5.96 0-9.74 6.428-6.74 11.626l20.005 34.677c1.306 2.263 4.577 2.263 5.883 0l20.01-34.677C49.946 6.44 46.167 0 40.212 0h-.007ZM21.04 35.904l-4.357-8.432L6.17 8.668c-.694-1.204.162-2.746 1.615-2.746h13.25v29.987l.005-.005Zm20.775-27.24-10.51 18.811-4.357 8.429V5.918H40.2c1.453 0 2.309 1.543 1.615 2.746Z'
			/>
		</svg>
	)
}
