import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Update the import
import StockSelector from './components/StockSelector';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<StockSelector />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;