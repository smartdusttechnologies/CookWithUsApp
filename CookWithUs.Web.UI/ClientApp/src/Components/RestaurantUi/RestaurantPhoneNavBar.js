import React, { useContext,useEffect,useState,useRef } from "react";
import "./RestaurantPhoneNavBar.css";
import { BarChart, CircleEllipsis, BookUp, FileBarChart2, Home, ScanLine, Search } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';
import AuthContext from "../../Pages/AuthProvider";
import { GetRestaurantByEmail } from "../../services/restaurantServices";

export default function RestaurantPhoneNavBar({ isActive, setIsActive, activeTab, setActiveTab }) {
    const { auth, setAuth } = useContext(AuthContext);
    const [restaurantDetails, setRestaurantDetails] = useState('');
    const timerId = useRef();
    const getDetails = () => {
        if (auth.isAuthenticated) {
            const token = localStorage.getItem('jwtToken');
            const decodedToken = jwtDecode(token);
            const username = decodedToken.sub;
            GetRestaurantByEmail(username)
                .then(response => {
                    setRestaurantDetails(response.data);
                })
                .catch(error => {
                    console.error("An error occurred while adding address:", error);
                }
                );
        }
    }
    useEffect(() => {
        getDetails();
    }, []);
    useEffect(() => {
        timerId.current = setInterval(() => {
            getDetails();
        }, 1000)
        return () => clearInterval(timerId.current);
    }, []);
    return (
        <>
            <div>
                <div className="_2PhoneTopBar">
                    <div className="_2leftSide">
                        {isActive ? (
                            <div onClick={ ()=>setIsActive(false)} className="_2ActiveButton">
                            ON
                        </div>
                        ) : (
                                <div onClick={() => setIsActive(true)} className="_2DeActiveButton">
                                    Off
                                </div>
                        )}
                        
                        <div>
                        <div className="_2RestaurantName">
                                {restaurantDetails.restaurantName}
                        </div>
                        <div className="_2closestime">
                                Closes at {restaurantDetails.closingTime }
                            </div>
                        </div>
                    </div>
                    <div className="_2RightSide">
                        <div className="_2RightSideIcon">
                            <ScanLine />
                        </div>
                        <div className="_2RightSideIcon">
                            <Search />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="mainBottomBar">
                    <div className="bottomNav HomeIcon">
                        <div className="restaurantNavIcon">
                            <Home />
                        </div>
                        <div className="restaurantNavText">
                            Orders
                        </div>
                    </div>
                    <a href="/Restaurant/Menu" className="bottomNav InventoryIcon">
                        <div className="restaurantNavIcon">
                            <BookUp />
                        </div>
                        <div className="restaurantNavText">
                            Inventory
                        </div>
                    </a>
                    <div className="bottomNav BusinessIcon">
                        <div className="restaurantNavIcon">
                            <BarChart />
                        </div>
                        <div className="restaurantNavText">
                            Business
                        </div>
                    </div>
                    <div className="bottomNav ReportsIcon">
                        <div className="restaurantNavIcon">
                            <FileBarChart2 />
                        </div>
                        <div className="restaurantNavText">
                            Reports
                        </div>
                    </div>
                    <div className="bottomNav MoreIcon">
                        <div className="restaurantNavIcon">
                            <CircleEllipsis />
                        </div>
                        <div className="restaurantNavText">
                            More
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}