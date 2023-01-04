import type { Bill, BillRequest } from '@/types/bill'
import axios from 'axios'

const URL = 'https://localhost:7266/api/bill'

export default {
	async list() {
		const result = await axios.get<Bill[]>(URL)

		return result.data
	},
	async find(id: string) {
		const result = await axios.get<Bill>(`${URL}/${id}`)

		return result.data
	},
	async register(request: BillRequest) {
		const result = await axios.post<Bill>(URL, request)

		return result.data
	},
	async update(id: string, request: BillRequest) {
		const result = await axios.put(`${URL}/${id}`, request)

		return result.data
	},
}
