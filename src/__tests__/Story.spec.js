import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, cleanup, waitForElement } from '@testing-library/react';
import { Story } from '../components/story';
import { singularStory } from '../fixtures';
import { getStory } from '../services/hnApi';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { STORY_INCREMENT } from '../constants';

beforeEach(cleanup);

jest.mock('../hooks/useInfiniteScroll.js');

jest.mock('../services/hnApi', () => ({
    getStory: jest.fn(),
}));

test('renders the application', async () => {
    useInfiniteScroll.mockImplementation(() => ({
        count: STORY_INCREMENT,
    }));
    getStory.mockImplementation(() => Promise.resolve(singularStory));

    const {getByText, queryByTestId } = render(<Story />);
    await waitForElement(() => [
        expect(getByText('Test Title')).toBeTruthy(),
        expect(queryByTestId('story-by').textContent).toEqual('By: Karl Hadwen'),
    ]);
});