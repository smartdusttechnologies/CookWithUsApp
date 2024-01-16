import React, { useEffect, useState } from "react";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import useLocation from "../../hooks/useLocation";
import GoogleMapComponent from "../GoogleMapComponent/GoogleMapComponent ";
import { useNavigate } from "react-router-dom";

function LocationSelector() {
  const [openDialog, setOpenDialog] = useState(false);
  const { location, loading, getCurrentLocation } = useLocation();
  const navigate = useNavigate();

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
          <LocationOnRoundedIcon
            sx={{ width: 26, height: 26, color: "white" }}
          />
        </IconButton>
      </Tooltip>

      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth={true}>
        <Box display="flex" justifyContent="space-between">
          <DialogTitle>Select Your Location</DialogTitle>
          <IconButton size="medium" onClick={handleCloseDialog}>
            <CloseIcon color="primary" />
          </IconButton>
        </Box>
        <Divider />
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <TextField
            variant="outlined"
            label="Enter your area"
            fullWidth
            value={location.address}
            disabled
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {loading ? (
                    <CircularProgress size={24} />
                  ) : (
                    <IconButton
                      onClick={(e) => {
                        e.preventDefault();
                        if (!loading) {
                          getCurrentLocation();
                        }
                      }}
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
            origin={{ lat: location?.latitude, lng: location?.longitude }}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            onClick={(e) => {
              // e.preventDefault();
              // submitAddress();
              navigate("/livelocationmap");
            }}
          >
            {loading ? (
              <CircularProgress color="secondary" />
            ) : (
              <Typography variant="subtitle2">Submit</Typography>
            )}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default LocationSelector;
