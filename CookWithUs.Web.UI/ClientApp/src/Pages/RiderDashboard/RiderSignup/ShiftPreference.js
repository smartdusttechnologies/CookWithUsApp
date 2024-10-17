import React, { useState} from "react";
import "./RiderSignup.css";
export default function ShiftPreference({ shift,setPersonalDetailsStep,setSiftPrefranceStep, setShift }) {
    const [enterShift, setEnterShift] = useState(shift ??"09:00am-03:00pm");
    const handleMobileNextClick = (event) => {
        event.preventDefault();
        setShift(enterShift);
        setSiftPrefranceStep(false);
        setPersonalDetailsStep(true);
    }
    const handleChange = (event) => {
        setEnterShift(event.target.value);
    };
    return (
        <>
            <form onSubmit={handleMobileNextClick}>
                <div className="_7mobileNumber">
                    <div className="inputContainer">
                        <label htmlFor="selectBox" style={{ fontWeight: "600" }}>Select Timing</label>
                        <select className="_7mobileInput" style={{ height: "40px" }} id="selectBox" value={enterShift} onChange={handleChange} required>
                            <option value="" disabled>Select Shift</option>
                            <option value="09:00am-03:00pm">09:00am to 03:00pm</option>
                            <option value="03:00pm-09:00pm">03:00pm to 09:00pm</option>
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