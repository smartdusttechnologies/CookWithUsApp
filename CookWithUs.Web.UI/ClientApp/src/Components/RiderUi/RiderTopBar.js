import React ,{ useState } from "react";
import "./RiderSideBar.css";
import { Map, Bell, CircleHelp } from 'lucide-react';
export default function RiderTopBar({ setRiderSideBar }) {
    
    return (
        <div >
            <div className="ridertopbar">
                <div className="threeLine" onClick={() => setRiderSideBar(true) } >
                    <div className="lines"></div>
                    <div className="lines"></div>
                    <div className="lines"></div>
                </div>
                <div onClick={() => setRiderSideBar(false)} className="moreOptions">
                    <div className="mapIcon"><Map /></div>
                    <div className="bellIcon"><Bell /></div>
                    <div className="HelpIcon"><CircleHelp /></div>
                </div>
            </div>
        </div>
    );
} 