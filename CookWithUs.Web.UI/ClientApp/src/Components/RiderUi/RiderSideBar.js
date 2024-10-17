import React, { useEffect, useState, useRef,useContext } from "react";
import { RiderGetById, RiderSetStatus } from "../../services/riderServices";
import "./RiderSideBar.css";
import { Wallet, CircleGauge, HandCoins, User, Database, History, MonitorPlay, Mail, ChevronRight, Power } from 'lucide-react';
import AuthContext from "../../Pages/AuthProvider";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
export default function RiderSideBar({ setRiderSideBar, setRiderIsActive, riderIsActive }) {  
    const navigate = useNavigate(); // Use useNavigate hook
    const [riderDetails, setRiderDetails] = useState([]);
    const { auth, setAuth, logOut } = useContext(AuthContext);
    const menuRef = useRef();
    const setToggleStatus = () => {
        let RiderStatus;
        if (riderIsActive) {
            RiderStatus = '0';
        } else {
            RiderStatus = '1';
        }
        const Details = {
            OrderId: riderDetails.id,
            Status: RiderStatus,
        };
        RiderSetStatus(Details)
            .then(response => {
                getDetailsOfRider();
            })
            .catch(error => {
                console.error("An error occurred while adding address:", error);
            });
    };
    const getDetailsOfRider = () => {
        if (auth.isAuthenticated) {
            const token = localStorage.getItem('jwtToken');
            const decodedToken = jwtDecode(token);
            const username = decodedToken.sub;            
            const RiderId = decodedToken.UserId;
            RiderGetById(RiderId)
                .then(response => {
                    setRiderDetails(response.data);
                })
                .catch(error => {
                    console.error("An error occurred while adding address:", error);
                });
        }
    }
    useEffect(() => {
        getDetailsOfRider();
    }, []);
    useEffect(() => {
        if (riderDetails && riderDetails.riderIsActive === 1) {
            setRiderIsActive(true);
        } else {
            setRiderIsActive(false);
        }
    }, [riderDetails]);

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setRiderSideBar(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleClick = () => {
        navigate('/rider/profile'); // Redirect to the specified URL
    };

    return (       
        <div ref={menuRef}  className="riderSideBar">
            <div className="sidebarTop">
                <div className="userProfileTab" onClick={handleClick}>
                    <div className="userDetailsRow">
                        <div className="userInfo">
                            <div className="userIcon"><User/></div>
                            <div className="userName">{riderDetails.firstName} {riderDetails.lastName}</div>
                        </div>
                        <div className="rightArrow"><ChevronRight /></div>
                    </div>
                </div>
                <hr />
                <div className="activeRow">
                    <div className="dutyStatus">Duty Status</div>
                    <div className="toggle-switch">
                        <input type="checkbox" id="toggle" className="toggle-input" checked={riderIsActive} onChange={() => setToggleStatus()} />
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
                <div onClick={ logOut} className="riderNav">
                    <div className="riderNavsIcon"><Power /></div>
                    <div className="riderNavsName">Log Out</div>
                </div>
            </div>
            </div>        
    );
}