import { fireEvent, render, screen } from '@testing-library/react';
import { HandleBar } from '.';
import { AppContext } from '../../AppContext';

describe('HandleBar', () => {

    test('renders handle bar component', () => {
        render(<HandleBar />);
    
        expect(screen.getByText('Add')).toBeInTheDocument();
        expect(screen.getByText('Edit')).toBeInTheDocument();
        expect(screen.getByText('Delete')).toBeInTheDocument();
    });

    test('calbacks  handle bar component', () => {
        let step = '';
        const setStep = (stepValue: string) => step = stepValue;
        render( <AppContext value={{ step, setStep }}><HandleBar /></AppContext>);
    
        fireEvent.click(screen.getByText('Add'));
        expect(step).toBe('add');

        fireEvent.click(screen.getByText('Edit'));
        expect(step).toBe('edit');

        fireEvent.click(screen.getByText('Delete'));
        expect(step).toBe('delete');
    });



});