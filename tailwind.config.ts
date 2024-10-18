import type { Config } from 'tailwindcss'

const config: Config = {
	darkMode: ['class'],
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				'dark-gray': '#212A33',
				'gray-text': '#8C9AA8',
				'gray-blue': '#293440',
				'ocean-blue-from': '#013ACA',
				'ocean-blue-to': '#1AC9FF',
				'quepal-from': '#11998E',
				'quepal-to': '#38EF7D',
				'green-beach-from': '#02AABD',
				'green-beach-to': '#00CDAC',
				dark: '#242E38',
				green: '#5aec8c',
				blue: '#238BDA',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}
export default config
