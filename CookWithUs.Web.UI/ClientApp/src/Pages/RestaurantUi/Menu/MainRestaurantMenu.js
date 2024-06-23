import React from "react";
import RestaurantMenu from "./RestaurantMenu";
import PhoneRestaurantMenu from "./PhoneRestaurantMenu";
export default function MainRestaurantMenu({ isPhone, setActiveTab, activeTab }) {
    return (
       
        <>
            {isPhone ? (
                <PhoneRestaurantMenu setActiveTab={setActiveTab} activeTab={activeTab} />
            ) : (                    
                <RestaurantMenu setActiveTab={setActiveTab} activeTab={activeTab} />
            )}
            
        </>
    );
}