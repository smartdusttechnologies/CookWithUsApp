import React from "react";
import Home from "./Home";
import "./MainHome.css";
import RestaurantDashboard from "../RestaurantUi/Dashboard/RestaurantDashboard";
import { User, Bike, Hotel } from 'lucide-react';
import RiderDashboard from "../RiderDashboard/RiderDashboard";
import PhoneHome from "./PhoneHome";
import PhoneRestaurantDashboard from "../RestaurantUi/Dashboard/PhoneRestaurantDashboard";
const MainHome = ({ isPhone, isActive, role, setRole }) => {
    const containerStyle = {
        display: 'flex',
        flexDirection:'column',
        alignItems: 'center',
        height: '100vh',
        
    };

    const boxStyle = {
        height: '200px',
        width: '300px',
        border: '2px solid white',
        borderRadius: '20px ',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:'center'
    };
    if (role === 'User') {
        return (
            <>
                {isPhone ? (
                    <PhoneHome />
                ) : (
                    <Home />
                )}
            </>
        );
    }
     else if (role === 'Restaurant') {
        return (
            <>
                {isPhone ? (
                    <PhoneRestaurantDashboard isActive={isActive} />
                ) : (
                        <RestaurantDashboard isActive={isActive} />
                )}
                
            </>
        );
    } else if (role === 'Rider') {
            return (
                <RiderDashboard />
            );
    }
    else {
            return (
                <div className="mainDiv">
                    <div style={containerStyle}>
                        <div style={{ fontSize: '30px', margin: '10px' }}>Welcome</div>
                        <div style={{ fontSize: '50px', margin: '10px' }}>Cook With Us</div>
                        <div style={{ display: 'flex', justifyContent: 'space-around', width: '70vw', marginTop: '100px' }}>
                            <div className='options' style={boxStyle}>
                                <User onClick={()=>setRole("User") } style={{ height: '100px', width: '100px' }} />
                                <h1>USER</h1>
                            </div>
                            <div className='options' style={boxStyle}>
                                <Hotel onClick={() => setRole("Restaurant")} style={{ height: '100px', width: '100px' }} />
                                <h1>Restaurant</h1>
                            </div>
                            <div className='options' style={boxStyle}>
                                <Bike onClick={() => setRole("Rider")} style={{ height: '100px', width: '100px' }} />
                                <h1>RIDER</h1>
                            </div>
                        </div>
                    </div>
                </div>
            );
    }
   
}
export default MainHome;