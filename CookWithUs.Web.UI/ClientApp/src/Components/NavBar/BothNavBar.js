import React, { useState } from "react";
import RestaurantSideBar from "../RestaurantUi/SideBar/RestaurantSideBar";
import RestaurantTopBar from "../RestaurantUi/TopBar/RestaurantTopBar";
import RiderTopBar from "../RiderUi/RiderTopBar";
import NavBar from "./NavBar";
import RiderSideBar from "../RiderUi/RiderSideBar";
import PhoneNavBar from "./PhoneNavBar";

const BothNavBar = ({ isPhone, role, setActiveTab, activeTab, setIsActive, isActive }) => {
    const [riderSideBar, setRiderSideBar] = useState(false);
    if (role === 'User') {
        return (
         <>
                {isPhone ? (
                    <>
                        <PhoneNavBar />
                    </>
                ) : (
                    <>
                            <NavBar />
                    </>
                )}
            </>
        );
    } else if (role === 'Restaurant') {
        return (
                    <>
                        <RestaurantSideBar activeTab={activeTab} setActiveTab={setActiveTab} />
                        <RestaurantTopBar isActive={isActive} setIsActive={setIsActive} />
                    </>
        );
    } else if (role === 'Rider') {
        
        return (
            <>
                {riderSideBar && <RiderSideBar setRiderSideBar={setRiderSideBar } />}
                <RiderTopBar setRiderSideBar={setRiderSideBar} />
            </>
        ); 
    }
    else {
        return null; 
    }
}

export default BothNavBar;
