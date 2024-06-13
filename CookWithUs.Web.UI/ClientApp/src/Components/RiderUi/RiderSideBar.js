import React, { useRef} from "react";
import "./RiderSideBar.css";
import { Wallet, CircleGauge, HandCoins, User, Database, History, MonitorPlay, Mail, ChevronRight } from 'lucide-react';
export default function RiderSideBar({ setRiderSideBar }) {  
    const riderSideBarRef = useRef();
    const closeRiderSideBar = (e) => {
        if (riderSideBarRef.current === e.target) {
            setRiderSideBar(false);
        }
    }
    return (
       
            <div ref={riderSideBarRef} onClick={closeRiderSideBar} className="riderSideBar">
            <div className="sidebarTop">
                <div className="userProfileTab">
                    <div className="userDetailsRow">
                        <div className="userInfo">
                                <div className="userIcon"><User/></div>
                            <div className="userName">Mohit Tiwary</div>
                        </div>
                        <div className="rightArrow"><ChevronRight /></div>
                    </div>
                </div>
                <hr />
                <div className="activeRow">
                    <div className="dutyStatus">Duty Status</div>
                    <div className="toggle-switch">
                        <input type="checkbox" id="toggle" className="toggle-input" />
                        <label htmlFor="toggle" className="toggle-label-rider">
                            <span className="toggle-inner"></span>
                            <span className="toggle-switch-button"></span>
                        </label>
                    </div>
                </div>
            </div>
            <div className="AllriderNavs">
                <div className="riderNav">
                        <div className="riderNavsIcon"><Wallet/></div>
                    <div className="riderNavsName">Earnings & Incentives</div>
                </div>
                <div className="riderNav">
                        <div className="riderNavsIcon"><CircleGauge /></div>
                    <div className="riderNavsName">My Performance</div>
                </div>
                <div className="riderNav">
                        <div className="riderNavsIcon"><HandCoins /></div>
                    <div className="riderNavsName">Floating Cash</div>
                </div>
                <div className="riderNav">
                        <div className="riderNavsIcon"><Database /></div>
                    <div className="riderNavsName">Customer Tips</div>
                </div>
                <div className="riderNav">
                        <div className="riderNavsIcon"><History /></div>
                    <div className="riderNavsName">Login History</div>
                </div>
                <div className="riderNav">
                        <div className="riderNavsIcon"><MonitorPlay /></div>
                    <div className="riderNavsName">Ride Guide</div>
                </div>
                <div className="riderNav">
                        <div className="riderNavsIcon"><Mail /></div>
                    <div className="riderNavsName">Message Center</div>
                </div>
            </div>
            </div>
        
    );
}