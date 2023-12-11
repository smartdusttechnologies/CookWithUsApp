import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import GoogleMapComponent from '../GoogleMapComponent/GoogleMapComponent ';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';


const LiveLocationTracker = ({}) => {
    const [liveLocation, setLiveLocation] = useState({
      latitude: 0,
      longitude: 0,
    //   address: '',
    });
    const [connection, setConnection] = useState();
  

    const joinRoom = async (user, room) => {
      try {
        const connection = new HubConnectionBuilder()
          .withUrl("https://localhost:7184/location")
          .configureLogging(LogLevel.Information)
          .build();
  
        connection.on("GetLocation", (user, message) => {
          // setMessages(messages => [...messages, { user, message }]);
          console.log("location" , message)
        });
  
        // connection.on("UsersInRoom", (users) => {
        //   // setUsers(users);
        // });
  
        // connection.onclose(e => {
        //   setConnection();
        //   // setMessages([]);
        //   // setUsers([]);
        // });
  
        await connection.start();
        await connection.invoke("JoinRoom", { user, room });
        setConnection(connection);
      } catch (e) {
        console.log(e);
      }
    }

    const sendLocation = async (latitude, longitude) => {
      try {
        await connection.invoke("SetLocation", {latitude, longitude});
      } catch (e) {
        console.log(e);
      }
    }
  

    useEffect(() => {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setLiveLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          // console.log(
          //   position.coords.latitude,
          //   position.coords.longitude,
          //   'position.coords.'
          // );
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
          origin={{lat:liveLocation?.latitude, lng:liveLocation?.longitude}}
          zoom={15}
        />
      </Box>
      <Button
        variant="contained"
        onClick={() => joinRoom('yash' , 'swiggy')}
      >
        Get Location
      </Button>
      <Button
        variant="contained"
        onClick={() => sendLocation(30.5908, 86.1348)}
      >
        Send Location
      </Button>
    </Box>
  );
};

export default LiveLocationTracker;
