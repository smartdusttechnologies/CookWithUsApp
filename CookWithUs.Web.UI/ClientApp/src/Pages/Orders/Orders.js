import React, { useEffect, useState } from "react";
import { GetOrdersByUserID } from "../../services/restaurantServices";
import {
  Box,
  Grid,
  Typography,
  Button,
  Dialog,
  DialogContent,
  Divider,
  Skeleton,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const isSideNavOpen = useSelector((state) => state.app.isSideNavOpen);
  const navigate = useNavigate();

  const handleBoxClick = (order) => {
    setSelectedOrder(order);
    console.log(order);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedOrder(null);
    setDialogOpen(false);
  };

  const getOrders = async () => {
    setLoading(true);
    await GetOrdersByUserID(1)
      .then((response) => {
        console.log(response?.data, "Orders");
        setOrders(response?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div>
      <Grid
        container
        sx={{
          width: "75%",
          minHeight: "10rem",
          margin: "auto",
          display: "grid",
          mt: "30px",
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
            width: "85%",
          },
        }}
      >
        {isLoading
          ? [1, 2, 3, 4].map((item, index) => (
              <Box key={index}>
                <Skeleton variant="rectangular" width={210} height={118} />
                <Box sx={{ pt: 0.5 }}>
                  <Skeleton />
                  <Skeleton width="60%" />
                </Box>
              </Box>
            ))
          : orders.length > 0 &&
            orders.map((item, index) => (
              <Box
                key={index}
                sx={{
                  width: "210px",
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
                <Box onClick={() => handleBoxClick(item)}>
                  {item?.imageUrl ? (
                    <img
                      style={{ width: 160, height: 110, borderRadius: "10px" }}
                      alt={item?.name}
                      src={item?.imageUrl}
                    />
                  ) : (
                    <Box style={{ width: 160, height: 110 }}>
                      No Images Found
                    </Box>
                  )}
                </Box>

                <Box sx={{ pr: 2, ml: 1 }} onClick={() => handleBoxClick(item)}>
                  <Typography gutterBottom variant="body2" noWrap>
                    {item?.name}
                  </Typography>
                  <Typography display="block" variant="caption">
                    Price - {`₹ ${item?.orderPrice}`}
                  </Typography>
                </Box>

                <Button onClick={() => navigate(`/trackorder/${item.id}`)}>
                  Track Order
                </Button>
              </Box>
            ))}
      </Grid>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogContent>
          {selectedOrder && (
            <>
              <Typography variant="h6">
                Order Details and Products
              </Typography>
              <Divider />
              <Typography variant="body1">
                Order ID: {selectedOrder?.id}
              </Typography>
              <Typography variant="body1">
                Total Price: {selectedOrder?.orderPrice}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1">Products :</Typography>
                {selectedOrder?.products?.map((item, index) => (
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body1">{item?.name}</Typography>
                    <Typography variant="body1">{item?.type}</Typography>
                  </Box>
                ))}
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Orders;
