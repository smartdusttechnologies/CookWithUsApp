import React from "react";
import { Hotel, Soup, ShoppingBag, CircleMinus, MoveRight } from 'lucide-react';
const RestaurantDashboard = ({ isActive } ) => {

    return (
        <div
            style={{
                width: "100%",
                margin: "140px 100px"
            }}>
            <div className="topbar2">
                <div className="steps">
                    <div className="stepButton">
                        <i><Hotel style={{ height: '15px' }} /></i><span>NEW</span>
                    </div>
                    <div className="stepArrow">
                        <MoveRight style={{ height: '15px' }} />
                    </div>
                </div>
                <div className="steps">
                    <div className="stepButton">
                        <i><Soup style={{ height: '15px' }} /></i><span>PREPARING</span>
                    </div>
                    <div className="stepArrow">
                        <MoveRight style={{ height: '15px' }} />
                    </div>
                </div>
                <div className="steps">
                    <div className="stepButton">
                        <i><ShoppingBag style={{ height: '15px' }} /></i><span>READY</span>
                    </div>
                    <div className="stepArrow">
                        <MoveRight style={{ height: '15px' }} />
                    </div>
                </div>
                <div className="steps">
                    <div className="stepButton">
                        <i><CircleMinus style={{ height: '15px' }} /></i><span>PAST ORDERS</span>
                    </div>
                </div>
            </div>
            {isActive ? (
                <div></div>
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