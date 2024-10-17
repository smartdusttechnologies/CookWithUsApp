import React, { useState } from "react";
import "./RiderSignup.css";
export default function VechicleType({ vehicleType , setVechicleTypeStep , setSiftPrefranceStep , setVechicleType }) {
    const [enterVechicleType, setEnterVechicleType] = useState(vehicleType??"Bike");
    const handleMobileNextClick = (event) => {
        event.preventDefault();
        setVechicleType(enterVechicleType);
        setVechicleTypeStep(false);
        setSiftPrefranceStep(true);
    }
    const handleChange = (event) => {
        setEnterVechicleType(event.target.value);
    };
    return (
        <>
            <form onSubmit={handleMobileNextClick}>
                <div className="_7mobileNumber">
                    <div className="inputContainer">
                        <label htmlFor="selectBox" style={{ fontWeight: "600" }}>Select Vehicle</label>
                        <select className="_7mobileInput" style={{ height: "40px" }} id="selectBox" value={enterVechicleType} onChange={handleChange} required>
                            <option value="" disabled>Select Vehicle Type</option>
                            <option value="Bike">Bike</option>
                            <option value="Cycle">Cycle</option>
                        </select>
                    </div>
                </div>
                <button type="submit" className="_6RiderLogin">
                    NEXT
                </button>
            </form>
        </>
    );
}