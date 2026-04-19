import axios from 'axios'
import { API_BASE_URL } from '@/shared/config/env.js'

const http = axios.create({
	baseURL: API_BASE_URL,
	timeout: 10000,
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true,
})

export default http
