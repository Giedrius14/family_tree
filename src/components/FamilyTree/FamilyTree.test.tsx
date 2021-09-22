import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FamilyTree from './FamilyTree';

describe('<FamilyTree />', () => {
  test('it should mount', () => {
    render(<FamilyTree />);
    
    const familyTree = screen.getByTestId('FamilyTree');

    expect(familyTree).toBeInTheDocument();
  });
});