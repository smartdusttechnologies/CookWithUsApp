import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        height: "43rem",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: 'space-around',
          alignItems: "center",
          marginTop: "30px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography color="text.secondary" sx={{ fontSize: "21px" }}>
            Cook with us as a Chef
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate("/registeraschef")}
          >
            Get Started
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography color="text.secondary" sx={{ fontSize: "21px" }}>
            Register as a Delivery Partner
          </Typography>
          <Button
            variant="contained"
            color="error"
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate("/registerasrider")}
          >
            Get Started
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Home;
