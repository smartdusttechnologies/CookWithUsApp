import React, { useEffect,useState,useRef} from "react";
import { Hotel, Soup, ShoppingBag, CircleMinus, MoveRight } from 'lucide-react';
import { getOrderByRestaurantID, setOrderStatus } from "../../../services/restaurantServices";
import ConfirmOrderPopup from "../../../Components/RestaurantUi/PopUp/ConfirmOrderPopup";
import Timer from "../../../Components/RestaurantUi/PopUp/Timer";
import * as signalR from '@microsoft/signalr';
const RestaurantDashboard = ({ isActive }) => {
    const [allOrder, setAllOrder] = useState([]);
    const [openConfirmOrderPopup, setOpenConfirmOrderPopup] = useState(false);
    const [eachOrderDetails, setEachOrderDetails] = useState([]);
    const [dashboardTab, setDashboardTab] = useState(1);
    const [foodStatus, setFoodStatus] = useState();
    const [countdown, setCountdown] = useState(0);
    const timerId = useRef();
    useEffect(() => {
        // Get elements by class name
        const sidebar = document.getElementsByClassName('sidebar');
        const topbar = document.getElementsByClassName('topbar');

        // Loop through the elements and set display to 'none'
        for (let i = 0; i < sidebar.length; i++) {
            sidebar[i].style.display = 'block';
        }
        for (let i = 0; i < topbar.length; i++) {
            topbar[i].style.display = 'flex';
        }
    }, []);
    useEffect(() => {
        timerId.current = setInterval(() => {
            const RestaurantId = 1;
            getOrderByRestaurantID(RestaurantId)
                .then(response => {
                    setAllOrder(response.data);
                })
                .catch(error => {
                    console.error("An error occurred while adding address:", error);
                });
        }, 1000)
        return () => clearInterval(timerId.current);
    }, []);
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
    }, []);
    const handleOnClickItem = (order, status) => {
        setFoodStatus(status);
        setEachOrderDetails(order);
        setOpenConfirmOrderPopup(true);
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
    useEffect(() => {
        if (openConfirmOrderPopup) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
        // Clean-up function to remove the class when component unmounts
        return () => {
            document.body.classList.remove('modal-open');
        };
    }, [openConfirmOrderPopup]);
    useEffect(() => {
        const RestaurantId = 1;
        getOrderByRestaurantID(RestaurantId)
            .then(response => {
                setAllOrder(response.data);
            })
            .catch(error => {
                console.error("An error occurred while adding address:", error);
            });
    }, [dashboardTab]);
    const addMinutes = (datetime, minutes) => {
        const date = new Date(datetime);
        date.setMinutes(date.getMinutes() + minutes);
        return date.toISOString();
    };

    return (
        <div
            style={{
                width: "100%",
                margin: "140px 50px"
            }}>
            <div className="topbar2">
                <div className="steps">
                    <div className={`stepButton ${dashboardTab === 1 ? 'activeDashboardTab' : ''}`} onClick={() => setDashboardTab(1)}>
                        <i><Hotel style={{ height: '15px' }} /></i><span>NEW</span>
                    </div>
                    <div className="stepArrow">
                        <MoveRight style={{ height: '15px' }} />
                    </div>
                </div>
                <div  className="steps">
                    <div className={`stepButton ${dashboardTab === 2 ? 'activeDashboardTab' : ''}`} onClick={() => setDashboardTab(2)}>
                        <i><Soup style={{ height: '15px' }} /></i><span>PREPARING</span>
                    </div>
                    <div className="stepArrow">
                        <MoveRight style={{ height: '15px' }} />
                    </div>
                </div>
                <div  className="steps">
                    <div className={`stepButton ${dashboardTab === 3 ? 'activeDashboardTab' : ''}`} onClick={() => setDashboardTab(3)}>
                        <i><ShoppingBag style={{ height: '15px' }} /></i><span>READY</span>
                    </div>
                    <div className="stepArrow">
                        <MoveRight style={{ height: '15px' }} />
                    </div>
                </div>
                <div  className="steps">
                    <div className={`stepButton ${dashboardTab === 4 ? 'activeDashboardTab' : ''}`} onClick={() => setDashboardTab(4)}>
                        <i><CircleMinus style={{ height: '15px' }} /></i><span>PAST ORDERS</span>
                    </div>
                </div>
            </div>
            {openConfirmOrderPopup && (
                <ConfirmOrderPopup setCountdown={setCountdown} foodStatus={foodStatus} setOpenConfirmOrderPopup={setOpenConfirmOrderPopup} eachOrderDetails={eachOrderDetails} />
            ) }
            {isActive ? (
                <div className="orderDashboard" style={{margin:'auto'} }>
                    
                    {dashboardTab === 1 && (
                        <div>
                            {allOrder && Array.isArray(allOrder) ? (
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
                            ) : (
                                <>
                                </>
                            )}
                        </div>
                    )}

                    {dashboardTab === 2 && (
                        allOrder.filter(order => order.orderStatus === 'Preparing').map((order, orderIndex) => (
                            <React.Fragment key={orderIndex}>
                                <div style={{display:'flex',justifyContent:'space-between'} }> 
                                    <div  className="eachOrder centerDiv">
                                        <h4>CWU-{order.id}</h4>
                                        <div className="eachOrderDetails">
                                            {order.orderDate} | ₹{order.orderPrice}
                                        </div>
                                        <div className="_3StatusPreparing" style={{margin:'0 25px'} }>
                                            PREPARNG
                                        </div>
                                    </div>                                    
                                    <div style={{display:'flex'} }>
                                        <div className="_3StatusTime centerDiv">                                            
                                            <div className="_3timeText">
                                                <div className="centerDiv" style={{ fontWeight: '500' }}>
                                                    Driver arriving in
                                                </div>
                                                <div className="_3timeCount">
                                                    <div style={{ fontWeight: '600' }}><Timer handleOnClickReadyItem={handleOnClickReadyItem} order={order} targetDateTime={addMinutes(order.acceptOrderTime, order.prepareTime)} /></div>
                                                    <div style={{ fontSize: '10px' }}>MINS</div>
                                                </div>
                                            </div>
                                        </div>
                                        <button onClick={() => handleOnClickReadyItem(order, 'Ready')} style={{
                                            backgroundColor: 'green',
                                            padding: '10px',
                                            color: 'white',
                                            borderRadius: '5px',
                                            fontWeight: '500',
                                            margin: '20px'
                                        }}>
                                            Ready
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
                                <div onClick={() => handleOnClickItem(order,'Delivered')} className="eachOrder">
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
                                <div  className="eachOrder">
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
                <div className="mainDashboard">
                    <div className="contant">
                        <h1 style={{ color: "red" }}>You Are Offline</h1>
                        <p>Dear Partner, we noticed you have switched OFF your outlet. Please switch it ON to start receiving new orders.</p>
                    </div>
                </div>
            )}
            
           
        </div>);
}
export default RestaurantDashboard;