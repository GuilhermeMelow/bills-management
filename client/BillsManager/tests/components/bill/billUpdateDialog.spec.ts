import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { BillRequest } from '../../../src/types/bill'
import { fireEvent, render, waitFor } from '@testing-library/vue'

import BillUpdateDialog from '../../../src/components/bill/BillUpdateDialog.vue'

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
	const setup = () => {
		return render(BillUpdateDialog, {
			props: { id: bills[0].id },
		})
	}

	const getForm = async (
		getByTestId: <T extends HTMLElement>(id: string) => T
	) => {
		await waitFor(() => getByTestId('input-descricao'))

		return {
			description: getByTestId<HTMLInputElement>('input-descricao'),
			price: getByTestId<HTMLInputElement>('input-preco'),
			dueDate: getByTestId<HTMLInputElement>('input-vencimento'),
			button: getByTestId<HTMLButtonElement>('button-apply'),
		}
	}

	it('Open dialog', async () => {
		// Arrange
		const { getByTestId } = setup()

		// Act
		await fireEvent.click(getByTestId('button-update'))

		// Assert
		expect(() => getByTestId('dialog')).not.toThrowError()
	})

	it('Form with the value passed', async () => {
		// Arrange
		const { getByTestId } = setup()
		await fireEvent.click(getByTestId('button-update'))

		// Act
		const form = await getForm(getByTestId)

		// Assert
		expect(bills[0]).toMatchObject({
			description: form.description.value,
			dueDate: form.dueDate.valueAsNumber,
			price: form.price.valueAsNumber,
		})
	})

	it('Mutate should receive updated values from form', async () => {
		// Arrange
		const { getByTestId } = setup()
		await fireEvent.click(getByTestId('button-update'))

		const form = await getForm(getByTestId)
		await Promise.all([
			fireEvent.update(form.description, form.description.value),
			fireEvent.update(form.dueDate, form.dueDate.value),
			fireEvent.update(form.price, form.price.value),
		])

		// Act
		await fireEvent.click(form.button)

		// Assert
		expect(mutate).toHaveBeenCalledTimes(1)
		expect(mutate).toHaveBeenCalledWith({
			id: bills[0].id,
			description: form.description.value,
			dueDate: form.dueDate.valueAsNumber,
			price: form.price.valueAsNumber,
		})
	})
})
