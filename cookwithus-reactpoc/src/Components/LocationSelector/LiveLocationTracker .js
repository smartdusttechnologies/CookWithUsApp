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
      navigator.geolocation.getCurrentPosition((position) => {
        setLiveLocation({
          latitude:position.coords.latitude,
          longitude:position.coords.longitude,
        });
        console.log(position.coords.latitude , position.coords.longitude , 'position.coords.')
      });
        const intervalId = setInterval(() => {
          navigator.geolocation.getCurrentPosition((position) => {
            setLiveLocation({
              latitude:position.coords.latitude,
              longitude:position.coords.longitude,
            });
            console.log(position.coords.latitude , position.coords.longitude , 'position.coords.')
          });
        }, 5000);
    
        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
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
