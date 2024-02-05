import React from 'react'
import { Box, Typography } from "@mui/material";
import ChefDashboardTable from './ChefDashboardComponents/ChefDashboardTable';

const fakeFoodMenu = [
    { id: '1', name: 'Classic Burger', category: 'Burgers', price: '9' },
    { id: '2', name: 'Margherita Pizza', category: 'Pizzas', price: '12' },
    { id: '3', name: 'Chicken Alfredo Pasta', category: 'Pasta', price: '14' },
    { id: '4', name: 'Caesar Salad', category: 'Salads', price: '8' },
    { id: '5', name: 'Grilled Salmon', category: 'Seafood', price: '18' },
    { id: '6', name: 'Vegetarian Stir-Fry', category: 'Vegetarian', price: '11' },
    { id: '7', name: 'Chocolate Lava Cake', category: 'Desserts', price: '6' },
    { id: '8', name: 'Fresh Fruit Smoothie', category: 'Beverages', price: '4' },
    { id: '9', name: 'Iced Caramel Latte', category: 'Beverages', price: '3' },
  ];

const ChefDashboard = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ width: "90%", margin: "auto", marginTop: "15px",marginBottom:'10px' }}>
        <Typography variant="h3" color="text.secondary">
          Chef Dashboard
        </Typography>
      </Box>
        <ChefDashboardTable data={fakeFoodMenu} />
    </Box>
  )
}

export default ChefDashboard
