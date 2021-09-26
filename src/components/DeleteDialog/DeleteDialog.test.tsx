import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DeleteDialog from './DeleteDialog';

describe('<DeleteDialog />', () => {
  test('it should mount', () => {
    render(<DeleteDialog open={true} onClose={() => ({})} onSubmit={() => ({})}/>);

    const deleteDialog = screen.getByTestId('DeleteDialog');

    expect(deleteDialog).toBeInTheDocument();
  });
});
