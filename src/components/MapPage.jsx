// - MAP PAGE -//

import React from 'react';
import MapComponent from './MapComponent';
import Navbar from './Nav';



const MapPage = () => {
  const location = { lat: 43.6532, lng: -79.3832 }; // toronto coordinates 

  return (
    <div>
      <Navbar/>
      <h1>Maps</h1>
      <MapComponent location={location} />
    </div>
  );
};

export default MapPage;
