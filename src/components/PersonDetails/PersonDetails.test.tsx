import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PersonDetails from './PersonDetails';

describe('<PersonDetails />', () => {
    test('it should mount', () => {
        render(<PersonDetails/>);

        const personDetails = screen.getByTestId('PersonDetails');

        expect(personDetails).toBeInTheDocument();
    });
});
