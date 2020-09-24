import React from 'react';
import { render } from '@testing-library/react';
import Post from "./Post";

describe('Post', () => {
    it('renders the text', async () => {
        // Given
        const expectedText = 'expected text';

        // When
        const { findByTestId } = render(<Post text={expectedText} />);

        // Then
        const textElement = await findByTestId('text');
        expect(textElement).toHaveTextContent(expectedText);
    });

    it('renders null as empty', async () => {
        // When
        const { findByTestId } = render(<Post />);

        // Then
        const textElement = await findByTestId('text');
        expect(textElement).toBeEmpty();
    });
});
