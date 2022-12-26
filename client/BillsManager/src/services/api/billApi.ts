import type { Bill, BillRequest, BillResult } from '@/types/bill'
import axios from 'axios'

const URL = 'https://localhost:7266/api/bill'

export default {
	async list(): Promise<Bill[]> {
		const result = await axios.get<BillResult[]>(URL)

		return result.data.map(createBill)
	},
	async find(id: string): Promise<Bill> {
		const result = await axios.get<BillResult>(`${URL}/${id}`)

		return createBill(result.data)
	},
	async register(request: BillRequest) {
		const result = await axios.post<BillResult>(URL, request)

		return createBill(result.data)
	},
	async update(id: string, request: BillRequest) {
		const result = await axios.put(`${URL}/${id}`, request)

		return result.data
	},
}

function createBill(result: BillResult): Bill {
	return {
		...result,
		validate: new Date(result.validate),
	}
}
