import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import GoogleMapComponent from "../GoogleMapComponent/GoogleMapComponent ";
import PizzaDelivery from "../../assets/PizzaDelivery.png";

const OrderDirection = () => {
  const [origin, setOrigin] = useState({ lat: 25.5908, lng: 85.1348 });

  let currentLatitude = 25.5908;
  let intervalId;

  const updatingLocation = () => {
    intervalId = setInterval(() => {
      currentLatitude -= 0.01;
      setOrigin({ lat: currentLatitude, lng: 85.1348 });
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
          origin={origin}
          destination={{ lat: 25.4908, lng: 85.1348 }}
          iconImage={PizzaDelivery}
        />
      </Box>
      <Box>
        <Button variant="contained" onClick={updatingLocation}>
          Accept Order
        </Button>
        <Button
          variant="contained"
          onClick={stopUpdatingLocation}
          color="error"
        >
          Stop
        </Button>
      </Box>
    </Box>
  );
};

export default OrderDirection;
