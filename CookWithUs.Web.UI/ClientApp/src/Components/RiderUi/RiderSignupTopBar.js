import React, { useEffect } from "react";
import "./RiderSignupTopBar.css";
import { ArrowLeft, CircleHelp } from 'lucide-react';
export default function RiderSignupTopBar({ continueWith,setContinueWith, stepName, backClickEvent }) {
    useEffect(() => {
        // Hide elements with class name "ridertopbar"
        if (continueWith) {
            const elements = document.getElementsByClassName('ridertopbar');
            for (let i = 0; i < elements.length; i++) {
                elements[i].style.display = 'none';
            }
        }
        else {
            const elements = document.getElementsByClassName('ridertopbar');
            for (let i = 0; i < elements.length; i++) {
                elements[i].style.display = 'flex';
            }
        }
    }, []);
    return (
        <>
            <div className="_7RiderSignUpTopBar">
                <div className="_7RiderSignupTopbarLeft">
                    <div onClick={backClickEvent} className="_7RiderSignupTopbarLeftBack">
                        <ArrowLeft/>
                    </div>
                    <div className="_7RiderSignupTopbarLeftStep">
                        {stepName }
                    </div>
                </div>
                <div className="_7RiderSignupTopbarRight">
                    <div className="_7RiderSignupTopbarRightHelp">
                        <CircleHelp/>
                    </div>
                </div>
            </div>
        </>
    );
}