import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import GoogleMapComponent from "../GoogleMapComponent/GoogleMapComponent ";
import PizzaDelivery from "../../assets/PizzaDelivery.png";
import car from "../../assets/car.png";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { GetOrderDetails } from "../../services/restaurantServices";
import { useParams } from "react-router-dom";

const OrderDirection = () => {
  const [connection, setConnection] = useState();
  const [liveLocation, setLiveLocation] = useState({
    latitude: 25.5908,
    longitude: 85.1348,
  });
  const [order, setOrder] = useState({});
  const [isLoading, setLoading] = useState(false);
  const { id } = useParams();

  const joinRoom = async (user, room) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:7042/location")
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("GetLocation", (user, location) => {
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
        console.log(connection);
    } catch (e) {
      console.log(e);
    }
  };

  const handleGetOrderDetails = () => {
    setLoading(true);
    GetOrderDetails(id)
      .then((response) => {
        console.log(response?.data, "Single Order");
        setOrder(response?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    handleGetOrderDetails();
  }, []);

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
          iconDestination={car}
        />
      </Box>
      <Box
        sx={{
          width: "90%",
          margin: "auto",
          mt: 3,
        }}
      >
        <Button
          variant="contained"
          onClick={() => joinRoom("raj", order?.id.toString())}
        >
          Track Order
        </Button>
      </Box>
    </Box>
  );
};

export default OrderDirection;
