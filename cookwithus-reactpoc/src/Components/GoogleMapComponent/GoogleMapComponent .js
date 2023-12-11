import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, DirectionsRenderer, useJsApiLoader } from '@react-google-maps/api';
import { GOOGLE_MAPS_KEY } from '../../config/constants';
import { Box } from '@mui/material';
import CircularLoading from '../LoadingComponent/CircularLoading';

const GoogleMapComponent = ({ origin, destination, zoom }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_KEY,
  });

  
    const [directions, setDirections] = useState(null);
    const [map, setMap] = useState(null);

    const onLoad = (map) => {
      setMap(map);
    };
  
    useEffect(() => {
      if (origin && destination && map) {
        const directionsService = new window.google.maps.DirectionsService();
  
        directionsService.route(
          {
            origin,
            destination,
            travelMode: window.google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
              setDirections(result);
              console.log(result?.routes[0]?.legs[0]?.distance?.text)
              console.log(result?.routes[0]?.legs[0]?.duration?.text)
            } else {
              console.error(`Error fetching directions: ${status}`);
            }
          }
        );
      }
    }, [origin, destination, map]);
  
    const center = {
      lat: origin.lat,
      lng: origin.lng,
    };

  return isLoaded ? (
    <Box display="flex" >
        <GoogleMap
          mapContainerStyle={{ height: '400px', width: '100%' }}
          zoom={zoom ? zoom : 16}
          center={center}
          onLoad={onLoad}
        >
          {directions && <DirectionsRenderer directions={directions} />}
          <Marker position={origin} />
          <Marker position={destination} />
        </GoogleMap>
    </Box>
  ) : <CircularLoading/>;
};

export default GoogleMapComponent;
