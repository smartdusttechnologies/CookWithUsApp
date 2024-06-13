import React from "react";
import MyOrders from "./MyOrders";
import PhoneMyAccount from "./PhoneMyAccount";
export default function MyAccount({ isPhone }) {
    return (
        <>
            {isPhone ? (
                < PhoneMyAccount />
            ) : (
                <MyOrders />
            )}
        </>
    );
}