import React, { useState, useEffect } from "react";
import { X,Bike,Clock } from 'lucide-react';
import GoogleMapComponent from "../../Components/GoogleMapComponent/GoogleMapComponent ";
import RiderLiveTask from "./RiderLiveTask";
import { RiderStatus } from "../../services/riderServices";

export default function RiderOrders({ orders, restaurantDetails }) {
    useEffect(() => {
        // Hide elements with class name "ridertopbar"
        const elements = document.getElementsByClassName('ridertopbar');
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.display = 'none';
        }
    }, []);
    const handleConfirmOrder = () => {
        const details = {
            ID: orders.id,
            OrderID: 0,
            RiderID: 0,
            Price: 0,
            OrderStatus: 'Confirm'
        };
        RiderStatus(details).then(response => {
            setConfirmOrder(true);
        })
            .catch(error => {
                console.error("An error occurred while adding address:", error);
            });
    }
    const [confirmOrder, setConfirmOrder] = useState(false);
    const origin = { lat: 37.7749, lng: -122.4194 }; // Example: San Francisco
    const destination = { lat: 34.0522, lng: -118.2437 }; // Example: Los Angeles
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
        marginBottom:'10px',
    };
    const RiderOrderCss = {
        top: 0,
        width: '100%',
        height:'100%'
    }
    return (        
            confirmOrder ? (
            <>
                <RiderLiveTask restaurantDetails={restaurantDetails} />
            </>
            ) : (
            <>
                <div style={RiderOrderCss}>
                    <div ><GoogleMapComponent style={{ width: '100%', height: '60vh' }}
                        origin={origin}
                        destination={destination}
                        zoom={7} // Adjust the zoom level as needed
                    /></div>
                    <div className="reject">
                        <div className="reject-order">
                            <X /> <span>REJECT</span>
                        </div>
                    </div>
                    <div style={cardStyle}>
                        <div style={headerStyle}>
                            <div>
                                <div style={earningsTextStyle}>Total earning</div>
                                <div style={amountStyle}>₹{orders.price}</div>
                            </div>
                            <div style={pickFoodStyle}>PICK FOOD</div>
                        </div>
                        <div style={detailStyle}>
                            <Bike size={20} /> 4.06 km
                        </div>
                        <div style={detailStyle}>
                            <Clock size={20} /> 13 mins to deliver
                        </div>
                    </div>
                </div>
                    <div onClick={ handleConfirmOrder } className="RiderGetOrderconfirmButton">
                    CONFIRM ORDER
                </div>
            </>
            )       
    );
} 