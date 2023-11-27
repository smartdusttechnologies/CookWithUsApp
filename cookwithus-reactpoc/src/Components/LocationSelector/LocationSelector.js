import React, { useEffect, useState } from 'react';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Tooltip, Typography } from '@mui/material';
import axios from 'axios';
import LiveLocationTracker from './LiveLocationTracker ';
import GoogleMap from './GoogleMap';

function LocationSelector() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 0,
    longitude: 0,
    address: '',
  });
  const [loading , setLoading] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleLocationSelection = () => {
    setLoading(true)
    navigator.geolocation.getCurrentPosition((position) => {
      setSelectedLocation({
        latitude: position.coords.latitude,
        longitude : position.coords.longitude,
      })
      fetchAddressFromLatLng(position.coords.latitude, position.coords.longitude);
      setLoading(false)
      console.log(position.coords.latitude , position.coords.longitude , 'position.coords.')
    });
  };
  const fetchAddressFromLatLng = (latitude, longitude) => {
    const apiKey = 'AIzaSyCzNP5qQql2a5y8lOoO-1yj1lj_tzjVImA';
    const geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    // Fetch address from Google Maps Geocoding API
    axios.get(geocodingApiUrl)
    .then((response) => {
      console.log(response , 'geocodingApiUrl')
      if (response?.data.results && response?.data.results.length > 0) {
        const formattedAddress = response?.data.results[0].formatted_address;
        setSelectedLocation((prevLocation) => ({
          ...prevLocation,
          address: formattedAddress,
        }));
      }
    })
      .catch((error) => {
        console.error('Error fetching address:', error);
      });
  };

  useEffect(() => {
    handleLocationSelection()
  }, []);

  return (
    <div>
      <Tooltip title="Select Location">
        <IconButton size="large" color="inherit" onClick={handleOpenDialog}>
          <LocationOnRoundedIcon sx={{ width: 26, height: 26,color:'white' }} />
        </IconButton>
      </Tooltip>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Select Your Location</DialogTitle>
        <Divider/>
        <DialogContent
          sx={{
            width:'600px',
            height:'400px'
          }}
        >
          { 
            loading ? <Box sx={{display:'flex', justifyContent:'center'}}><CircularProgress/></Box> : <>
              <Box>
                  <Typography>
                    Address: {selectedLocation.address}
                  </Typography>
                </Box>

              <Box>
                <GoogleMap 
                  latitude={selectedLocation?.latitude} 
                  longitude={selectedLocation?.longitude} 
                  width={'500px'}
                  height={'300px'}
                />
              </Box>
            </>
          }
            
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLocationSelection} color="primary">
            Save
          </Button>
          <Button onClick={handleCloseDialog} color="error">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default LocationSelector;
