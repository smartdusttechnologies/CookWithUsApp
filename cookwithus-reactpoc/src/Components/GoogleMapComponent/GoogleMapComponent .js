import React from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { GOOGLE_MAPS_KEY } from '../../config/constants';
import { Box } from '@mui/material';

const GoogleMapComponent = ({ latitude, longitude, zoom }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_KEY,
  });

  const center = {
    lat: latitude,
    lng: longitude,
  };

  return isLoaded ? (
    <Box display="flex" >
      <GoogleMap
        mapContainerStyle={{ height: "400px", width: "100%" }}
        zoom={zoom ? zoom : 16}
        options={{
          fullscreenControl: false,
          streetViewControl: false,
          MapTypeControlOptions: false,
          mapTypeControl: false,
        }}
        center={center}
      >
        <Marker
          position={center}
          draggable={true}
          // onDragEnd={changeCoordinates}
        />
      </GoogleMap>
    </Box>
  ) : null;
};

export default GoogleMapComponent;
