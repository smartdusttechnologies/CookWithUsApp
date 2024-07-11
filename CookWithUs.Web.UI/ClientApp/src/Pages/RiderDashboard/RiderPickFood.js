import React, {useEffect } from "react";
import "./RiderPickFood.css";
import { ArrowLeft } from 'lucide-react';

export default function RiderPickFood() {
    useEffect(() => {
        // Hide elements with class name "ridertopbar"
        const elements = document.getElementsByClassName('ridertopbar');
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.display = 'none';
        }
        const elements1 = document.getElementsByClassName('main-container');
        for (let i = 0; i < elements.length; i++) {
            elements1[i].style.padding = 0;
        }
    }, []);
    return (
    <>
            <div className="_4PickFoodTopBar">
                <div className="_4PickFoodTopLeftSide">
                    <div className="_4PickFoodBackIcon">
                        <ArrowLeft/>
                    </div>
                    <div className="_4pickFood">
                        PICK FOOD
                    </div>
                </div>
                <div className="_4PickFoodTopRightSide">
                    <div className="_4SosIcon">
                        SOS
                    </div>
                    <div className="_4HelpIcon">
                        HELP
                    </div>
                </div>
            </div>
            <div className="_4readyPopup">
            Food is ready for pickup
            </div>
    </>
    );
}