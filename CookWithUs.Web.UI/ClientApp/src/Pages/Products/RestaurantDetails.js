import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { getRestaurantDetails } from "../../services/restaurantServices";
import CircularLoading from "../../Components/LoadingComponent/CircularLoading";

const RestaurantDetails = () => {
  const [loading, setLoading] = useState(false);
  const [restaurant, setRestaurant] = useState({});
  const [menu, setMenu] = useState([]);

  const { id } = useParams();
  const isSideNavOpen = useSelector((state) => state.app.isSideNavOpen);
  const darkMode = useSelector((state) => state.app.darkMode);

  const handleGetRestaurantDetails = () => {
    setLoading(true);
    getRestaurantDetails(id)
      .then((response) => {
        setRestaurant(response.data);
        setMenu(response.data.restaurantMenus);
        setLoading(false);
        console.log(
          response.data.restaurantMenus,
          "restaurant.restaurantMenus"
        );
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    handleGetRestaurantDetails();
  }, []);

  const handleAddToCart = (item) => {
    let cartData = JSON.parse(localStorage.getItem("cart")) || [];
    const itemInCart = cartData.find((cartItem) => cartItem.id === item.id);

    if (itemInCart) {
      toast.warn("Item is already in the cart.", {
        position: "bottom-center",
        theme: "dark",
      });
    } else {
      // If the item is not in the cart, add it with a quantity of 1
      cartData = [...cartData, { ...item, quantity: 1 }];
      toast.success("Item Added to cart", {
        position: "bottom-center",
        theme: "dark",
      });
    }
    localStorage.setItem("cart", JSON.stringify(cartData));
  };

  return (
    <div
      style={{
        height: "43rem",
        width: "100%",
      }}
    >
      {!loading ? (
        <Box
          sx={{
            width: "75%",
            margin: "auto",
          }}
        >
          <Box
            sx={{
              mt: "50px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography>{restaurant.name}</Typography>
              {/* <Typography>Pizzas</Typography> */}
              <Typography>{restaurant.address}</Typography>
            </Box>
            <Box>
              <Typography>{restaurant.openingTime}</Typography>
              {/* <Typography>Closes at 9 P.M</Typography> */}
            </Box>
          </Box>
          <Grid
            container
            sx={{
              display: "grid",
              gridTemplateColumns: isSideNavOpen
                ? "repeat(4, 1fr)"
                : "repeat(5, 1fr)",
              gap: "20px",
              "@media (max-width: 1200px)": {
                gridTemplateColumns: isSideNavOpen
                  ? "repeat(2, 1fr)"
                  : "repeat(3, 1fr)",
              },
              "@media (max-width: 800px)": {
                gridTemplateColumns: isSideNavOpen
                  ? "repeat(1, 1fr)"
                  : "repeat(2, 1fr)",
              },
              "@media (max-width: 600px)": {
                gridTemplateColumns: "repeat(1, 1fr)",
              },
            }}
          >
            {menu.length > 0 &&
              menu.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 210,
                    marginRight: 0.5,
                    my: 5,
                    cursor: "pointer",
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "scale(1.1)",
                    },
                    "@media (max-width: 500px)": {
                      margin: "auto",
                      my: 5,
                    },
                  }}
                >
                  {item.imageUrl ? (
                    <img
                      style={{ width: 160, height: 110, borderRadius: "10px" }}
                      alt={item.name}
                      src={item.imageUrl}
                    />
                  ) : (
                    <Box style={{ width: 160, height: 110 }}></Box>
                  )}

                  <Box sx={{ pr: 2, ml: 1 }}>
                    <Typography gutterBottom variant="body2" noWrap>
                      {item.name}
                    </Typography>
                    <Typography display="block" variant="caption">
                      {`₹ ${item.price}`}
                    </Typography>
                    <Typography display="block" variant="caption">
                      {`Quantity: ${item.quantity} Plates`}
                    </Typography>
                  </Box>

                  <Box sx={{ pr: 2, ml: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to Cart
                    </Button>
                  </Box>
                </Box>
              ))}
          </Grid>
        </Box>
      ) : (
        <Box sx={{mt:3}}><CircularLoading /></Box>
      )}
      <ToastContainer />
    </div>
  );
};

export default RestaurantDetails;
