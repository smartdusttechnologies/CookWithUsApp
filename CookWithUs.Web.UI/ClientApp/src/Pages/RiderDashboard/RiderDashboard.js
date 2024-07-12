import React, { useState,useEffect } from "react";
import RiderShiftDetails from "../../Components/RiderUi/RiderShiftDetails";
import RiderEarningsCard from "../../Components/RiderUi/RiderEarningCard";
import RiderSearchingCard from "../../Components/RiderUi/RiderSearchingCard";
import { FindOrder,GetOrderDetailsById } from "../../services/riderServices";
export default function RiderDashboard({ riderSideBar, setRiderSideBar }) {
    const [orderDetails, setOrderDetails] = useState([]);
    const [startDuty, setStartDuty] = useState(false);
    const [orders, setOrders] = useState([]); // State to hold fetched data
    const riderId = 1; // Replace with the actual ID you need to pass

    const fetchOrders = async () => {
        try {
            const response = await FindOrder(riderId);
            setOrders(response.data); // Assuming response.data contains the orders
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };
    
    //useEffect(() => {
    //    GetOrderDetailsById(1010)
    //        .then(response => {
    //            setOrderDetails(response.data);
    //        })
    //        .catch(error => {
    //            console.error("An error occurred while adding address:", error);
    //        });
    //}, [orders]);
    useEffect(() => {
        //if (startDuty) {
        //    // Call fetchOrders immediately
           fetchOrders();
        //}
    }, [startDuty]);
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
    );
} 