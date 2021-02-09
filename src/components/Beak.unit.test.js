import React from 'react';
import { render } from '@testing-library/react';
// import { Beak } from './Beak';

describe('Beak', () => {
    it('renders default state', () => {
        render(<polygon points={undefined} fill="yellow" stroke="pink" opacity={undefined}/>)
    })
})