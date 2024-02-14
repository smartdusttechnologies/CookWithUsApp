import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import GoogleMapComponent from "../GoogleMapComponent/GoogleMapComponent ";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import vanDeliveryImage from "../../assets/VanDelivery.png";
import PizzaDelivery from "../../assets/PizzaDelivery.png";
import axios from "axios";
import { GetOrderDetails } from "../../services/restaurantServices";

const LiveLocationTracker = ({}) => {
  const [liveLocation, setLiveLocation] = useState({
    latitude: 25.5908,
    longitude: 85.1348,
  });
  const [connection, setConnection] = useState();
  const [order, setOrder] = useState({});

  const joinRoom = async (user, room) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:7042/location")
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

  useEffect(() => {
    GetOrderDetails(3)
      .then((response) => {
        console.log(response.data);
        setOrder(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleOpenMaps = (latitude, longitude) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    window.open(url, "_blank");
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
          destination={{ lat: order?.latitude, lng: order?.longitude }}
          zoom={15}
          iconImage={PizzaDelivery}
        />
      </Box>
      <Box
        sx={{
          width: "90%",
          margin: "auto",
          display: "flex",
          justifyContent: "space-between",
          mt: 3,
        }}
      >
        <Button variant="contained" onClick={() => joinRoom("raj", "swiggy")}>
          Accept Order
        </Button>
        <Button variant="contained" onClick={updatingLocation}>
          Started Delivering
        </Button>
        <Button
          variant="contained"
          onClick={() => handleOpenMaps(order?.latitude, order?.longitude)}
        >
          See Direction
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={stopUpdatingLocation}
        >
          Delivered
        </Button>
      </Box>
    </Box>
  );
};

export default LiveLocationTracker;
