/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		API_URL: process.env.API_URL,
		BOT_TOKEN: process.env.BOT_TOKEN,
	},
}

export default nextConfig
