import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import GoogleMapComponent from '../GoogleMapComponent/GoogleMapComponent ';

const LiveLocationTracker = ({}) => {
    const [liveLocation, setLiveLocation] = useState({
      latitude: 0,
      longitude: 0,
    //   address: '',
    });

    useEffect(() => {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setLiveLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          console.log(
            position.coords.latitude,
            position.coords.longitude,
            'position.coords.'
          );
        },
        (error) => {
          console.error('Error getting location:', error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5000,
        }
      );

      // Clean up the watchPosition on component unmount
      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    }, []);

  return (
    <Box
        sx={{
        width:'100%',
        height:'43rem',
        }}
    >
      <Box
        sx={{
          width:'90%',
          margin:'auto',
        }}
      >
        <GoogleMapComponent
          latitude={liveLocation?.latitude}
          longitude={liveLocation?.longitude}
          zoom={15}
        />
      </Box>
    </Box>
  );
};

export default LiveLocationTracker;
