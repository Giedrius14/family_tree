import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreateEditForm from '../CreateEditForm';
import { FamilyMember } from '../../FamilyTree/types';

describe('<CreateEditForm />', () => {
    test('it should mount', () => {
        render(<CreateEditForm selectedMember={{} as FamilyMember}
                               isEditMode={false}
                               handleClose={() => ({})}/>);

        const createEditForm = screen.getByTestId('CreateEditForm');

        expect(createEditForm).toBeInTheDocument();
    });
});
