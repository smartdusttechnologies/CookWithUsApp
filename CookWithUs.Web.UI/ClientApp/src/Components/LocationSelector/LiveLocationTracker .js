import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import GoogleMapComponent from "../GoogleMapComponent/GoogleMapComponent ";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import vanDeliveryImage from "../../assets/VanDelivery.png";
import PizzaDelivery from "../../assets/PizzaDelivery.png";
import axios from "axios";
import { GetOrderDetails } from "../../services/restaurantServices";
import { updateOrder } from "../../services/riderServices";
import { useParams } from 'react-router-dom';

const LiveLocationTracker = ({ }) => {


    const { orderId } = useParams();
    const [liveLocation, setLiveLocation] = useState(null);
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

  //let currentLatitude = 25.5908;
  //  let intervalId;
   
let latitudes = 25.5750000;
let loangitude = 85.0436640000;
  const updatingLocation = () => {
    
             
      const updateLiveLocation = () => {
          const metersToDegreesLat = 100 / 111319.9; 
          const metersToDegreesLng = 100 / (111319.9 * Math.cos(latitudes * Math.PI / 180)); 

          latitudes += metersToDegreesLat; 
          loangitude += metersToDegreesLng;
          setLiveLocation({
              latitude: latitudes,
              longitude: loangitude
          });
         
      };

     
      updateLiveLocation();

      setInterval(updateLiveLocation, 5000);
   
  };

  const stopUpdatingLocation = () => {
     /* clearInterval(intervalId);*/
      updateOrder(orderId)
          .then((response) => {
              console.log(response.data);
          })
          .catch((error) => {
              console.error('Error updating order:', error);
          });



  };

    useEffect(() => {
        GetOrderDetails(orderId)
            .then((response) => {
                console.log(response.data);
                setOrder(response.data);
                joinRoom("raj", response.data.id);
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setLiveLocation({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        });
                    },
                    (error) => {
                        console.error('Error getting current position:', error);
                    }
                );
            })
            .catch((error) => {
                console.error('Error fetching order details:', error);
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
        {/*<Button variant="contained" onClick={() => joinRoom("raj", "swiggy")}>*/}
        {/*  Accept Order*/}
        {/*</Button>*/}
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
