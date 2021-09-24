import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreateEditForm from './CreateEditForm';

describe('<CreateEditForm />', () => {
    test('it should mount', () => {
        render(<CreateEditForm/>);

        const createEditForm = screen.getByTestId('CreateEditForm');

        expect(createEditForm).toBeInTheDocument();
    });
});
