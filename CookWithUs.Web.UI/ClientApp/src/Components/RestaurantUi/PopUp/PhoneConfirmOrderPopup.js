import React, {useState } from "react";
import "./PhoneConfirmOrderPopup.css";
import { ArrowLeft } from 'lucide-react';
import { setOrderStatus } from "../../../services/restaurantServices";
import OrderCountDown from "./OrderCountDown";
export default function PhoneConfirmOrderPopup({ setCountdown, foodStatus, setOpenPhoneConfirmOrderPopup, eachOrderDetails }) {
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
            setOpenPhoneConfirmOrderPopup(false);
        })
            .catch(error => {
                console.error("An error occurred while adding address:", error);
            });
    }
    return (
        <>
            <div className="PhoneConfirnOrderPopupDashboard">
                <div className="_3confirmOrderHeader">
                    <div className="_3confirmOrderHeaderLeftSide">
                        <span><ArrowLeft onClick={() => setOpenPhoneConfirmOrderPopup(false)} /></span>
                        <div style={{marginLeft:"10px"} }>
                            <div className="_3idName">
                                #CWU-CWU-{eachOrderDetails.id}
                            </div>
                            <div className="_3TimePrice">
                                06:19 PM| 2 Items for ₹105.01
                            </div>
                        </div>
                    </div>
                    <div className="_3confirmOrderHeaderRightSide">
                        HELP
                    </div>
                </div>
                <div className="bill-summary">
                    {eachOrderDetails.products.map((item, itemndex) => (
                        <div className="item">
                            <div className="item-details">
                                <div className="item-name">Egg Roll</div>
                                <div className="item-quantity">x {item.quantity}</div>
                            </div>
                            <div className="item-price">₹{item.price}</div>
                            <div className="item-category">{item.name}</div>
                        </div>
                    ))}
                    <div className="bill-total">
                        <div>Bill Total</div>
                        <div>₹105.01</div>
                    </div>

                    <div className="summary-details">
                        <div className="summary-item">
                            <div>Item total</div>
                            <div>2 items</div>
                            <div>₹220.00</div>
                        </div>
                        <div className="summary-item">
                            <div>Packing charges</div>
                            <div>₹0.00</div>
                        </div>
                        <div className="summary-item">
                            <div>GST</div>
                            <div>₹0.00</div>
                        </div>
                        <div className="summary-item">
                            <div>Discount</div>
                            <div>-₹119.99</div>
                        </div>
                    </div>

                    <div className="discount-description">
                        <div>Discount Description:</div>
                        <div>• 60% off</div>
                    </div>
                </div>
                <div className="_3confirmOrderButton ">
                    <div onClick={() => setOpenPhoneConfirmOrderPopup(false)} className="_3cancleButton _3cnforder">
                        MARK OUT OF STOCK
                    </div>
                    <div onClick={() => setOpenCountDown(true)} className="_3confirmButton _3cnforder">
                        CONFIRM
                    </div>
                </div>
            </div>
            {openOrderCountDown && <OrderCountDown   handleConfirm={handleConfirm} eachOrderDetails={eachOrderDetails} setOpenCountDown={setOpenCountDown} setCountdown={setCountdown} /> }
        </>
    );
}