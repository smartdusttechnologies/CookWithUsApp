import React from "react";
import RestaurantDetails from "./RestaurantDetails";
import PhoneRestaurantDetails from "./PhoneRestaurantDetails";
export default function MainRestaurantDetails({ isPhone }) {
    return (
        <>
            {isPhone ? (
                <PhoneRestaurantDetails />
            ) : (
                    <RestaurantDetails />
            )}
            
        </>
    );
}