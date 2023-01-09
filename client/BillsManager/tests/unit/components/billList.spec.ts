import { fireEvent, render } from '@testing-library/vue'
import { expect, it, describe, vi, afterAll, beforeAll } from 'vitest'

import BillList from '../../../src/components/bill/BillList.vue'

describe('WhiteBox BillList.vue', () => {
	it('When BillList has been rendered, should show the bills too', () => {
		// Arrange & Act
		const result = render(BillList)

		// Assert
		const list = result.getByTestId('div-list')
		expect(list.childElementCount).gt(0)

		const item = data[0]
		const itemElement = result.getByTestId(`item-${item.id}`)
		expect(item.description).toBe(itemElement.textContent)
	})

	it('When reload button was click, refetch fuction should be called', async () => {
		// Arrange
		const result = render(BillList)
		const button = result.getByTestId('button-reload')

		// Act
		await fireEvent.click(button)

		// Assert
		expect(refetch).toHaveBeenCalledTimes(1)
	})
})

const refetch = vi.fn(() => {})
const data = [
	{
		id: '1',
		description: 'Bill Teste',
		dueDate: 10,
		price: 180,
	},
]

beforeAll(() => {
	vi.mock('../../../src/composables/queries/bill', () => ({
		useListQuery: () => ({
			data,
			status: 'success',
			refetch,
		}),
	}))
})
afterAll(() => {
	vi.unmock('../../../src/composables/queries/bill')
})
