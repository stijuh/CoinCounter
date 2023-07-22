import React from 'react';
import './App.css';
import EpicHeader from "./components/EpicHeader/EpicHeader";
import EpicFooter from "./components/EpicFooter/EpicFooter";
import CoinCounter from "./components/CoinCounter/CoinCounter";

function App() {
    return (
        <div className="App">
            <EpicHeader/>

            <main className="content">
                <CoinCounter/>
            </main>

            <EpicFooter/>
        </div>
    );
}

export default App;
