import React, { useState,useEffect,useRef } from "react";
import RiderShiftDetails from "../../Components/RiderUi/RiderShiftDetails";
import RiderEarningsCard from "../../Components/RiderUi/RiderEarningCard";
import RiderSearchingCard from "../../Components/RiderUi/RiderSearchingCard";
import { FindOrder,checkRiderOrderDetails, GetOrderDetailsById } from "../../services/riderServices";
import { getRestaurantDetails } from "../../services/restaurantServices";
import RiderOrders from "./RiderOrders";
import RiderLiveTask from "./RiderLiveTask";

const RiderDashboard= ({ riderSideBar, setRiderSideBar }) => {
    const [orderDetails, setOrderDetails] = useState([]);
    const [startDuty, setStartDuty] = useState(false);
    const [restaurantDetails,setRestaurantDetails] = useState([]);
    const [orders, setOrders] = useState([]); // State to hold fetched data
    const riderId = 1; // Replace with the actual ID you need to pass
    const timerId = useRef();
    const [riderDetails, setRiderDetails] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await FindOrder(riderId);
            setOrders(response.data); // Assuming response.data contains the orders
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };
    useEffect(() => {
        timerId.current = setInterval(() => {
            checkRiderOrderDetails(riderId)
                .then(response => {
                    setRiderDetails(response.data);
                })
                .catch(error => {
                    console.error("An error occurred while adding address:", error);
                });
        }, 1000)
        return () => clearInterval(timerId.current);
    }, []);
    useEffect(() => {
        //if (startDuty) {
        // Call fetchOrders immediately
        fetchOrders();
        //}
    }, []);
    
    useEffect(() => {
        if (orders.length > 0) {
            GetOrderDetailsById(orders.orderID)
                .then(response => {
                    setOrderDetails(response.data);
                })
                .catch(error => {
                    console.error("An error occurred while adding address:", error);
                });
        }
    }, [orders]);

    useEffect(() => {
        if (orderDetails.length > 0 && orderDetails[0]?.restaurantId) {
            getRestaurantDetails(orderDetails[0].restaurantId)
                .then(response => {
                    setRestaurantDetails(response.data);
                })
                .catch(error => {
                    console.error("An error occurred while fetching restaurant details:", error);
                });
        }
    }, [orderDetails]);

    //useEffect(() => {
    //    let intervalId;
    //    if (startDuty) {
    //        // Call fetchOrders immediately
    //        fetchOrders();

    //        // Set up the interval to call fetchOrders every 30 seconds
    //        intervalId = setInterval(fetchOrders, 30000);
    //    }

    //    // Clean up the interval when startDuty changes or the component unmounts
    //    return () => {
    //        if (intervalId) {
    //            clearInterval(intervalId);
    //        }
    //    };
    //}, [startDuty]);
    return (
        <>
            {orders.id ? (
                orders.orderStatus === 'Pending' ? (
                    <RiderOrders restaurantDetails={restaurantDetails} orders={orders} />
                ) : orders.orderStatus === 'Confirm' ? (
                        <RiderLiveTask restaurantDetails={restaurantDetails} />
                ) : null
            ) : (
                <div onClick={() => setRiderSideBar(false)}>
                    <RiderShiftDetails />
                    {startDuty ? (
                        <RiderSearchingCard />
                    ) : (
                        <>
                            <RiderEarningsCard enableStartDuty={() => setStartDuty(true)} />
                        </>
                    )}
                </div>
            )}
        </>
    );
}
export default RiderDashboard;