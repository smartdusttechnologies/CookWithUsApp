import React from 'react'
import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

const FloatButton = () => {
  return (
    <Fab
      color="secondary"
      sx={{
        position: 'fixed',
        bottom: 76,
        right: 176,
        '@media (max-width: 500px)': {
          display: 'none',
        },
      }}
    >
      <AddIcon />
    </Fab>
  )
}

export default FloatButton
