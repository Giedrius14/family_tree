import React from 'react';
import './App.scss';
import 'typeface-roboto';
import Header from './components/Header/Header';
import { BrowserRouter } from 'react-router-dom';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider } from '@mui/lab';

function App() {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className="App">
                <BrowserRouter>
                    <Header></Header>
                </BrowserRouter>
            </div>
        </LocalizationProvider>
    );
}

export default App;
