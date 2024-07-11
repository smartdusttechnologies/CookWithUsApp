import React, { useState, useEffect } from 'react';

const Timer = ({ targetDateTime, handleOnClickReadyItem,order }) => {
    const calculateTimeDifference = () => {
        const now = new Date();
        const targetDate = new Date(targetDateTime);
        const difference = targetDate - now;

        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }
        else {
            handleOnClickReadyItem(order, 'Ready');
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeDifference());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeDifference());
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDateTime]);

    return (
        <div>
            {timeLeft.days !== undefined ? (
                <div>
                    <p> {timeLeft.minutes + 1}</p>                  
                </div>
            ) : (
                <p>Event has passed!</p>
            )}
        </div>
    );
};

export default Timer;
