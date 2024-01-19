import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Skeleton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useSelector } from "react-redux";
import { getRestaurants } from "../../services/restaurantServices";

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const isSideNavOpen = useSelector((state) => state.app.isSideNavOpen);
  const darkMode = useSelector((state) => state.app.darkMode);

  const handleGetRestaurants = () => {
    setLoading(true);
    getRestaurants()
      .then((response) => {
        setRestaurants(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    handleGetRestaurants();
  }, []);

  return (
    <div
      style={{
        height: "43rem",
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: "75%",
          margin: "auto",
          mt: "30px",
        }}
      >
        <Typography variant="h5">Top restaurant chains in Patna</Typography>
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
          {loading
            ? [1,2,3,4].map(() => (
                <Box>
                  <Skeleton variant="rectangular" width={210} height={118} />
                  <Box sx={{ pt: 0.5 }}>
                    <Skeleton />
                    <Skeleton width="60%" />
                  </Box>
                </Box>
              ))
            : restaurants.map((item, index) => (
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
                  onClick={() => navigate(`/restaurant/${item.id}`)}
                >
                  <Box>
                    {/* <img
                      style={{ width: 210, height: 118, borderRadius: "10px" }}
                      alt={item.title}
                      src={item.src}
                    /> */}

                    <Box sx={{ pr: 2, ml: 1 }}>
                      <Typography gutterBottom variant="body2" noWrap>
                        {item.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        color={!darkMode ? "text.secondary" : "white"}
                      >
                        {item.address}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
        </Grid>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
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
