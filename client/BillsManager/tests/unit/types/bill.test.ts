import { describe, it, expect } from 'vitest'
import { BillRequest, createBill } from '../../../src/types/bill'

describe('createBill()', () => {
	it('When createBill receive arguments, should return the same data in result', () => {
		// arrange
		const request = {
			description: 'TesteBill',
			dueDate: 10,
			price: 30,
		}

		// act
		const result = createBill(request)

		// assert
		expect(result).toMatchObject(request)
	})

	it('When createBill dont receive arguments, should return an empty bill', () => {
		const emptyBill = {
			description: '',
			dueDate: 0,
			price: 0,
		}

		// act
		const result = createBill()

		expect(result).toMatchObject(emptyBill)
	})
})
