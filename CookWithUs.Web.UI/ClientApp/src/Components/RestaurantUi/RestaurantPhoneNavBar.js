import React from "react";
import "./RestaurantPhoneNavBar.css";
import { BarChart, CircleEllipsis, BookUp, FileBarChart2, Home, ScanLine, Search } from 'lucide-react';
export default function RestaurantPhoneNavBar({ isActive, setIsActive ,activeTab , setActiveTab }) {
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
                            KFCRestaurant,Sharma Para
                        </div>
                        <div className="_2closestime">
                        Closes at 10:45 pm,Today
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