import { render, fireEvent } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import { BillRequest } from '../../../src/types/bill'

import BillForm from '../../../src/components/bill/BillForm.vue'

describe('BillForm.test.vue', () => {
	const bill: BillRequest = {
		description: 'Teste descrição',
		dueDate: 10,
		price: 30,
	}

	it('When fill form, the result applied should be the same filled', async () => {
		//Arrange
		const result = render(BillForm)

		await fireEvent.update(
			result.getByTestId<HTMLInputElement>('input-descricao'),
			bill.description
		)
		await fireEvent.update(
			result.getByTestId<HTMLInputElement>('input-preco'),
			bill.price.toString()
		)
		await fireEvent.update(
			result.getByTestId<HTMLInputElement>('input-vencimento'),
			bill.dueDate.toString()
		)

		// Act
		await fireEvent.click(result.getByTestId('button-apply'))

		// Assert
		const applied = result.emitted<BillRequest[]>()['applied']
		expect(applied[0][0]).toMatchObject(bill)
	})

	it('When form receive data, the inputs should update their values', () => {
		// Arrange
		const { getByTestId } = render(BillForm, {
			props: {
				bill,
			},
		})

		// Act
		const form = {
			description: getByTestId<HTMLInputElement>('input-descricao').value,
			price: getByTestId<HTMLInputElement>('input-preco').value,
			dueDate: getByTestId<HTMLInputElement>('input-vencimento').value,
		}

		// Assert
		expect(bill).toMatchObject(form)
	})

	it('When in loading, the button should be unclickable', async () => {
		// Arrange
		const { getByTestId, rerender } = render(BillForm, {
			props: { loading: false },
		})

		// Act
		await rerender({ loading: true })

		// Assert
		const button = getByTestId('button-apply')
		expect(button.hasAttribute('disabled')).toBeTruthy()
	})

	it('When is not loading, the button should be clickable', async () => {
		// Arrange
		const { getByTestId, rerender } = render(BillForm, {
			props: { loading: true },
		})

		// Act
		await rerender({ loading: false })

		// Assert
		const button = getByTestId('button-apply')
		expect(button.hasAttribute('disabled')).toBeFalsy()
	})
})
