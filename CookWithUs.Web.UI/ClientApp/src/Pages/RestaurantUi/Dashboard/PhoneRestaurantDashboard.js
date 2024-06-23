import React, { useState, useEffect,useRef } from "react";
import { Hotel, Soup, ShoppingBag, CircleMinus, PowerOff, Search } from 'lucide-react';
import { getOrderByRestaurantID, setOrderStatus } from "../../../services/restaurantServices";
import "./PhoneRestaurantDashboard.css";
import PhoneConfirmOrderPopup from "../../../Components/RestaurantUi/PopUp/PhoneConfirmOrderPopup";
export default function PhoneRestaurantDashboard({ isActive }) {
    const [foodStatus, setFoodStatus] = useState();
    const [allOrder, setAllOrder] = useState([]);
    const [openPhoneConfirmOrderPopup, setOpenPhoneConfirmOrderPopup] = useState(false);
    const [eachOrderDetails, setEachOrderDetails] = useState([]);
    const [dashboardTab, setDashboardTab] = useState(1);
    const [countdown, setCountdown] = useState(0);
    const timerId = useRef();
    useEffect(() => {
        timerId.current = setInterval(() => {
            setCountdown(prev => prev - 1)
        }, 1000)
        return () => clearInterval(timerId.current);
    });
    useEffect(() => {
        if (countdown <= 0) {
            clearInterval(timerId.current);

        }
        localStorage.setItem('countdown', countdown);
    }, [countdown]);
    useEffect(() => {
        if (localStorage.getItem('countdown')) {
            setCountdown(localStorage.getItem('countdown'));
        }
    }, []);

    useEffect(() => {
        const RestaurantId = 1;
        getOrderByRestaurantID(RestaurantId)
            .then(response => {
                setAllOrder(response.data);
            })
            .catch(error => {
                console.error("An error occurred while adding address:", error);
            });
    }, [openPhoneConfirmOrderPopup]);
    useEffect(() => {
        const RestaurantId = 1;
        getOrderByRestaurantID(RestaurantId)
            .then(response => {
                setAllOrder(response.data);
            })
            .catch(error => {
                console.error("An error occurred while adding address:", error);
            });
    }, []);
    const handleOnClickItem = (order, status) => {
        setFoodStatus(status);
        setEachOrderDetails(order);
        setOpenPhoneConfirmOrderPopup(true);
    };
    const handleOnClickReadyItem = (order, foodStatus) => {
        const orderId = order.id;
        const status = foodStatus;
        const details = {
            OrderId: orderId,
            Status: status
        }
        setOrderStatus(details).then(response => {
            const RestaurantId = 1;
            getOrderByRestaurantID(RestaurantId)
                .then(response => {
                    setAllOrder(response.data);
                })
                .catch(error => {
                    console.error("An error occurred while adding address:", error);
                });
        })
            .catch(error => {
                console.error("An error occurred while adding address:", error);
            });
    };
    return (
        <>
            <div className="_3ordersText">
            Orders
            </div>
            <div className="_3ordersTabPhoneRestaurant">
                <div className="_3ordersTabs">
                    <div onClick={() => setDashboardTab(1)} className={`_3ordersTab ${dashboardTab === 1 ? '_3ordersTabActive' : ''}`}>
                        <Hotel/> NEW
                    </div>
                    <div onClick={() => setDashboardTab(2)} className={`_3ordersTab ${dashboardTab === 2 ? '_3ordersTabActive' : ''}`}>
                        <Soup/> PREPARING
                    </div>
                    <div onClick={() => setDashboardTab(3)} className={`_3ordersTab ${dashboardTab === 3 ? '_3ordersTabActive' : ''}`}>
                        <ShoppingBag/>  READY
                    </div>
                    <div onClick={() => setDashboardTab(4)} className={`_3ordersTab ${dashboardTab === 4 ? '_3ordersTabActive' : ''}`}>
                        <CircleMinus/> PAST ORDER
                    </div>
                </div>
            </div>
            {openPhoneConfirmOrderPopup && (
                <PhoneConfirmOrderPopup setCountdown={setCountdown} foodStatus={foodStatus} setOpenPhoneConfirmOrderPopup={setOpenPhoneConfirmOrderPopup} eachOrderDetails={eachOrderDetails} />
            )}
            {isActive ? (
                <div className="_3mainDashboardPhoneRestaurant">
                    {dashboardTab === 1 && (
                        allOrder.filter(order => order.orderStatus === 'Processing').map((order, orderIndex) => (
                            <React.Fragment key={orderIndex}>
                                <div onClick={() => handleOnClickItem(order, 'Preparing')} className="eachOrder">
                                    <h4>CWU-{order.id}</h4>
                                    <div className="eachOrderDetails">
                                        {order.orderDate} | ₹{order.orderPrice}
                                    </div>
                                </div>
                                <hr />
                            </React.Fragment>
                        ))
                    )}

                    {dashboardTab === 2 && (
                        allOrder.filter(order => order.orderStatus === 'Preparing').map((order, orderIndex) => (
                            <React.Fragment key={orderIndex}>
                                <div className="_3preparingItem">
                                    <div className="_3StatusTime">
                                        <div className="_3StatusPreparing">
                                            PREPARNG
                                        </div>
                                        <div className="_3timeText">
                                            <div style={{fontWeight:'500'} }>
                                                Driver arriving in
                                            </div>
                                            <div className="_3timeCount">
                                                <div style={{ fontWeight: '600' }}>{countdown}</div>
                                                <div style={{fontSize:'10px'} }>seconds</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="_3ItemCwuId">
                                        <h4>CWU-{order.id}</h4>
                                    </div>
                                    <div className="_3AddressWithPrice">
                                        <div className="eachOrderDetails">
                                            {order.orderDate} | ₹{order.orderPrice}
                                        </div>
                                    </div>                                    
                                    <div>
                                        <button onClick={() => handleOnClickReadyItem(order, 'Ready')} style={{                                            
                                            padding: '10px',
                                            color: 'green',
                                            borderRadius: '5px',
                                            border:'1px solid' ,
                                            fontWeight: '500',
                                            margin: '20px',
                                            width: '-webkit-fill-available',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            display:'flex'
                                        }}>
                                           FOOD READY
                                        </button>
                                    </div>
                                </div>
                                <hr />
                            </React.Fragment>
                        ))
                    )}

                    {dashboardTab === 3 && (
                        allOrder.filter(order => order.orderStatus === 'Ready').map((order, orderIndex) => (
                            <React.Fragment key={orderIndex}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div onClick={() => handleOnClickItem(order, 'Delivered')} className="eachOrder">
                                        <h4>CWU-{order.id}</h4>
                                        <div className="eachOrderDetails">
                                            {order.orderDate} | ₹{order.orderPrice}
                                        </div>
                                    </div>
                                    <div>
                                        <button onClick={() => handleOnClickReadyItem(order, 'Delivered')} style={{
                                            backgroundColor: 'green',
                                            padding: '10px',
                                            color: 'white',
                                            borderRadius: '5px',
                                            fontWeight: '500',
                                            margin: '20px'
                                        }}>
                                            Delivered
                                        </button>
                                    </div>
                                </div>
                                <hr />
                            </React.Fragment>
                        ))
                    )}

                    {dashboardTab === 4 && (
                        allOrder.filter(order => order.orderStatus === 'Delivered').map((order, orderIndex) => (
                            <React.Fragment key={orderIndex}>
                                <div className="eachOrder">
                                    <h4>CWU-{order.id}</h4>
                                    <div className="eachOrderDetails">
                                        {order.orderDate} | ₹{order.orderPrice}
                                    </div>
                                </div>
                                <hr />
                            </React.Fragment>
                        ))
                    )}
                </div>
            ) : (
                    <div className="_3phoneRestaurantdashboardOff">
                        <div className="_3youOffline">
                            <PowerOff/> You Are Offline
                        </div>
                    </div>
            )}
            
        </>
    );
}