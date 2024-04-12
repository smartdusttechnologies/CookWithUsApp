import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Skeleton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useSelector } from "react-redux";
import { getRestaurants } from "../../services/restaurantServices";
import useLocation from "../../hooks/useLocation";
import "./Home.css";
import { ArrowRight,ArrowLeft } from 'lucide-react';
const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { location } = useLocation();
  const isSideNavOpen = useSelector((state) => state.app.isSideNavOpen);
    const darkMode = useSelector((state) => state.app.darkMode);
    const Foods = [
        {
        "id": 1,
            "name": "restaurant curated for chinese",
            "imageUrl": "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029848/PC_Creative%20refresh/3D_bau/banners_new/Chinese.png",
        },
        {
            "id": 2,
            "name": "restaurants curated for biryani",
            "imageUrl": "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029848/PC_Creative%20refresh/3D_bau/banners_new/Chinese.png",
        },


    ]
    const AllResturent = [
        {
            "id": 1,
            "name": "Pallavaran Yaa Mohaideen Biriyani",
            "service": "Biryani, Tandoor, Chinese, Indian, South Indian",
           "address":"Viluppuram Towun",
            "offer": " 40% OFF UPTO ₹80",
            "rateing": "4.3",
           "cookingTime":"15-20 mins",
            "openingTime": "2024-04-01T08:00:00",
            "imageUrl": "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/uoubsptehcwwgipkoxth",
            "latitude": 25.5908,
            "longitude": 85.1348
        },
        {
            "id": 2,
            "name": "Delicious Restaurant",
            "address": "Chinese, Biryani",
            "location": "Viluppuram Towun",
            "offer": "₹125 OFF ABOVE ₹249",
            "rateing": "4.4",
            "cookingTime": "25-30 mins",
            "openingTime": "2024-04-01T08:00:00",
            "imageUrl": "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/bip5rxg4mkilp4ofvwgw",
            "latitude": 25.5908,
            "longitude": 85.1348
        },
        {
            "id": 3,
            "name": "DFC",
            "address": "Pizzas, Fast Food, Beverages",
            "location": "Viluppuram Towun",
            "offer": "₹125 OFF ABOVE ₹249",
            "rateing": "4.4",
            "cookingTime": "25-30 mins",
            "openingTime": "2024-04-01T08:00:00",
            "imageUrl": "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/d720492bb07ffc6a4ed61ecd2379076d",
            "latitude": 25.5908,
            "longitude": 85.1348
        },
        {
            "id": 4,
            "name": "Hotel Sri Ganapathy A/C",
            "address": "South Indian, Chinese",
            "location": "Viluppuram Towun",
            "offer": "",
            "rateing": "4.3",
            "cookingTime": "15-20 mins",
            "openingTime": "2024-04-01T08:00:00",
            "imageUrl": "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/wuj8z1yifczem1demhgn",
            "latitude": 25.5908,
            "longitude": 85.1348
        },
        {
            "id": 5,
            "name": "Delicious Restaurant",
            "address": "Chinese, Biryani",
            "location": "Viluppuram Towun",
            "offer": "₹125 OFF ABOVE ₹249",
            "rateing": "4.4",
            "cookingTime": "25-30 mins",
            "openingTime": "2024-04-01T08:00:00",
            "imageUrl": "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/bip5rxg4mkilp4ofvwgw",
            "latitude": 25.5908,
            "longitude": 85.1348
        },

        {
            "id": 6,
            "name": "Pallavaran Yaa Mohaideen Biriyani",
            "address": "Biryani, Tandoor, Chinese, Indian, South Indian",
            "location": "Viluppuram Towun",
            "offer": " 40% OFF UPTO ₹80",
            "rateing": "4.3",
            "cookingTime": "15-20 mins",
            "openingTime": "2024-04-01T08:00:00",
            "imageUrl": "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/uoubsptehcwwgipkoxth",
            "latitude": 25.5908,
            "longitude": 85.1348
        },
        // Add more data items as needed
    ];
  const handleGetRestaurants = (latitude, longitude) => {
    setLoading(true);
    getRestaurants(latitude, longitude)
      .then((response) => {
        console.log(response.data);
        setRestaurants(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      handleGetRestaurants(
        position?.coords?.latitude,
        position?.coords?.longitude
      );
    });
  }, []);
    const restaurantUrl = "/restaurant/";
    const [slide, setSlide] = useState(0);
    const nextSlide = () => {
        if (12 == slide) return false;
        setSlide(slide + 3);
    }
    const prevSlide = () => {
        if (0 == slide) return false;
        setSlide(slide - 3);
    }
    const [rsSlide, setRsSlide] = useState(0);
    const nextRsSlide = () => {
        if (restaurants.length-4 == rsSlide) return false;
        setRsSlide(rsSlide + 1);
    }
    const prevRsSlide = () => {
        if (0 == rsSlide) return false;
        setRsSlide(rsSlide - 1);
    }
  return (
    <div
      style={{ 
       width: "100%",
       margin: "100px 0"
      }}
    >
      <Box
        sx={{
          width: "75%",
          margin: "auto",
          mt: "30px",
        }}
          >
              <div>
                  <div className="sc-eBMEME kHakdX">
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <div style={{ fontSize: '25px', fontWeight: 'bold' }}>What's on your mind?</div>
                          <div className='flex' style={{display:"flex"}}>
                              <div
                                  className="w-[30px] h-[30px] bg-[#e2e2e7] rounded-full mx-2"
                                  style={{
                                      width: '30px',
                                      height: '30px',
                                      background: '#e2e2e7',
                                      borderRadius: '50%',
                                      margin: '0 5px',
                                      display: 'flex', justifyContent: 'center', alignItems: 'center',
                                  }} onClick={ prevSlide }
                              ><ArrowLeft /></div>
                              <div
                                  className="w-[30px] h-[30px] bg-[#e2e2e7] rounded-full mx-2"
                                  style={{
                                      width: '30px',
                                      height: '30px',
                                      background: '#e2e2e7',
                                      borderRadius: '50%',
                                      margin: '0 5px',
                                      display: 'flex', justifyContent: 'center', alignItems: 'center',
                                  }} onClick={ nextSlide }
                              ><ArrowRight/></div>
                          </div>
                      </div>
                      <div className="sc-dCFHLb" style={{overflow:"hidden"} } >
                          <div className="row">
                              <div className="sc-lcIPJg bzggPQ" style={{ transform: `translateX(-${slide * 100}%)` , transitionDuration: '500ms' }}>
                                  <div>
                                      <a href="/"
                                          aria-label="restaurants curated for pizza"
                                          className="sc-gweoQa hvYawT"
                                      ><div height="180" width="144" className="sc-jdUcAg kqrLwl">
                                              <img
                                                  className="sc-kAyceB eDtXYp"
                                                  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029856/PC_Creative%20refresh/3D_bau/banners_new/Pizza.png"
                                                  width="144"
                                                  height="180"
                                                  alt="restaurants curated for pizza"
                                              /></div
                                          ></a>

                                  </div>
                              </div>
                              <div className="sc-lcIPJg bzggPQ" style={{ transform: `translateX(-${slide * 100}%)` , transitionDuration: '500ms' }}>
                                  <div>
                                      <a href="/"
                                          aria-label="restaurant curated for chinese"
                                          className="sc-gweoQa hvYawT"
                                      ><div height="180" width="144" className="sc-jdUcAg kqrLwl">
                                              <img
                                                  className="sc-kAyceB eDtXYp"
                                                  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029848/PC_Creative%20refresh/3D_bau/banners_new/Chinese.png"
                                                  width="144"
                                                  height="180"
                                                  alt="restaurant curated for chinese"
                                              /></div
                                          ></a>

                                  </div>
                              </div>
                              <div className="sc-lcIPJg bzggPQ" style={{ transform: `translateX(-${slide * 100}%)` , transitionDuration: '500ms' }}>
                                  <div>
                                      <a href="/"
                                          aria-label="restaurants curated for burger"
                                          className="sc-gweoQa hvYawT"
                                      ><div height="180" width="144" className="sc-jdUcAg kqrLwl">
                                              <img
                                                  className="sc-kAyceB eDtXYp"
                                                  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029845/PC_Creative%20refresh/3D_bau/banners_new/Burger.png"
                                                  width="144"
                                                  height="180"
                                                  alt="restaurants curated for burger"
                                              /></div
                                          ></a>

                                  </div>
                              </div>
                              <div className="sc-lcIPJg bzggPQ" style={{ transform: `translateX(-${slide * 100}%)` , transitionDuration: '500ms' }}>
                                  <div>
                                      <a href="/"
                                          aria-label="restaurants curated for biryani"
                                          className="sc-gweoQa hvYawT"
                                      ><div height="180" width="144" className="sc-jdUcAg kqrLwl">
                                              <img
                                                  className="sc-kAyceB eDtXYp"
                                                  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1675667625/PC_Creative%20refresh/Biryani_2.png"
                                                  width="144"
                                                  height="180"
                                                  alt="restaurants curated for biryani"
                                              /></div
                                          ></a>

                                  </div>
                              </div>
                              <div className="sc-lcIPJg bzggPQ" style={{ transform: `translateX(-${slide * 100}%)` , transitionDuration: '500ms' }}>
                                  <div>
                                      <a href="/"
                                          aria-label="restaurant curated for cakes"
                                          className="sc-gweoQa hvYawT"
                                      ><div height="180" width="144" className="sc-jdUcAg kqrLwl">
                                              <img
                                                  className="sc-kAyceB eDtXYp"
                                                  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029845/PC_Creative%20refresh/3D_bau/banners_new/Cakes.png"
                                                  width="144"
                                                  height="180"
                                                  alt="restaurant curated for cakes"
                                              /></div
                                          ></a>

                                  </div>
                              </div>
                              <div className="sc-lcIPJg bzggPQ" style={{ transform: `translateX(-${slide * 100}%)` , transitionDuration: '500ms' }}>
                                  <div>
                                      <a href="/"
                                          aria-label="restaurants curated for north indian"
                                          className="sc-gweoQa hvYawT"
                                      ><div height="180" width="144" className="sc-jdUcAg kqrLwl">
                                              <img
                                                  className="sc-kAyceB eDtXYp"
                                                  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1675667625/PC_Creative%20refresh/North_Indian_4.png"
                                                  width="144"
                                                  height="180"
                                                  alt="restaurants curated for north indian"
                                              /></div
                                          ></a>

                                  </div>
                              </div>
                              <div className="sc-lcIPJg bzggPQ" style={{ transform: `translateX(-${slide * 100}%)` , transitionDuration: '500ms' }}>
                                  <div>
                                      <a href="/"
                                          aria-label="restaurants curated for roll"
                                          className="sc-gweoQa hvYawT"
                                      ><div height="180" width="144" className="sc-jdUcAg kqrLwl">
                                              <img
                                                  className="sc-kAyceB eDtXYp"
                                                  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029858/PC_Creative%20refresh/3D_bau/banners_new/Rolls.png"
                                                  width="144"
                                                  height="180"
                                                  alt="restaurants curated for roll"
                                              /></div
                                          ></a>

                                  </div>
                              </div>
                              <div className="sc-lcIPJg bzggPQ" style={{ transform: `translateX(-${slide * 100}%)` , transitionDuration: '500ms' }}>
                                  <div>
                                      <a href="/"
                                          aria-label="restaurants curated for icecream"
                                          className="sc-gweoQa hvYawT"
                                      ><div height="180" width="144" className="sc-jdUcAg kqrLwl">
                                              <img
                                                  className="sc-kAyceB eDtXYp"
                                                  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029851/PC_Creative%20refresh/3D_bau/banners_new/Ice_Creams.png"
                                                  width="144"
                                                  height="180"
                                                  alt="restaurants curated for icecream"
                                              /></div
                                          ></a>

                                  </div>
                              </div>
                              <div className="sc-lcIPJg bzggPQ" style={{ transform: `translateX(-${slide * 100}%)` , transitionDuration: '500ms' }}>
                                  <div>
                                      <a href="/"
                                          aria-label="restaurants curated for sandwich"
                                          className="sc-gweoQa hvYawT"
                                      ><div height="180" width="144" className="sc-jdUcAg kqrLwl">
                                              <img
                                                  className="sc-kAyceB eDtXYp"
                                                  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029860/PC_Creative%20refresh/3D_bau/banners_new/Sandwich.png"
                                                  width="144"
                                                  height="180"
                                                  alt="restaurants curated for sandwich"
                                              /></div
                                          ></a>

                                  </div>
                              </div>
                              <div className="sc-lcIPJg bzggPQ" style={{ transform: `translateX(-${slide * 100}%)` , transitionDuration: '500ms' }}>
                                  <div>
                                      <a href="/"
                                          aria-label="restaurant curated for shakes"
                                          className="sc-gweoQa hvYawT"
                                      ><div height="180" width="144" className="sc-jdUcAg kqrLwl">
                                              <img
                                                  className="sc-kAyceB eDtXYp"
                                                  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029858/PC_Creative%20refresh/3D_bau/banners_new/Shakes.png"
                                                  width="144"
                                                  height="180"
                                                  alt="restaurant curated for shakes"
                                              /></div
                                          ></a>

                                  </div>
                              </div>
                              <div className="sc-lcIPJg bzggPQ" style={{ transform: `translateX(-${slide * 100}%)` , transitionDuration: '500ms' }}>
                                  <div>
                                      <a href="/"
                                          aria-label="restaurant curated for shawarma"
                                          className="sc-gweoQa hvYawT"
                                      ><div height="180" width="144" className="sc-jdUcAg kqrLwl">
                                              <img
                                                  className="sc-kAyceB eDtXYp"
                                                  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029859/PC_Creative%20refresh/3D_bau/banners_new/Shawarma.png"
                                                  width="144"
                                                  height="180"
                                                  alt="restaurant curated for shawarma"
                                              /></div
                                          ></a>

                                  </div>
                              </div>
                              <div className="sc-lcIPJg bzggPQ" style={{ transform: `translateX(-${slide * 100}%)` , transitionDuration: '500ms' }}>
                                  <div>
                                      <a href="/"
                                          aria-label="restaurant curated for momos"
                                          className="sc-gweoQa hvYawT"
                                      ><div height="180" width="144" className="sc-jdUcAg kqrLwl">
                                              <img
                                                  className="sc-kAyceB eDtXYp"
                                                  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029852/PC_Creative%20refresh/3D_bau/banners_new/Momos.png"
                                                  width="144"
                                                  height="180"
                                                  alt="restaurant curated for momos"
                                              /></div
                                          ></a>

                                  </div>
                              </div>
                              <div className="sc-lcIPJg bzggPQ" style={{ transform: `translateX(-${slide * 100}%)` , transitionDuration: '500ms' }}>
                                  <div>
                                      <a href="/"
                                          aria-label="restaurant curated for pav bhaji"
                                          className="sc-gweoQa hvYawT"
                                      ><div height="180" width="144" className="sc-jdUcAg kqrLwl">
                                              <img
                                                  className="sc-kAyceB eDtXYp"
                                                  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029854/PC_Creative%20refresh/3D_bau/banners_new/Pav_Bhaji.png"
                                                  width="144"
                                                  height="180"
                                                  alt="restaurant curated for pav bhaji"
                                              /></div
                                          ></a>

                                  </div>
                              </div>
                              <div className="sc-lcIPJg bzggPQ" style={{ transform: `translateX(-${slide * 100}%)` , transitionDuration: '500ms' }}>
                                  <div>
                                      <a href="/"
                                          aria-label="restaurant curated for noodles"
                                          className="sc-gweoQa hvYawT"
                                      ><div height="180" width="144" className="sc-jdUcAg kqrLwl">
                                              <img
                                                  className="sc-kAyceB eDtXYp"
                                                  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029855/PC_Creative%20refresh/3D_bau/banners_new/Noodles.png"
                                                  width="144"
                                                  height="180"
                                                  alt="restaurant curated for noodles"
                                              /></div
                                          ></a>

                                  </div>
                              </div>
                              <div className="sc-lcIPJg bzggPQ" style={{ transform: `translateX(-${slide * 100}%)` , transitionDuration: '500ms' }}>
                                  <div>
                                      <a href="/"
                                          aria-label="restaurants curated for paratha"
                                          className="sc-gweoQa hvYawT"
                                      ><div height="180" width="144" className="sc-jdUcAg kqrLwl">
                                              <img
                                                  className="sc-kAyceB eDtXYp"
                                                  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029853/PC_Creative%20refresh/3D_bau/banners_new/Paratha.png"
                                                  width="144"
                                                  height="180"
                                                  alt="restaurants curated for paratha"
                                              /></div
                                          ></a>

                                  </div>
                              </div>
                              <div className="sc-lcIPJg bzggPQ" style={{ transform: `translateX(-${slide * 100}%)` , transitionDuration: '500ms' }}>
                                  <div>
                                      <a href="/"
                                          aria-label="restaurant curated for pasta"
                                          className="sc-gweoQa hvYawT"
                                      ><div height="180" width="144" className="sc-jdUcAg kqrLwl">
                                              <img
                                                  className="sc-kAyceB eDtXYp"
                                                  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029854/PC_Creative%20refresh/3D_bau/banners_new/Pasta.png"
                                                  width="144"
                                                  height="180"
                                                  alt="restaurant curated for pasta"
                                              /></div
                                          ></a>

                                  </div>
                              </div>
                              <div className="sc-lcIPJg bzggPQ" style={{ transform: `translateX(-${slide * 100}%)` , transitionDuration: '500ms' }}>
                                  <div>
                                      <a href="/"
                                          aria-label="restaurant curated for kebabs"
                                          className="sc-gweoQa hvYawT"
                                      ><div height="180" width="144" className="sc-jdUcAg kqrLwl">
                                              <img
                                                  className="sc-kAyceB eDtXYp"
                                                  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029853/PC_Creative%20refresh/3D_bau/banners_new/Kebabs.png"
                                                  width="144"
                                                  height="180"
                                                  alt="restaurant curated for kebabs"
                                              /></div
                                          ></a>

                                  </div>
                              </div>
                              <div className="sc-lcIPJg bzggPQ" style={{ transform: `translateX(-${slide * 100}%)` , transitionDuration: '500ms' }}>
                                  <div>
                                      <a href="/"
                                          aria-label="restaurants curated for south indian"
                                          className="sc-gweoQa hvYawT"
                                      ><div height="180" width="144" className="sc-jdUcAg kqrLwl">
                                              <img
                                                  className="sc-kAyceB eDtXYp"
                                                  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1675667626/PC_Creative%20refresh/South_Indian_4.png"
                                                  width="144"
                                                  height="180"
                                                  alt="restaurants curated for south indian"
                                              /></div
                                          ></a>

                                  </div>
                              </div>
                              <div className="sc-lcIPJg bzggPQ" style={{ transform: `translateX(-${slide * 100}%)` , transitionDuration: '500ms' }}>
                                  <div>
                                      <a href="/"
                                          aria-label="restaurant curated for Pastry"
                                          className="sc-gweoQa hvYawT"
                                      ><div height="180" width="144" className="sc-jdUcAg kqrLwl">
                                              <img
                                                  className="sc-kAyceB eDtXYp"
                                                  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029847/PC_Creative%20refresh/3D_bau/banners_new/Pastry.png"
                                                  width="144"
                                                  height="180"
                                                  alt="restaurant curated for Pastry"
                                              /></div
                                          ></a>

                                  </div>
                              </div>
                              <div className="sc-lcIPJg bzggPQ" style={{ transform: `translateX(-${slide * 100}%)` , transitionDuration: '500ms' }}>
                                  <div>
                                      <a href="/" aria-label="restaurants curated for veg" className="sc-gweoQa hvYawT"
                                      ><div height="180" width="144" className="sc-jdUcAg kqrLwl">
                                              <img
                                                  className="sc-kAyceB eDtXYp"
                                                  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029858/PC_Creative%20refresh/3D_bau/banners_new/Pure_Veg.png"
                                                  width="144"
                                                  height="180"
                                                  alt="restaurants curated for veg"
                                              /></div
                                          ></a>

                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <hr class="sc-ZEldx jPPVTo"/>
              <div className="sc-hybRYi sc-evdWiO kISvXT dvYNSY">
                  <div>
                      <div className="sc-eONNys kdlPJg">
                          <div className="sc-bOhtcR jeBhly">
                              <button
                                  aria-label="click here to move previous"
                                  className="sc-kbdlSk fpPKzX"
                                  disabled=""
                              >
                                  <div className="sc-fFlnrN sc-camqpD bTbDpZ ggxOfk">
                                      <svg
                                          aria-hidden="true"
                                          height="16"
                                          width="16"
                                          className="sc-dhKdcB bmyDnM"
                                      ></svg>
                                  </div></button
                              ><button
                                  aria-label="click here to move next"
                                  className="sc-kbdlSk jUaqNk"
                              >
                                  <div className="sc-fFlnrN bTbDpZ">
                                      <svg
                                          aria-hidden="true"
                                          height="16"
                                          width="16"
                                          className="sc-dhKdcB bmyDnM"
                                      ></svg>
                                  </div>
                              </button>
                          </div>
                          <div className="sc-eBMEME kHakdX">

                              <div style={{ display: 'flex', justifyContent: 'space-between' ,margin:'20px 0' }}>
                                  <div style={{ fontSize: '25px', fontWeight: 'bold' }}>Top restaurant chains in Patna</div>
                                  <div className='flex' style={{ display: "flex" }}>
                                      <div
                                          className="w-[30px] h-[30px] bg-[#e2e2e7] rounded-full mx-2"
                                          style={{
                                              width: '30px',
                                              height: '30px',
                                              background: '#e2e2e7',
                                              borderRadius: '50%',
                                              margin: '0 5px',
                                              display: 'flex', justifyContent: 'center', alignItems: 'center',
                                          }} onClick={prevRsSlide}
                                      ><ArrowLeft /></div>
                                      <div
                                          className="w-[30px] h-[30px] bg-[#e2e2e7] rounded-full mx-2"
                                          style={{
                                              width: '30px',
                                              height: '30px',
                                              background: '#e2e2e7',
                                              borderRadius: '50%',
                                              margin: '0 5px',
                                              display: 'flex', justifyContent: 'center', alignItems: 'center',
                                          }} onClick={nextRsSlide}
                                      ><ArrowRight /></div>
                                  </div>
                              </div>
                              <div className="sc-dCFHLb HJKuG">
                                  <div className="row">
                                      {restaurants.map((item, index) => (
                                          <div className="sc-lcIPJg iLAqNn" style={{ transform: `translateX(-${rsSlide * 100}%)`, transitionDuration: '500ms' }}>
                                          <div>
                                                  <a href={`${restaurantUrl}${item.id}`} className="sc-dISpDn gIxlHc"
                                              ><div className="sc-fMMURN ecZeNv">
                                                      <div className="sc-jEACwC gwzyGC">
                                                          <div className="sc-cPiKLX elQYKn">
                                                              <div
                                                                  width="100%"
                                                                  height="100%"
                                                                  className="sc-jlZhew hMQYez"
                                                              >
                                                                  <img
                                                                      className="sc-kAyceB fAqgqV"
                                                                          src={item.imageUrl }
                                                                          alt={item.name}
                                                                  />
                                                                  <div className="sc-kpDqfm bhUeB sc-cwHptR jRWNeE">
                                                                      <div
                                                                          className="sc-aXZVg eOcpsq sc-dAlyuH jzlukq"
                                                                      ></div>
                                                                      <div className="sc-aXZVg ivxbaH sc-dAlyuH jzlukq">
                                                                              {item.offer}
                                                                      </div>
                                                                      <div
                                                                          className="sc-aXZVg dMioqQ sc-dAlyuH jzlukq"
                                                                      ></div>
                                                                  </div>
                                                              </div>
                                                          </div>
                                                      </div>
                                                      <div>
                                                          <div>
                                                                  <div className="sc-aXZVg cHWThC">{item.name}</div>
                                                          </div>
                                                          <div className="sw-restaurant-card-subtext-container">
                                                              <div>
                                                                  <svg
                                                                      width="20"
                                                                      height="20"
                                                                      viewBox="0 0 20 20"
                                                                      fill="none"
                                                                      role="img"
                                                                      aria-hidden="true"
                                                                      strokeColor="rgba(2, 6, 12, 0.92)"
                                                                      fillColor="rgba(2, 6, 12, 0.92)"
                                                                  >
                                                                      <circle
                                                                          cx="10"
                                                                          cy="10"
                                                                          r="9"
                                                                          fill="url(#StoreRating20_svg__paint0_linear_32982_71567)"
                                                                      ></circle>
                                                                      <path
                                                                          d="M10.0816 12.865C10.0312 12.8353 9.96876 12.8353 9.91839 12.865L7.31647 14.3968C6.93482 14.6214 6.47106 14.2757 6.57745 13.8458L7.27568 11.0245C7.29055 10.9644 7.26965 10.9012 7.22195 10.8618L4.95521 8.99028C4.60833 8.70388 4.78653 8.14085 5.23502 8.10619L8.23448 7.87442C8.29403 7.86982 8.34612 7.83261 8.36979 7.77777L9.54092 5.06385C9.71462 4.66132 10.2854 4.66132 10.4591 5.06385L11.6302 7.77777C11.6539 7.83261 11.706 7.86982 11.7655 7.87442L14.765 8.10619C15.2135 8.14085 15.3917 8.70388 15.0448 8.99028L12.7781 10.8618C12.7303 10.9012 12.7095 10.9644 12.7243 11.0245L13.4225 13.8458C13.5289 14.2757 13.0652 14.6214 12.6835 14.3968L10.0816 12.865Z"
                                                                          fill="white"
                                                                      ></path>
                                                                      <defs>
                                                                          <linearGradient
                                                                              id="StoreRating20_svg__paint0_linear_32982_71567"
                                                                              x1="10"
                                                                              y1="1"
                                                                              x2="10"
                                                                              y2="19"
                                                                              gradientUnits="userSpaceOnUse"
                                                                          >
                                                                              <stop stop-color="#21973B"></stop>
                                                                              <stop offset="1" stop-color="#128540"></stop>
                                                                          </linearGradient>
                                                                      </defs>
                                                                  </svg>
                                                              </div>
                                                              <div className="sc-aXZVg bUjCLt">
                                                                      <span className="sc-aXZVg gnOsqr">{item.rateing} • </span>{item.cookingTime}
                                                              </div>
                                                          </div>
                                                          <div
                                                              className="sw-restaurant-card-descriptions-container"
                                                          >
                                                                  <div className="sc-aXZVg dnXOKm">{item.service}</div>
                                                                  <div className="sc-aXZVg dnXOKm">{item.address}</div>
                                                          </div>
                                                      </div>
                                                  </div></a
                                              >
                                              <div></div>
                                          </div>
                                          </div>
                                      ))}
                                     
                                  </div>
                              </div>
                              <div className="sc-cWSHoV kgLnks"></div>
                          </div>
                      </div>
                      <div></div>
                  </div>
              </div>
              <hr class="sc-ZEldx jPPVTo"/>
              <div id="container-grid-filter-sort" className="sc-cEEJxU bIRagp">
                  <div>
                      <h2 className="sc-aXZVg gJgHPI">
                          Restaurants with online food delivery in Viluppuram
                      </h2>
                      <div></div>
                  </div>
              </div>
              <div class="sc-bHvAfQ bTuQzO"></div>
              <div id="container-grid-filter-sort" className="sc-cEEJxU bIRagp">
                  <div>
                      <div className="sc-eBHhsj kSaWXH">
                          <div className="sc-lnPyaJ dHTDHl">
                              <div className="sc-iapWAC dUFeIZ">
                                  <div className="sc-kqGoIF hxvOem">
                                      <div className="sc-aXZVg bkydBH">Filter</div>
                                      <svg aria-hidden="true" height="16" width="16" className="sc-dhKdcB bmyDnM">
                                          <use xlinkHref="/core/sprite-2e61ee4e.svg#filter16"></use>
                                      </svg>
                                  </div>
                              </div>
                              <div className="sc-iapWAC dUFeIZ">
                                  <div className="sc-koXPp brynaT">
                                      <div className="sc-aXZVg uxlfx">Sort By</div>
                                      <svg aria-hidden="true" height="12" width="12" className="sc-dhKdcB bMdcuJ" style={{ marginTop: '1px', fillOpacity: '1' }}>
                                          <use xlinkHref="/core/sprite-2e61ee4e.svg#chevronDown12"></use>
                                      </svg>
                                  </div>
                              </div>
                              <div className="sc-iapWAC dUFeIZ">
                                  <div className="sc-bmzYkS XSOzM">
                                      <div className="contents">
                                          <div className="sc-aXZVg uxlfx">Fast Delivery</div>
                                      </div>
                                  </div>
                              </div>
                              <div className="sc-iapWAC dUFeIZ">
                                  <div className="sc-bmzYkS XSOzM">
                                      <div className="contents">
                                          <div className="sc-aXZVg uxlfx">Ratings 4.0+</div>
                                      </div>
                                  </div>
                              </div>
                              <div className="sc-iapWAC dUFeIZ">
                                  <div className="sc-bmzYkS XSOzM">
                                      <div className="contents">
                                          <div className="sc-aXZVg uxlfx">Pure Veg</div>
                                      </div>
                                  </div>
                              </div>
                              <div className="sc-iapWAC dUFeIZ">
                                  <div className="sc-bmzYkS XSOzM">
                                      <div className="contents">
                                          <div className="sc-aXZVg uxlfx">Offers</div>
                                      </div>
                                  </div>
                              </div>
                              <div className="sc-iapWAC dUFeIZ">
                                  <div className="sc-bmzYkS XSOzM">
                                      <div className="contents">
                                          <div className="sc-aXZVg uxlfx">Rs. 300-Rs. 600</div>
                                      </div>
                                  </div>
                              </div>
                              <div className="sc-iapWAC dUFeIZ">
                                  <div className="sc-bmzYkS XSOzM">
                                      <div className="contents">
                                          <div className="sc-aXZVg uxlfx">Less than Rs. 300</div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div></div>
                  </div>
              </div>
              <div className="sc-hybRYi sc-evdWiO kISvXT dvYNSY">
                  <div>
                      <div className="sc-jXbUNg evmmeh">
                          {restaurants.map((item, index) => (

                              <div key={index} >
                                  <a className="sc-iEXKAA kzLWjC" href={`${restaurantUrl}${item.id}`}>
                                  <div className="sc-fMMURN ecZeNv">
                                      <div className="sc-jEACwC gwzyGC">
                                          <div className="sc-cPiKLX elQYKn">
                                              <div width="100%" height="100%" className="sc-jlZhew hMQYez">
                                                      <img className="sc-kAyceB fAqgqV" src={item.imageUrl} alt={item.name} />
                                                  <div className="sc-kpDqfm bhUeB sc-cwHptR jRWNeE">
                                                      <div className="sc-aXZVg eOcpsq sc-dAlyuH jzlukq"></div>
                                                          <div className="sc-aXZVg ivxbaH sc-dAlyuH jzlukq">{item.offer} </div>
                                                      <div className="sc-aXZVg dMioqQ sc-dAlyuH jzlukq"></div>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                      <div style={{ marginLeft: '12px' }}>
                                          <div>
                                                  <div className="sc-aXZVg cHWThC">{item.name}</div>
                                          </div>
                                          <div className="sw-restaurant-card-subtext-container" style={{ marginTop: '-2px' }}>
                                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" role="img" aria-hidden="true" strokeColor="rgba(2, 6, 12, 0.92)" fillColor="rgba(2, 6, 12, 0.92)">
                                                  <circle cx="10" cy="10" r="9" fill="url(#StoreRating20_svg__paint0_linear_32982_71567)"></circle>
                                                  <path d="M10.0816 12.865C10.0312 12.8353 9.96876 12.8353 9.91839 12.865L7.31647 14.3968C6.93482 14.6214 6.47106 14.2757 6.57745 13.8458L7.27568 11.0245C7.29055 10.9644 7.26965 10.9012 7.22195 10.8618L4.95521 8.99028C4.60833 8.70388 4.78653 8.14085 5.23502 8.10619L8.23448 7.87442C8.29403 7.86982 8.34612 7.83261 8.36979 7.77777L9.54092 5.06385C9.71462 4.66132 10.2854 4.66132 10.4591 5.06385L11.6302 7.77777C11.6539 7.83261 11.706 7.86982 11.7655 7.87442L14.765 8.10619C15.2135 8.14085 15.3917 8.70388 15.0448 8.99028L12.7781 10.8618C12.7303 10.9012 12.7095 10.9644 12.7243 11.0245L13.4225 13.8458C13.5289 14.2757 13.0652 14.6214 12.6835 14.3968L10.0816 12.865Z" fill="white"></path>
                                                  <defs>
                                                      <linearGradient id="StoreRating20_svg__paint0_linear_32982_71567" x1="10" y1="1" x2="10" y2="19" gradientUnits="userSpaceOnUse">
                                                          <stop stopColor="#21973B"></stop>
                                                          <stop offset="1" stopColor="#128540"></stop>
                                                      </linearGradient>
                                                  </defs>
                                              </svg>
                                              <div className="sc-aXZVg bUjCLt" style={{ marginTop: '-4px' }}>
                                                      <span className="sc-aXZVg gnOsqr">4.4 • </span>{item.cookingTime}
                                              </div>
                                          </div>
                                          <div className="sw-restaurant-card-descriptions-container">
                                                  <div className="sc-aXZVg dnXOKm">{item.service}</div>
                                                  <div className="sc-aXZVg dnXOKm">{item.address}</div>
                                          </div>
                                      </div>
                                  </div>
                              </a>
                              <div></div>
                          </div>
                          ))}
                      </div>
                  </div>
                  <div></div>
                  <div></div>
              </div>
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
                    {item.imageUrl ? (
                      <img
                        style={{
                          width: 160,
                          height: 110,
                          borderRadius: "10px",
                        }}
                        alt={item.name}
                        src={item.imageUrl}
                      />
                    ) : (
                      <Box style={{ width: 160, height: 110 }}>
                        No Images Found
                      </Box>
                    )}

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
