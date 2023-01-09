import { describe, expect, it, vi } from 'vitest'
import { render } from '@testing-library/vue'

import BillDescriptor from '../../../src/components/bill/BillDescriptor.vue'

const bills = [
	{
		id: '1',
		description: 'Bill Teste',
		dueDate: 10,
		price: 180,
	},
]
vi.mock('../../../src/composables/queries/bill', () => ({
	useFindQuery(id: string) {
		return {
			data: bills.find((c) => c.id === id),
			isLoading: false,
		}
	},
}))

describe('BillDescriptor.vue', () => {
	it('When passed the bill Id, should show the description for the bill id passed', () => {
		// Arrange
		const { getByTestId } = render(BillDescriptor, {
			props: {
				id: bills[0].id,
			},
		})

		// Act
		const bill = {
			id: bills[0].id,
			description: getByTestId('description').textContent,
			price: Number(getByTestId('price').textContent),
			dueDate: Number(getByTestId('dueDate').textContent),
		}

		// Assert
		expect(bill).toMatchObject(bills[0])
	})
})
