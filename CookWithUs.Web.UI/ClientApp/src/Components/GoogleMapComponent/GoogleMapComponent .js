import React, { memo, useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";
import { GOOGLE_MAPS_KEY } from "../../config/constants";
import { Box, Typography } from "@mui/material";
import CircularLoading from "../LoadingComponent/CircularLoading";
import PizzaDelivery from "../../assets/PizzaDelivery.png";
import car from "../../assets/car.png";
import VanDelivery from "../../assets/VanDelivery.png";
import BikeDelivery from "../../assets/BikeDelivery.png";

const GoogleMapComponent = ({ origin, destination, zoom, iconImage }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAPS_KEY,
  });

  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);

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
            setDistance(result?.routes[0]?.legs[0]?.distance?.text);
            setDuration(result?.routes[0]?.legs[0]?.duration?.text);
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

  const icon = {
    url: iconImage,
    scaledSize: map && new window.google.maps.Size(40, 40),
    origin: map && new window.google.maps.Point(0, 0),
    anchor: map && new window.google.maps.Point(20, 40),
  };

  return isLoaded ? (
    <Box>
      <Box>
        <GoogleMap
          mapContainerStyle={{ height: "400px", width: "100%" }}
          zoom={zoom ? zoom : 16}
          center={center}
          onLoad={onLoad}
        >
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                markerOptions: { icon: icon },
              }}
            />
          )}
          {!destination && <Marker position={origin} icon={icon} />}
        </GoogleMap>
      </Box>
      {destination && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: "15px",
          }}
        >
          {distance && <Typography>Distance: {distance}</Typography>}
          {duration && <Typography>Duration: {duration}</Typography>}
        </Box>
      )}
    </Box>
  ) : (
    <CircularLoading />
  );
};

export default memo(GoogleMapComponent);
