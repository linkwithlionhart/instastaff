import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Map from './Map';
import { useApplicationData } from '../hooks/useApplicationData';
import JobPostingsModal from './JobPostingsModal';

const MapPage = () => {
  const navigate = useNavigate();
  const { state, setSelectedJob } = useApplicationData();
  const [selectedJobId, setSelectedJobId] = useState(null);

  // Function to calculate the center of the map based on the borders
  function calculateCenter(borders) {
    let latSum = 0;
    let lngSum = 0;
    let count = 0;

    borders.forEach((border) => {
      border.forEach((coord) => {
        latSum += coord.lat;
        lngSum += coord.lng;
        count++;
      });
    });

    return {
      lat: latSum / count,
      lng: lngSum / count,
    };
  }

  //borders of map
  const borders = [
    [
      { lat: 43.6817, lng: -79.4572 },
      { lat: 43.6329, lng: -79.4250 },
      { lat: 43.6396, lng: -79.3935 },
      { lat: 43.6879, lng: -79.3935 },
      { lat: 43.6879, lng: -79.4572 },
      { lat: 43.6817, lng: -79.4572 },
    ]
  ];

  // center of the map based on the borders
  const location = calculateCenter(borders);

  

  const markers = state.jobPostings.map((posting) => ({
    id: posting.id, // ID to each marker to identify
    lat: parseFloat(posting.facility_latitude),
    lng: parseFloat(posting.facility_longitude),
    title: posting.title,
    description: `${posting.facility_name}Location: ${posting.facility_short_address}`,
    imageUrl: posting.facility_images 
  }));
  
  
  //console.log('photo', markers);
  
  const selectedMarker = markers.find((marker) => marker.id === selectedJobId);

  // map marker to view job details
  const viewJobDetails = (jobId) => {
    const job = state.jobPostings.find((job) => job.id === jobId);
    setSelectedJob(job); 
    navigate(`/jobs/${jobId}`); // go to job postings page
  };

  return (
    <div>
      <Map location={location} borders={borders} markers={markers} viewJobDetails={viewJobDetails} />
      {selectedMarker && <JobPostingsModal job={selectedMarker} />} {/* Render JobPostingsModal if a marker is selected */}
    </div>
  );
};

export default MapPage;