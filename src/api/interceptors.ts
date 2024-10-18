import axios, { CreateAxiosDefaults } from 'axios'

const options: CreateAxiosDefaults = {
	baseURL: process.env.API_URL,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
}

const axiosBase = axios.create(options)

axiosBase.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config

		if (error?.response?.status === 404) {
			originalRequest._isRetry = false
			return Promise.reject(error)
		}

		return Promise.reject(error)
	}
)

export { axiosBase }
