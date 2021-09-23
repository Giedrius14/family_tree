import React from 'react';
import './App.scss';
import 'typeface-roboto';
import Header from './components/Header/Header';
import { BrowserRouter } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header></Header>
            </BrowserRouter>
        </div>
    );
}

export default App;
