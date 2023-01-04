export interface Bill {
	id: string
	description: string
	price: number
	dueDate: number
}

export interface BillRequest {
	description: string
	price: number
	dueDate: number
}

export function createBill(billRequest?: BillRequest): BillRequest {
	const bill = {
		description: '',
		price: 0,
		dueDate: new Date(),
	}
	return Object.assign(bill, billRequest)
}
