import React, { memo, useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useJsApiLoader,
  InfoWindow,
} from "@react-google-maps/api";
import { GOOGLE_MAPS_KEY } from "../../config/constants";
import { Box, Typography } from "@mui/material";
import CircularLoading from "../LoadingComponent/CircularLoading";

const GoogleMapComponent = ({
  origin,
  destination,
  zoom,
  iconImage,
  iconDestination,
}) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAPS_KEY,
  });

  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [infoWindowOpen, setInfoWindowOpen] = useState(true);

  const handleMarkerClick = () => {
    setInfoWindowOpen(true);
  };

  const handleInfoWindowClose = () => {
    setInfoWindowOpen(false);
  };

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
    lat: origin?.lat,
    lng: origin?.lng,
  };

  const makeIcon = (iconImage) => {
    return {
      url: iconImage,
      scaledSize: map && new window.google.maps.Size(40, 40),
      origin: map && new window.google.maps.Point(0, 0),
      anchor: map && new window.google.maps.Point(20, 40),
    };
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
                suppressMarkers: true,
              }}
            />
          )}
          {!destination && (
            <Marker position={origin} icon={makeIcon(iconImage)} />
          )}
          {destination && directions && (
            <Marker position={origin} icon={makeIcon(iconImage)} />
          )}
          {destination && directions && (
            <Marker
              position={destination}
              icon={makeIcon(iconDestination)}
              onClick={handleMarkerClick}
            />
          )}
          {infoWindowOpen && destination && (
            <InfoWindow
              position={{
                lat: destination?.lat + 0.015,
                lng: destination?.lng,
              }}
              onCloseClick={handleInfoWindowClose}
            >
              <div>
                <h3>Duration</h3>
                <p>{duration}</p>
              </div>
            </InfoWindow>
          )}
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
