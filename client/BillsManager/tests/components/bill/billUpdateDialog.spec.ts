import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { BillRequest } from '../../../src/types/bill'

import BillUpdateDialog from '../../../src/components/bill/BillUpdateDialog.vue'
import { fireEvent, render, waitFor } from '@testing-library/vue'

const mutate = vi.fn((bill: BillRequest) => {
	return bill
})
const bills = [
	{
		id: '1',
		description: 'Bill Teste',
		dueDate: 10,
		price: 180,
	},
]

beforeAll(() => {
	vi.mock('../../../src/composables/queries/bill', () => {
		return {
			useFindQuery(id: string) {
				return {
					data: bills.find((b) => b.id === id),
					isLoading: false,
				}
			},
			useUpdateQuery() {
				return { mutate }
			},
		}
	})
})
afterAll(() => {
	vi.unmock('../../../src/composables/queries/bill')
})

describe('(BlackBox) BillUpdateDialog.vue', () => {
	it('x', async () => {
		const { getByTestId, emitted, debug } = render(BillUpdateDialog, {
			props: { id: bills[0].id },
		})

		await fireEvent.click(getByTestId('button-update'))
		const getDialog = () => getByTestId('dialog')
		expect(getDialog).not.toThrowError()

		await waitFor(() => getByTestId('input-descricao'))
		const form = {
			description: getByTestId<HTMLInputElement>('input-descricao'),
			price: getByTestId<HTMLInputElement>('input-preco'),
			dueDate: getByTestId<HTMLInputElement>('input-vencimento'),
			button: getByTestId<HTMLButtonElement>('button-apply'),
		}
		const input = {
			id: bills[0].id,
			description: 'Descrição Alterada',
			dueDate: 30,
			price: 60,
		}
		await Promise.all([
			fireEvent.update(form.description, input.description),
			fireEvent.update(form.dueDate, input.dueDate.toString()),
			fireEvent.update(form.price, input.price.toString()),
		])
		await fireEvent.click(form.button)
		expect(mutate).toHaveBeenCalledTimes(1)
		expect(mutate).toHaveBeenCalledWith(input)

		await fireEvent.click(getByTestId('button-update'))
		expect(getDialog).toThrowError()
	})
})
