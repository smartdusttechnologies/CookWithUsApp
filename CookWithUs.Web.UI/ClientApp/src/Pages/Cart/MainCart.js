import React from "react";
import Cart from "./Cart";
import PhoneCart from "./PhoneCart";
export default function MainCart({ isPhone }) {
    return (
        <>
            {isPhone ? (
                < PhoneCart />
            ) : (
                    <Cart />
            )}
        </>
    );
}