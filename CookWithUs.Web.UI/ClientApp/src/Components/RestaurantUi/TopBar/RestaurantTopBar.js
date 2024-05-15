import React, { useRef, useEffect, useState } from "react";
import "../RestaurantUi.css";
import {  Megaphone, CircleUserRound, CirclePower } from 'lucide-react';
import RestaurantIsActivePopUp from "../PopUp/RestaurantIsActivePopUp";
import { getRestaurantDetails } from "../../../services/restaurantServices";
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
    useEffect(() => {
        const RestaurantId = 1;
        getRestaurantDetails(RestaurantId)
            .then(response => {
                setThisResturentDetails(response.data);
            })
            .catch(error => {
                console.error("An error occurred while adding address:", error);
            });
    }, []);
    return (
        <div>
            <div className="topbar">
                <div className="leftSide">
                    <div className="manageOrder">MANAGE ORDERS</div>
                    <div className="userName">{thisResturentDetails.name }</div>
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