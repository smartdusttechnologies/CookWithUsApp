import React, { useState,useEffect } from "react";
import "./RiderLogin.css";
import RiderContinueWithLogin from "./RiderContinueWithLogin";
import RiderContinueWithSignup from "./RiderContinueWithSignup";

export default function RiderLogin( { setRole }) {
    const [continueWith, setContinueWith] = useState(null);
    useEffect(() => {
        if (!continueWith) {
            const elements = document.getElementsByClassName('ridertopbar');
            for (let i = 0; i < elements.length; i++) {
                elements[i].style.display = 'flex';
            }
        }
    });
    return (
        <div className="fullLayoutRider">
            {continueWith === null && (
                <>
                    <div className="_6RiderLoginPage">
                        <div className="_6RiderLoginButton">
                            <div onClick={() => setContinueWith("LOGIN")} className="_6RiderLogin">
                                LOGIN
                            </div>
                            <div onClick={() => setContinueWith("SIGNUP")} className="_6RiderSignupButton">
                                SIGNUP
                            </div>
                        </div>
                    </div>
                    <div className="_6RiderLoginButton" style={{ flexDirection: "row", justifyContent: "space-around", paddingTop:"20px" }}>
                        <div onClick={() => setRole("User")} className="_6RiderLogin">
                            USER
                        </div>
                        <div onClick={() => setRole("Restaurant")} className="_6RiderLogin">
                            RESTAURANT
                        </div>
                    </div>
                </>
            )}
            {continueWith === "LOGIN" && <RiderContinueWithLogin continueWith={continueWith} setContinueWith={setContinueWith} />}
            {continueWith === "SIGNUP" && <RiderContinueWithSignup continueWith={continueWith} setContinueWith={setContinueWith} />}
        </div>
    );
}
