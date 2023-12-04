import React, { useState } from 'react'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import NavigationIcon from '@mui/icons-material/Navigation';

const Home = () => {
  return (
    <div 
      style={{
        height:'40rem',
        width:'100%',
      }}
    >
      <Fab 
        color="secondary"
        style={{
          position: 'fixed',
          bottom: 76,
          right: 236,
        }}
      >
        <AddIcon />
      </Fab>
      <Fab variant="extended"
        style={{
          position: 'fixed',
          bottom: 83,
          right: 86,
        }}
      >
        <NavigationIcon sx={{ mr: 1 }} />
        Navigate
      </Fab>
    </div>
  )
}

export default Home
