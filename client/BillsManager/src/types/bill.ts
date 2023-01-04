export interface Bill {
	id: string
	description: string
	price: number
	validate: Date
}

export interface BillRequest {
	description: string
	price: number
	validate: Date
}

export interface BillResult {
	id: string
	description: string
	price: number
	validate: string
}

export function createBill(billRequest?: BillRequest): BillRequest {
	const bill = {
		description: '',
		price: 0,
		validate: new Date(),
	}
	return Object.assign(bill, billRequest)
}
