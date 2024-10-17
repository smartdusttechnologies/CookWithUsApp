import React, { useState, useEffect } from "react";
import { Utensils, Bike, Clock, CornerUpRight } from 'lucide-react';
import GoogleMapComponent from "../../Components/GoogleMapComponent/GoogleMapComponent ";
import "./RiderNextDirection.css";

export default function RiderNextDirection({ nextDestination, setSeeLocation, destinationReached }) {
    useEffect(() => {
        // Hide elements with class name "ridertopbar"
        const elements = document.getElementsByClassName('ridertopbar');
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.display = 'none';
        }
    }, []);
    const handleConfirmOrder = () => {
        setSeeLocation(false);
    } 
    const [origin, setOrigin] = useState({ lat: 0, lng: 0 });

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setOrigin({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error('Error getting location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }, []);
    const destination = { lat: 34.0522, lng: -118.2437 }; 
    const cardStyle = {
        margin: '10px',
        width: 'auto',
        backgroundColor: 'white',
        border: '1px solid',
        padding: '20px'
    };

    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px'
    };

    const earningsTextStyle = {
        fontSize: '10px',
        fontWeight: '500'
    };

    const amountStyle = {
        fontSize: '20px',
        fontWeight: '700'
    };

    const pickFoodStyle = {
        background: '#f5c8b8',
        fontSize: '15px',
        width: '70px',
        textAlign: 'center',
        padding: '10px',
        marginTop: '-30px',
        fontWeight: '600',
        color: '#cf2b2b',
        border: '1px solid'
    };

    const detailStyle = {
        fontWeight: '500',
        marginBottom: '10px',
    };
    const RiderOrderCss = {
        top: 0,
        width: '100%',
        height: '100%'
    }
    return (
            <>
                <div style={RiderOrderCss}>
                    <div ><GoogleMapComponent style={{ width: '100%', height: '60vh' }}
                        origin={origin}
                        destination={destination}
                        zoom={7} // Adjust the zoom level as needed
                    /></div>                   
                    <div style={cardStyle}>
                    <div style={headerStyle}>
                        <div className="_5resNameRow">
                            <Utensils className="_5resIcon" />
                            <div style={amountStyle}>{nextDestination.name}</div>
                        </div>
                        <CornerUpRight className="_5desIcon" />
                    </div>
                    <hr/>
                    <div style={{fontSize:"20px",fontWeight:"600"} }>
                        {nextDestination.address}
                    </div>
                    </div>
                </div>
                <div className="RiderGetOrderconfirmButton">
                {destinationReached }
                </div>
            </>
    );
} 