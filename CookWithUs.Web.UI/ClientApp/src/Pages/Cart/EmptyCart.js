import React from "react";
import emptyCart from "../../assets/Cart.webp";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const EmptyCart = () => {
  const darkMode = useSelector((state) => state.app.darkMode);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        height: "35rem",
      }}
    >
      <Box
        sx={{
          margin: "auto",
        }}
      >
        <img
          src={emptyCart}
          style={{
            width: "50%",
            marginBottom: "20px",
          }}
        />
        <Typography
          fontSize="20px"
          color={!darkMode ? "text.secondary" : "white"}
          sx={{ flex: 1 }}
        >
          Your cart is empty
        </Typography>
        <Typography
          color={!darkMode ? "text.secondary" : "white"}
          sx={{ flex: 1 }}
        >
          You can go to home page to view more restaurants
        </Typography>
      </Box>
    </Box>
  );
};

export default EmptyCart;
