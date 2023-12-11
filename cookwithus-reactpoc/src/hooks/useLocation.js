// hooks/useLocation.js
import { useState, useEffect } from "react";
import { GOOGLE_MAPS_KEY } from "../config/constants";
import axios from "axios";

const useLocation = () => {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    address: "",
  });
  const [loading, setLoading] = useState(false);

  const fetchAddressFromLatLng = (latitude, longitude) => {
    const geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_KEY}`;

    // Fetch address from Google Maps Geocoding API
    axios
      .get(geocodingApiUrl)
      .then((response) => {
        if (response?.data.results && response?.data.results.length > 0) {
          const formattedAddress = response?.data.results[0].formatted_address;
          setLocation((prevLocation) => ({
            ...prevLocation,
            address: formattedAddress,
          }));
        }
      })
      .catch((error) => {
        console.error("Error fetching address:", error);
      });
  };

  const getCurrentLocation = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        fetchAddressFromLatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        setLoading(false);
      },
      (error) => {
        console.error("Error getting location:", error.message);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return { location, loading, getCurrentLocation };
};

export default useLocation;
