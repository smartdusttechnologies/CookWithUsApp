import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import GoogleMapComponent from "../GoogleMapComponent/GoogleMapComponent ";
import PizzaDelivery from "../../assets/PizzaDelivery.png";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

const OrderDirection = () => {
  const [connection, setConnection] = useState();
  const [liveLocation, setLiveLocation] = useState({
    latitude: 25.5908,
    longitude: 85.1348,
  });

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
          destination={{ lat: 25.4908, lng: 85.1348 }}
          iconImage={PizzaDelivery}
        />
      </Box>
      <Box
        sx={{
          width: "90%",
          margin: "auto",
          mt: 3,
        }}
      >
        <Button variant="contained" onClick={() => joinRoom("raj", "swiggy")}>
          See Order
        </Button>
      </Box>
    </Box>
  );
};

export default OrderDirection;
