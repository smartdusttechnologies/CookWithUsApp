import React, { useState } from "react";
import { ArrowLeft, CookingPot, Soup, Cookie, Pizza, Plus, Cherry, Salad } from 'lucide-react';
import { setOrderStatus } from "../../../services/restaurantServices";
import "./ConfirmOrderPopup.css";
import OrderCountDown from "./OrderCountDown";
const ConfirmOrderPopup = ({ setCountdown, setOpenConfirmOrderPopup, eachOrderDetails, foodStatus }) => {
    const [openOrderCountDown, setOpenCountDown] = useState(false);
    const handleConfirm = (item, prepareTime, acceptOrderTime) => {
        const orderId = item.id;
        const status = foodStatus;
        const details = {
            OrderId: orderId,
            Status: status,
            PrepareTime: prepareTime,
            AcceptOrderTime: acceptOrderTime
        }
        setOrderStatus(details).then(response => {
            setOpenConfirmOrderPopup(false);
        })
            .catch(error => {
                console.error("An error occurred while adding address:", error);
            });
    }
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
                            <>
                                <div className='eachItem'>
                                    <div className="item-info"><div className="item-info-title">Item Name </div><div className="item-info-des"><span style={{ margin: '0 20px' }} > :</span> {item.name}</div></div>
                                    <div className="item-info"><div className="item-info-title">Quantity </div><div className="item-info-des"><span style={{ margin: '0 20px' }} >:</span> {item.quantity}</div></div>
                                    <div className="item-info"><div className="item-info-title">Price </div><div className="item-info-des"><span style={{ margin: '0 20px' }} >:</span> ₹{item.price}</div></div>
                                    <div className="item-info"><div className="item-info-title">GST Price </div><div className="item-info-des"><span style={{ margin: '0 20px' }} >:</span> ₹20</div></div>
                                    <div className="item-info"><div className="item-info-title">Packaging Price </div><div className="item-info-des"><span style={{ margin: '0 20px' }} >:</span> ₹20</div></div>
                                </div>
                                <hr />
                            </>
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
}
export default ConfirmOrderPopup;