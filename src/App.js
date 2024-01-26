// - MAIN COMPONENT - //

import React from 'react';
import MapComponent from './components/MapComponent';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1 className="text-xl font-bold mb-4">Map</h1>
      <MapComponent location="Toronto, ON" />
    </div>
  );
}

export default App;
