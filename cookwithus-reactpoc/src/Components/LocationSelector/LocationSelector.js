import React, { useEffect, useState } from 'react';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, InputAdornment, TextField, Tooltip, Typography } from '@mui/material';
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import useLocation from '../../hooks/useLocation';
import GoogleMapComponent from '../GoogleMapComponent/GoogleMapComponent ';

function LocationSelector() {
  const [openDialog, setOpenDialog] = useState(false);

  const { location, loading, getCurrentLocation } = useLocation();

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const center = {
    lat: location?.latitude,
    lng: location?.longitude,
  };

  return (
    <div>
      <Tooltip title="Select Location">
        <IconButton size="large" color="inherit" onClick={handleOpenDialog}>
          <LocationOnRoundedIcon sx={{ width: 26, height: 26,color:'white' }} />
        </IconButton>
      </Tooltip>

      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth={true}>
        <Box display="flex" justifyContent="flex-end">
          <IconButton
            size="medium"
            onClick={handleCloseDialog}
          >
            <CloseIcon color="primary" />
          </IconButton>
        </Box>
        <DialogTitle>Select Your Location</DialogTitle>
        <Divider/>
        <DialogContent
          sx={{
          }}
        >
          <TextField
            variant="outlined"
            label="Enter your area"
            fullWidth
            // value={locationName}
            disabled
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {loading ? (
                    <CircularProgress size={24} />
                  ) : (
                    <IconButton
                      // onClick={(e) => {
                      //   e.preventDefault();
                      //   if (!loading) {
                      //     setLoading(true);
                      //     getCurrentLocation(locationCallback);
                      //   }
                      // }}
                      size="large"
                    >
                      <GpsFixedIcon color="primary" />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
          />
          <GoogleMapComponent
          latitude={location?.latitude}
          longitude={location?.longitude}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            // className={classes.btnBase}
            // onClick={(e) => {
            //   e.preventDefault();
            //   submitAddress();
            // }}
          >
            {loading ? (
              <CircularProgress color="secondary" />
            ) : (
              <Typography variant="subtitle2" >
                Submit
              </Typography>
            )}
          </Button>
        </DialogContent>
        {/* <DialogActions> */}
          {/* <Button onClick={handleLocationSelection} color="primary">
            Save
          </Button> */}
          {/* <Button onClick={handleCloseDialog} color="error">
            Cancel
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}

export default LocationSelector;
