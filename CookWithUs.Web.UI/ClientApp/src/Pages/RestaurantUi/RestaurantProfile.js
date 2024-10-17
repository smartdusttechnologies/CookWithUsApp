import React, { useEffect, useState,useContext,useRef } from "react";
import "./RestaurantAuth.css"; // Create a CSS file for the styles
import AuthContext from "../AuthProvider";
import { jwtDecode } from 'jwt-decode';
import { GetRestaurantByEmail } from "../../services/restaurantServices";

const RestaurantProfile = () => {
    const [restaurantDetails, setRestaurantDetails] = useState({
        ownerFullName: "John Doe",
        restaurantName: "The Gourmet Spot",
        latitude: "28.7041",
        longitude: "77.1025",
        email: "contact@gourmetspot.com",
        mobile: "+1234567890",
        whatsapp: "+1234567890",
        workingDays: "Mon-Sat",
        openingTime: "9:00 AM",
        closingTime: "11:00 PM",
        category: "Fine Dining",
        ownerPan: "ABCDE1234F",
        gstIn: "29ABCDE1234F2Z5",
        ifscCode: "HDFC0001234",
        accountNumber: "12345678901234",
        fssaiNumber: "10012021000123",
        menu: "Continental, Italian, Indian",
    });

    const { auth, setAuth, logOut } = useContext(AuthContext);
    const timerId = useRef();
    const getDetails = () => {
        if (auth.isAuthenticated) {
            const token = localStorage.getItem('jwtToken');
            const decodedToken = jwtDecode(token);
            const username = decodedToken.sub;
            GetRestaurantByEmail(username)
                .then(response => {
                    setRestaurantDetails(response.data);
                })
                .catch(error => {
                    console.error("An error occurred while adding address:", error);
                }
                );
        }
    }
    useEffect(() => {
        getDetails();
    }, []);
    useEffect(() => {
        timerId.current = setInterval(() => {
            getDetails();
        }, 1000)
        return () => clearInterval(timerId.current);
    }, []);
    return (
        <div className="_9RiderContainer">
            <div className="_9RiderHeader">
                <h1>{restaurantDetails.restaurantName}</h1>
                <p className="_9RiderSubheader">{restaurantDetails.category}</p>
            </div>

            <div className="_9RiderDetails">
                {/* General Information */}
                <h2 className="_9RiderSectionTitle">General Info</h2>
                <div className="_9RiderDetailRow">
                    <span className="_9RiderLabel">Owner:</span>
                    <span className="_9RiderValue">{restaurantDetails.ownerFullName}</span>
                </div>
                <div className="_9RiderDetailRow">
                    <span className="_9RiderLabel">Latitude:</span>
                    <span className="_9RiderValue">{restaurantDetails.latitude}</span>
                </div>
                <div className="_9RiderDetailRow">
                    <span className="_9RiderLabel">Longitude:</span>
                    <span className="_9RiderValue">{restaurantDetails.longitude}</span>
                </div>
                <div className="_9RiderDetailRow">
                    <span className="_9RiderLabel">Working Days:</span>
                    <span className="_9RiderValue">{restaurantDetails.workingDays}</span>
                </div>
                <div className="_9RiderDetailRow">
                    <span className="_9RiderLabel">Opening Time:</span>
                    <span className="_9RiderValue">{restaurantDetails.openingTime}</span>
                </div>
                <div className="_9RiderDetailRow">
                    <span className="_9RiderLabel">Closing Time:</span>
                    <span className="_9RiderValue">{restaurantDetails.closingTime}</span>
                </div>

                {/* Contact Information */}
                <h2 className="_9RiderSectionTitle _9RiderContactInfo">Contact Info</h2>
                <div className="_9RiderDetailRow">
                    <span className="_9RiderLabel">Email:</span>
                    <span className="_9RiderValue">{restaurantDetails.email}</span>
                </div>
                <div className="_9RiderDetailRow">
                    <span className="_9RiderLabel">Mobile:</span>
                    <span className="_9RiderValue">{restaurantDetails.mobile}</span>
                </div>
                <div className="_9RiderDetailRow">
                    <span className="_9RiderLabel">WhatsApp:</span>
                    <span className="_9RiderValue">{restaurantDetails.whatsapp}</span>
                </div>

                {/* Bank Information */}
                <h2 className="_9RiderSectionTitle _9RiderBankInfo">Bank & Legal Info</h2>
                <div className="_9RiderDetailRow">
                    <span className="_9RiderLabel">Owner PAN:</span>
                    <span className="_9RiderValue">{restaurantDetails.ownerPan}</span>
                </div>
                <div className="_9RiderDetailRow">
                    <span className="_9RiderLabel">GSTIN:</span>
                    <span className="_9RiderValue">{restaurantDetails.gstIn}</span>
                </div>
                <div className="_9RiderDetailRow">
                    <span className="_9RiderLabel">IFSC Code:</span>
                    <span className="_9RiderValue">{restaurantDetails.ifscCode}</span>
                </div>
                <div className="_9RiderDetailRow">
                    <span className="_9RiderLabel">Account Number:</span>
                    <span className="_9RiderValue">{restaurantDetails.accountNumber}</span>
                </div>
                <div className="_9RiderDetailRow">
                    <span className="_9RiderLabel">FSSAI Number:</span>
                    <span className="_9RiderValue">{restaurantDetails.fssaiNumber}</span>
                </div>

                {/* Menu */}
                <h2 className="_9RiderSectionTitle _9RiderMenuInfo">Menu</h2>
                <div className="_9RiderDetailRow">
                    <span className="_9RiderLabel">Available Cuisines:</span>
                    <span className="_9RiderValue">{restaurantDetails.menu}</span>
                </div>
            </div>
        </div>
    );
};

export default RestaurantProfile;
