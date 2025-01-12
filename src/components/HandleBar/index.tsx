import './HandleBar.css';
import { useContext } from 'react';
import Button from '@mui/material/Button';
import { AppContext } from '../../AppContext';

export function HandleBar() {
    const { setStep } = useContext(AppContext);

    return (
        <div className='handle-bar-container'>
            <Button variant="contained" className='handle-bar-button' onClick={() => setStep('add')}>Add</Button>
            <Button variant="contained" className='handle-bar-button' onClick={() => setStep('edit')}>Edit</Button>
            <Button variant="contained" className='handle-bar-button' onClick={() => setStep('delete')}>Delete</Button>
        </div>
    );
}