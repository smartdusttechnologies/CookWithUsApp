import * as React from "react";
import "../RestaurantUi.css";
import { PackageCheck, CircleHelp, School, ShoppingCart, BarChart3, Utensils } from 'lucide-react';
export default function RestaurantSideBar() {

    return (
        <div className="sidebar">
            <div className="logo">Cook With Us</div>
            <nav>
                <ul>
                    <li>
                        <a href="/Restaurant/Order"><div className="sidenav">
                            <i><PackageCheck style={{ padding: '6px', border: '1px solid white', borderRadius: '100%', height: '35px', width: 'auto' }}/></i>
                            <span>ORDERS</span>
                        </div> </a>
                    </li>
                    <li>
                        <a href="/Restaurant/Menu"><div className="sidenav">
                            <i><Utensils style={{padding: '6px', border: '1px solid white', borderRadius: '100%', height: '35px', width: 'auto'}} /></i>
                            <span>MENU</span>
                        </div> </a>
                    </li>
                    <li>
                        <div className="sidenav">
                            <i><BarChart3 style={{padding: '6px', border: '1px solid white', borderRadius: '100%', height: '35px', width: 'auto'}} /></i>
                            <span>METRICS</span>
                        </div>
                    </li>
                    <li>
                        <div className="sidenav">
                            <i><ShoppingCart style={{padding: '6px', border: '1px solid white', borderRadius: '100%', height: '35px', width: 'auto'}} /></i>
                            <span>STAPLES PLUS</span>
                        </div>
                    </li>
                    <li>
                        <div className="sidenav">
                            <i><CircleHelp style={{padding: '6px', border: '1px solid white', borderRadius: '100%', height: '35px', width: 'auto'}} /></i>
                            <span>HELP</span>
                        </div>
                    </li>
                    <li>
                        <div className="sidenav">
                           <i> <School style={{padding: '6px', border: '1px solid white', borderRadius: '100%', height: '35px', width: 'auto'}} /></i>
                            <span>PROFILE</span>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>

    );
}