import React from 'react';
import './App.scss';
import Mario from './Component/MarioPage';
import { Route, Routes } from 'react-router-dom';
import Start from './Component/StartPage';

function App() {    
    return (
        <div>
            <Routes>
                <Route path="/" element={<Start />}/>
               <Route path="gamemario" element={<Mario /> }/>
            </Routes>
        </div>
    );
}

export default App;