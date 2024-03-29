import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import GoogleMapComponent from "../GoogleMapComponent/GoogleMapComponent ";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import vanDeliveryImage from "../../assets/VanDelivery.png";

const LiveLocationTracker = ({}) => {
  const [liveLocation, setLiveLocation] = useState({
    latitude: 25.5908,
    longitude: 85.1348,
  });
  const [connection, setConnection] = useState();

  const joinRoom = async (user, room) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:7184/location")
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("GetLocation", (user, location) => {
        // setMessages(messages => [...messages, { user, message }]);
        console.log("location", location);
        setLiveLocation(location);
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
  };

  const sendLocation = async (latitude, longitude) => {
    try {
      await connection.invoke("SetLocation", { latitude, longitude });
    } catch (e) {
      console.log(e);
    }
  };

  // useEffect(() => {
  //   const watchId = navigator.geolocation.watchPosition(
  //     (position) => {
  //       setLiveLocation({
  //         latitude: position.coords.latitude,
  //         longitude: position.coords.longitude,
  //       });
  //       // console.log(
  //       //   position.coords.latitude,
  //       //   position.coords.longitude,
  //       //   'position.coords.'
  //       // );
  //     },
  //     (error) => {
  //       console.error('Error getting location:', error);
  //     },
  //     {
  //       enableHighAccuracy: true,
  //       maximumAge: 0,
  //       timeout: 5000,
  //     }
  //   );

  //   // Clean up the watchPosition on component unmount
  //   return () => {
  //     navigator.geolocation.clearWatch(watchId);
  //   };
  // }, []);

  let currentLatitude = 25.5908;
  let intervalId;

  const updatingLocation = () => {
    // joinRoom('yash' , 'swiggy')
    intervalId = setInterval(() => {
      sendLocation(currentLatitude, 85.1348);
      currentLatitude += 0.01;
    }, 5000);
  };

  const stopUpdatingLocation = () => {
    clearInterval(intervalId);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "43rem",
      }}
    >
      <Box
        sx={{
          width: "90%",
          margin: "auto",
        }}
      >
        <GoogleMapComponent
          origin={{ lat: liveLocation?.latitude, lng: liveLocation?.longitude }}
          zoom={15}
          iconImage={vanDeliveryImage}
        />
      </Box>
      <Button variant="contained" onClick={() => joinRoom("raj", "swiggy")}>
        Get Location
      </Button>
      <Button variant="contained" onClick={updatingLocation}>
        Send Location
      </Button>
      <Button
        variant="contained"
        color="success"
        onClick={stopUpdatingLocation}
      >
        Delivered
      </Button>
    </Box>
  );
};

export default LiveLocationTracker;
