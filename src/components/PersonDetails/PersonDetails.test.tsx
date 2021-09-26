import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PersonDetails from './PersonDetails';
import { FamilyMember } from '../FamilyTree/types';

describe('<PersonDetails />', () => {
    test('it should mount', () => {
        render(<PersonDetails member={{} as FamilyMember}/>);

        const personDetails = screen.getByTestId('PersonDetails');

        expect(personDetails).toBeInTheDocument();
    });
});
