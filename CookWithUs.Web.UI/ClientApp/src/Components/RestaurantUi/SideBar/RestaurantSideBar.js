import * as React from "react";
import { useState } from "react"; // Import useState hook
import "../RestaurantUi.css";
import { PackageCheck, CircleHelp, School, ShoppingCart, BarChart3, Utensils } from 'lucide-react';

export default function RestaurantSideBar({ setActiveTab, activeTab } ) {

    setActiveTab("ORDERS");

    return (
        <div className="sidebar">
            <div className="logo">Cook With Us</div>
            <nav>
                <ul>
                    <li>
                        <a href="/Restaurant/Order"  >
                            <div className="sidenav">
                                <i><PackageCheck className={activeTab === "ORDERS" ? "active" : ""} style={{ padding: '6px', border: '1px solid white', borderRadius: '100%', height: '40px', width: 'auto' }} /></i>
                                <span className={activeTab === "ORDERS" ? "active-text" : ""}>ORDERS</span>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="/Restaurant/Menu"  >
                            <div className="sidenav">
                                <i><Utensils className={activeTab === "MENU" ? "active" : ""} style={{ padding: '6px', border: '1px solid white', borderRadius: '100%', height: '40px', width: 'auto' }} /></i>
                                <span className={activeTab === "MENU" ? "active-text" : ""}>MENU</span>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="/Restaurant/Metrics"  >
                            <div className="sidenav">
                                <i><BarChart3 className={activeTab === "METRICS" ? "active" : ""} style={{ padding: '6px', border: '1px solid white', borderRadius: '100%', height: '40px', width: 'auto' }} /></i>
                                <span className={activeTab === "METRICS" ? "active-text" : ""}>METRICS</span>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="/Restaurant/Staples"  >
                            <div className="sidenav">
                                <i><ShoppingCart className={activeTab === "STAPLES" ? "active" : ""} style={{ padding: '6px', border: '1px solid white', borderRadius: '100%', height: '40px', width: 'auto' }} /></i>
                                <span className={activeTab === "STAPLES" ? "active-text" : ""}>STAPLES PLUS</span>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="/Restaurant/Help"  >
                            <div className="sidenav">
                                <i><CircleHelp className={activeTab === "HELP" ? "active" : ""} style={{ padding: '6px', border: '1px solid white', borderRadius: '100%', height: '40px', width: 'auto' }} /></i>
                                <span className={activeTab === "HELP" ? "active-text" : ""}>HELP</span>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="/Restaurant/Profile"  >
                            <div className="sidenav">
                                <i><School className={activeTab === "PROFILE" ? "active" : ""} style={{ padding: '6px', border: '1px solid white', borderRadius: '100%', height: '40px', width: 'auto' }} /></i>
                                <span>PROFILE</span>
                            </div>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
