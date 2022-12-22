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
