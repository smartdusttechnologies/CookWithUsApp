import React, { useState } from 'react'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import ExpandableFloatButton from '../../Components/FloatButton/ExpandableFloatButton';
import FloatButton from '../../Components/FloatButton/FloatButton';

const Home = () => {
  return (
    <div 
      style={{
        height:'40rem',
        width:'100%',
      }}
    >
      <FloatButton/>
      <ExpandableFloatButton/>
    </div>
  )
}

export default Home
