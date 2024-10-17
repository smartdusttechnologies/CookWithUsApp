import React, { useRef, useEffect, useState,useContext } from "react";
import "../RestaurantUi.css";
import {  Megaphone, CircleUserRound, CirclePower } from 'lucide-react';
import RestaurantIsActivePopUp from "../PopUp/RestaurantIsActivePopUp";
import { getRestaurantDetails, GetRestaurantByEmail } from "../../../services/restaurantServices";
import { jwtDecode } from 'jwt-decode';
import AuthContext from "../../../Pages/AuthProvider";

const RestaurantTopBar = ({ isActive, setIsActive })=> {
    const toggleActive = (option) => {
        setIsActive(option);
    };
    const [thisResturentDetails, setThisResturentDetails] = useState([]);
    const [openActivePopup, setOpenActivePopup] = useState(false);
    useEffect(() => {
        if (openActivePopup) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
        // Clean-up function to remove the class when component unmounts
        return () => {
            document.body.classList.remove('modal-open');
        };
    }, [openActivePopup]);
    const [restaurantDetails, setRestaurantDetails] = useState('');
    const { auth, setAuth,logOut } = useContext(AuthContext);
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
                });
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
        <div>
            <div className="topbar">
                <div className="leftSide">
                    <div className="manageOrder">MANAGE ORDERS</div>
                    <div className="userName">{restaurantDetails.restaurantName}</div>
                    {isActive ? (
                        <div onClick={() => toggleActive(false)} className="toggle-btn">
                            <CirclePower style={{ height: "20px", color: "green", transform: "translateX(15px)", transition: "transform 0.3s" }} />
                        </div>
                    ) : (
                            <div onClick={() => { setOpenActivePopup(true);}} className="toggle-btn">
                                <CirclePower style={{ height: "20px", transition: "transform 0.3s" }} />
                        </div>
                    )}
                </div>
                <div className="rightSide">
                    <div className="faqButton"><button className="faq">FAQS</button></div>
                    <div className="notification">
                        <Megaphone />
                    </div>
                    <div className="userProfile">
                        <CircleUserRound />
                        <div className="restaurantUserModal">
                            <div className="restaurantUserLogOut" onClick={logOut}>LogOut</div>
                        </div>
                    </div>
                </div>
            </div>
            {openActivePopup ? (
                <RestaurantIsActivePopUp setIsActive={setIsActive} setOpenActivePopup={setOpenActivePopup }  />
            ):(null) }
        </div>

    );
}
export default RestaurantTopBar;