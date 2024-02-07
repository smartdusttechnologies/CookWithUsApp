import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import ChefDashboardTable from "./ChefDashboardComponents/ChefDashboardTable";
import {
  getRestaurantDetails,
  getRestaurantDetailsByUserID,
} from "../../services/restaurantServices";
import CircularLoading from "../../Components/LoadingComponent/CircularLoading";
import axios from "axios";

const fakeFoodMenu = [
  { id: "1", name: "Classic Burger", type: "Burgers", price: "9" },
  { id: "2", name: "Margherita Pizza", type: "Pizzas", price: "12" },
  { id: "3", name: "Chicken Alfredo Pasta", type: "Pasta", price: "14" },
  { id: "4", name: "Caesar Salad", type: "Salads", price: "8" },
  { id: "5", name: "Grilled Salmon", type: "Seafood", price: "18" },
  { id: "6", name: "Vegetarian Stir-Fry", type: "Vegetarian", price: "11" },
  { id: "7", name: "Chocolate Lava Cake", type: "Desserts", price: "6" },
  { id: "8", name: "Fresh Fruit Smoothie", type: "Beverages", price: "4" },
  { id: "9", name: "Iced Caramel Latte", type: "Beverages", price: "3" },
];

const ChefDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [restaurant, setRestaurant] = useState({});
  const [menu, setMenu] = useState([]);

  const handleGetRestaurantDetails = () => {
    setLoading(true);
    getRestaurantDetailsByUserID(4)
      .then((response) => {
        setRestaurant(response?.data);
        setMenu(response?.data?.restaurantMenus);
        setLoading(false);
        console.log(response.data, "ChefDashboard");
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    handleGetRestaurantDetails();
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          width: "90%",
          margin: "auto",
          marginTop: "15px",
          marginBottom: "10px",
        }}
      >
        <Typography variant="h3" color="text.secondary">
          Chef Dashboard
        </Typography>
      </Box>
      <Box
        sx={{
          width: 1200,
          margin: "auto",
          "@media (max-width: 1200px)": {
            width: 900,
          },
          "@media (max-width: 800px)": {
            width: 500,
          },
          "@media (max-width: 600px)": {
            width: 300,
          },
        }}
      >
        {loading ? <CircularLoading /> : <ChefDashboardTable data={menu} />}
      </Box>
    </Box>
  );
};

export default ChefDashboard;
