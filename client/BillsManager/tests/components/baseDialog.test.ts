import { fireEvent, render } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import BaseDialog from '../../src/components/BaseDialog.vue'

describe('baseDialog.vue', () => {
	const Component = {
		template: `
            <div>
                <BaseDialog title="teste">
                    <template #on="{ open }">
                        <button data-testid="dialog-button" @click="open">Teste</button> 
                    </template>
                    <template #content>
                        <h1 data-testid="dialog-title">Teste Content Dialog</h1>
                    </template>
                </BaseDialog>
            </div>
        `,
		components: { BaseDialog },
	}

	it('Should hide the dialog content', async () => {
		// Arrange
		const result = render(Component)

		// Act
		const action = () => result.getByTestId('dialog-title')

		// Assert
		expect(action).toThrowError()
	})

	it('Should show the dialog content', async () => {
		// Arrange
		const result = render(Component)
		const button = result.getByTestId('dialog-button')

		// Act
		await fireEvent.click(button)

		// Assert
		const title = result.getByTestId('dialog-title')
		expect(title.textContent).equal('Teste Content Dialog')
	})
})
