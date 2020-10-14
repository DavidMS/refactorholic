import React from 'react';
import {render} from '@testing-library/react';
import ListedPost from "./ListedPost";

describe('ListedPost', () => {
    it('renders the title', async () => {
        // Given
        const expectedTitle = 'expected title';

        // When
        const {container} = render(<ListedPost title={expectedTitle}/>);

        // Then
        const containerNode = container.firstChild;
        const titleNode = containerNode.firstChild;
        expect(containerNode.className).toBe('listed-post');
        expect(titleNode.className).toBe('listed-post-title');
        expect(titleNode.textContent).toBe(expectedTitle);
    });

    it('renders null title as empty', async () => {
        // When
        const {container} = render(<ListedPost/>);

        // Then
        const titleNode = container.firstChild.firstChild;
        expect(titleNode.textContent).toBe('');
    });
});
