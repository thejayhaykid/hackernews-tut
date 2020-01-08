import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, cleanup, waitForElement, getByTestId } from '@testing-library/react';
import { Story } from '../components/story';
import { singularStory } from '../fixtures';
import { getStory } from '../services/hnApi';

beforeEach(() => {
    cleanup();
    jest.resetAllMocks();
});

jest.mock('../services/hnApi', () => ({
    getStory: jest.fn(),
}));

test('renders the story component', async () => {
    getStory.mockImplementation(() => Promise.resolve(singularStory));

    const {getByText, queryByTestId, getByTestId } = render(<Story storyId="1" />);
    await waitForElement(() => [
        expect(getByTestId('story')).toBeTruthy(),
        expect(getByText('Test Title')).toBeTruthy(),
        expect(queryByTestId('story-by').textContent).toEqual('By: Karl Hadwen'),
    ]);
});