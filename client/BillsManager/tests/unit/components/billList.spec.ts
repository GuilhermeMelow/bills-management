import { fireEvent, render, RenderResult } from '@testing-library/vue'
import { expect, it, describe, vi, beforeEach, Mock } from 'vitest'
import { useListQuery } from '../../../src/composables/queries/bill'

import BillList from '../../../src/components/bill/BillList.vue'

vi.mock('../../../src/composables/queries/bill', async () => {
	const data = [
		{
			id: '1',
			description: 'Bill Teste',
			dueDate: 10,
			price: 180,
		},
	]

	return {
		useListQuery: () => ({
			data,
			status: 'success',
			refetch: vi.fn(),
		}),
	}
})

describe('WhiteBox BillList.vue', () => {
	it('some test', async () => {
		const result: RenderResult = render(BillList)

		expect(result.getByTestId('div-list').childElementCount).gt(0)
	})
})
