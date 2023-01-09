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
	it('x', () => {
		const { getByTestId } = render(BillDescriptor, {
			props: {
				id: bills[0].id,
			},
		})

		const bill = {
			id: bills[0].id,
			description: getByTestId('description').textContent,
			price: Number(getByTestId('price').textContent),
			dueDate: Number(getByTestId('dueDate').textContent),
		}

		expect(bill).toMatchObject(bills[0])
	})
})
