import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import GoogleMapComponent from '../GoogleMapComponent/GoogleMapComponent ';

const OrderDirection = () => {
  return (
    <Box
      sx={{
        width:'100%',
        height:'43rem',
      }}  
    >
        <Box
        sx={{
            width:'90%',
            margin:'auto',
        }}
        >
        <GoogleMapComponent
            origin={{lat:25.5908, lng:85.1348}}
            destination={{lat:24.5908, lng:85.1348}}
        />
        </Box>
    </Box>
  )
}

export default OrderDirection
