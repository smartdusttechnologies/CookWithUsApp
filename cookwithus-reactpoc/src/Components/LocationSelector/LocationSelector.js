import React, { useEffect, useState } from 'react';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Tooltip, Typography } from '@mui/material';
import axios from 'axios';
import LiveLocationTracker from './LiveLocationTracker ';
import GoogleMap from './GoogleMap';
import {GOOGLE_MAPS_KEY} from '../../config/constants'
import useLocation from '../../hooks/useLocation';

function LocationSelector() {
  const [openDialog, setOpenDialog] = useState(false);

  const { location, loading, getCurrentLocation } = useLocation();

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

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
                    Address: {location.address}
                  </Typography>
                </Box>

              <Box>
                <GoogleMap
                  latitude={location?.latitude} 
                  longitude={location?.longitude} 
                  width={'500px'}
                  height={'300px'}
                />
              </Box>
            </>
          }
            
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleLocationSelection} color="primary">
            Save
          </Button> */}
          <Button onClick={handleCloseDialog} color="error">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default LocationSelector;
