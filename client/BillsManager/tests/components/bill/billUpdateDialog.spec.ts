import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { BillRequest } from '../../../src/types/bill'
import { fireEvent, render, waitFor } from '@testing-library/vue'

import BillUpdateDialog from '../../../src/components/bill/BillUpdateDialog.vue'

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

		const elements = {
			description: getByTestId<HTMLInputElement>('input-descricao'),
			price: getByTestId<HTMLInputElement>('input-preco'),
			dueDate: getByTestId<HTMLInputElement>('input-vencimento'),
			button: getByTestId<HTMLButtonElement>('button-apply'),
		}

		return {
			elements,
			get data() {
				return {
					id: bills[0].id,
					description: elements.description.value,
					dueDate: elements.dueDate.valueAsNumber,
					price: elements.price.valueAsNumber,
				}
			},
		}
	}

	describe('Dialog interactions', () => {
		it('Should open', async () => {
			// Arrange
			const { getByTestId } = setup()

			// Act
			await fireEvent.click(getByTestId('button-update'))

			// Assert
			expect(() => getByTestId('dialog')).not.toThrowError()
		})

		it('Should close', async () => {
			// Arrange
			const { getByTestId } = setup()

			// Act
			await fireEvent.dblClick(getByTestId('button-update'))

			// Assert
			expect(() => getByTestId('dialog')).toThrowError()
		})
	})

	describe('Form and mutate interactions', () => {
		it('Form with the value passed', async () => {
			// Arrange
			const { getByTestId } = setup()
			await fireEvent.click(getByTestId('button-update'))

			// Act
			const { data } = await getForm(getByTestId)

			// Assert
			expect(bills[0]).toMatchObject(data)
		})

		it('Mutate should receive updated values from form', async () => {
			// Arrange
			const { getByTestId } = setup()
			await fireEvent.click(getByTestId('button-update'))

			const { elements } = await getForm(getByTestId)
			const input = {
				description: 'descrição alterada',
				dueDate: 30,
				price: 60,
			}
			Object.getOwnPropertyNames(input).forEach((c) =>
				fireEvent.update(elements[c], input[c].toString())
			)

			// Act
			await fireEvent.click(elements.button)

			// Assert
			expect(mutate).toHaveBeenCalledTimes(1)
			expect(mutate).toHaveBeenCalledWith({ id: bills[0].id, ...input })
		})
	})
})

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
	vi.mock('../../../src/composables/queries/bill', () => ({
		useFindQuery(id: string) {
			return {
				data: bills.find((b) => b.id === id),
				isLoading: false,
			}
		},
		useUpdateQuery() {
			return { mutate }
		},
	}))
})
afterAll(() => {
	vi.unmock('../../../src/composables/queries/bill')
})
