import React from 'react';
import { render } from '@testing-library/react';
import Post from "./Post";

describe('Post', () => {
    it('renders the text', async () => {
        // Given
        const expectedText = 'expected text';

        // When
        const { findByRole } = render(<Post text={expectedText} />);

        // Then
        const textElement = await findByRole('text');
        expect(textElement).toHaveTextContent(expectedText);
    });

    it('renders null as empty', async () => {
        // When
        const { findByRole } = render(<Post />);

        // Then
        const textElement = await findByRole('text');
        expect(textElement).toBeEmpty();
    });
});
