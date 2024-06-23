import React, { useState } from "react";
import { Timer } from 'lucide-react';
import "./OrderCountDown.css";
export default function OrderCountDown({ handleConfirm , eachOrderDetails , setOpenCountDown, setCountdown, initialMinutes = 15 }) {
        const [minutes, setMinutes] = useState(initialMinutes);

    const incrementMinutes = () => {
        if (minutes < initialMinutes) {
            setMinutes(minutes + 1);
        }
        };

        const decrementMinutes = () => {
            if (minutes > 1) {
                setMinutes(minutes - 1);
            }
        };
    const handleCountdownSubmit = () => {
        handleConfirm(eachOrderDetails);
        setCountdown(minutes * 60);
        setOpenCountDown(false);
    }
    return (
        <><div className="_3bg_blackblur">
        </div>
            <div className="countdown-modal">
                <div className="countdown-header">
                    <Timer style={{height:"50px",width:"auto"}} />
                    <p>How long will this take to prepare?</p>
                </div>
                <div className="countdown-timer">
                    <button onClick={decrementMinutes} className="countdown-btn">-</button>
                    <span className="countdown-time">{minutes} MINS</span>
                    <button onClick={incrementMinutes} className="countdown-btn">+</button>
                </div>
                <button onClick={handleCountdownSubmit} className="countdown-done">DONE</button>
            </div>
        </>
    );
}