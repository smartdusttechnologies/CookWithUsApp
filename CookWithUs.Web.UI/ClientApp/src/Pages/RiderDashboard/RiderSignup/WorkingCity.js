import React, {useState,useEffect,useRef } from "react";
import "./RiderSignup.css";
export default function WorkingCity({ area,setWorkingCityStep,setVechicleTypeStep,setArea }) {
    const inputWorkingAreaRef = useRef(null);
    const [enterWorkingArea, setEnterWorkingArea] = useState(area ?? "Patna");
    const handleMobileNextClick = (event) => {
        event.preventDefault();
        setArea(enterWorkingArea);
        setVechicleTypeStep(true);
        setWorkingCityStep(false);
    }
    const handleChange = (event) => {
        setEnterWorkingArea(event.target.value);
    };
    return (
        <>
            <form onSubmit={handleMobileNextClick}>
                <div className="_7mobileNumber">
                    <div className="inputContainer">
                        <label htmlFor="selectBox" style={{fontWeight:"600"} }>Select Working City</label>
                        <select className="_7mobileInput" style={{ height: "40px" }} id="selectBox" value={enterWorkingArea} onChange={handleChange} required>
                            <option value="" disabled>Select Working Area</option>
                            <option value="Patna">Patna</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Kota">Kota</option>
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