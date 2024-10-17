import React, { useState, useEffect } from "react";
import { ArrowLeft } from 'lucide-react';
import { setOrderStatus } from "../../../services/restaurantServices";
import "./ConfirmOrderPopup.css";
import OrderCountDown from "./OrderCountDown";
import { RiderDetail, AssignRiderOrder, SendOrderRequest } from "../../../services/riderServices";
import * as signalR from '@microsoft/signalr';

const ConfirmOrderPopup = ({ setCountdown, setOpenConfirmOrderPopup, eachOrderDetails, foodStatus }) => {
    const [openOrderCountDown, setOpenCountDown] = useState(false);
    const [allRiderDetails, setAllRiderDetails] = useState([]);
    const [currentOrderId, setCurrentOrderId] = useState();

    const handleConfirm = async (item, prepareTime, acceptOrderTime) => {
        setCurrentOrderId(item.id);
        const orderId = item.id;
        const status = foodStatus;
        const details = {
            OrderId: orderId,
            Status: status,
            PrepareTime: prepareTime,
            AcceptOrderTime: acceptOrderTime
        };

        try {
            await setOrderStatus(details);
            setOpenConfirmOrderPopup(false);

            const response = await RiderDetail(25.582265202100192, 85.043776397707632);
            setAllRiderDetails(response.data);

            if (response.data && response.data[0] && response.data[0].id) {
                const details = {
                    ID: 0,
                    OrderID: orderId,
                    RiderID: 0,
                    Price: 55,
                    OrderStatus: 'Pending'
                };
                await AssignRiderOrder(details);

                const riderDetails = {
                    RiderIds: response.data.map(rider => rider.id),
                    OrderId: orderId
                };
                await SendOrderRequest(riderDetails);

                const connection = await ConnectionBuild();
                await connection.start();
                console.log('Connected to the hub.');
                await addUserInRoom(connection, orderId);
                await checkUsersInRiderRoom(connection, orderId);
            } else {
                console.error('Invalid data or missing rider ID.');
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    useEffect(() => {
        if (allRiderDetails.length > 0) {
            const riderDetails = {
                RiderIds: allRiderDetails.map(rider => rider.id),
                OrderId: currentOrderId
            };

            SendOrderRequest(riderDetails).catch(error => {
                console.error("Error sending order request:", error);
            });
        }
    }, [allRiderDetails, currentOrderId]);

    const ConnectionBuild = async () => {
        try {
            const connectionBuild = new signalR.HubConnectionBuilder()
                .withUrl('/location', {
                    skipNegotiation: true,
                    transport: signalR.HttpTransportType.WebSockets
                })
                .build();

            await connectionBuild.start();
            console.log("Connection established:", connectionBuild);
            return connectionBuild;
        } catch (e) {
            console.error("Error establishing connection:", e);
            throw e;
        }
    };

    const addUserInRoom = async (connection, orderId) => {
        try {
            for (const rider of allRiderDetails) {
                await connection.invoke("JoinRiderRoom", orderId, "Rider", rider.id);
                console.log("Rider Join This Room:", orderId, "Rider ID:", rider.id);
            }
        } catch (error) {
            console.error("Error notifying the specific User:", error);
        }
    };

    const checkUsersInRiderRoom = async (connection, orderId) => {
        try {
            const users = await connection.invoke("GetUsersInRiderRoom", orderId);
            console.log(`Users in Rider room for order ${orderId}:`, users);
        } catch (error) {
            console.error("Error getting users in Rider room:", error);
        }
    };

    return (
        <>
            <div className="confirmSidebar modalOpen">
                <div className="topHeading"><ArrowLeft onClick={() => setOpenConfirmOrderPopup(false)} /><div style={{ fontWeight: '500', fontSize: '20px', margin: '0 5px' }}>Confirm Order </div></div>
                <div style={{ overflowX: 'hidden', height: '70vh' }}>
                    <div className="itemDetailss">
                        <h2>Order ID : CWU-{eachOrderDetails.id}</h2>
                        <hr />
                        <h4 style={{ display: 'flex', justifyContent: 'center' }}>ITEMS</h4>
                        <hr />
                        {eachOrderDetails.products.map((item, itemndex) => (
                            <React.Fragment key={itemndex}>
                                <div className='eachItem'>
                                    <div className="item-info"><div className="item-info-title">Item Name </div><div className="item-info-des"><span style={{ margin: '0 20px' }} > :</span> {item.name}</div></div>
                                    <div className="item-info"><div className="item-info-title">Quantity </div><div className="item-info-des"><span style={{ margin: '0 20px' }} >:</span> {item.quantity}</div></div>
                                    <div className="item-info"><div className="item-info-title">Price </div><div className="item-info-des"><span style={{ margin: '0 20px' }} >:</span> ₹{item.price}</div></div>
                                    <div className="item-info"><div className="item-info-title">GST Price </div><div className="item-info-des"><span style={{ margin: '0 20px' }} >:</span> ₹20</div></div>
                                    <div className="item-info"><div className="item-info-title">Packaging Price </div><div className="item-info-des"><span style={{ margin: '0 20px' }} >:</span> ₹20</div></div>
                                </div>
                                <hr />
                            </React.Fragment>
                        ))}
                    </div>
                    <h4 style={{ margin: '5px 20px' }}>Total Price : ₹400</h4>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px', backgroundColor: 'white', borderTop: '1px solid lightgrey' }}>
                        <div onClick={() => setOpenConfirmOrderPopup(false)} style={{ margin: '0 10px', border: '2px solid', fontWeight: '500', padding: '5px 10px', cursor: 'pointer' }}>CANCEL</div>
                        <div onClick={() => setOpenCountDown(true)} style={{ margin: '0 10px', backgroundColor: 'rgb(253 164 0)', padding: '5px 10px', color: 'white', fontWeight: '500', cursor: 'pointer' }}>CONFIRM</div>
                    </div>
                </div>
            </div>
            {openOrderCountDown && <OrderCountDown handleConfirm={handleConfirm} eachOrderDetails={eachOrderDetails} setOpenCountDown={setOpenCountDown} setCountdown={setCountdown} />}
        </>
    );
};

export default ConfirmOrderPopup;
