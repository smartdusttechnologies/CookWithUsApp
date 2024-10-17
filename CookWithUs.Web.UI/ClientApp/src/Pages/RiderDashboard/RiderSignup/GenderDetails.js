import React, { useState } from "react";
import "./RiderSignup.css";
export default function GenderDetails({ setGenderDetailsStep,setBankDetailsStep,setGender,gender }) {
    const [enterGenderType, setEnterGenderType] = useState(gender??"Male");
    const handleMobileNextClick = (event) => {
        event.preventDefault();
        setGender(enterGenderType);
        setGenderDetailsStep(false);
        setBankDetailsStep(true);
    }
    const handleChange = (event) => {
        setEnterGenderType(event.target.value);
    };
    return (
        <>
            <form onSubmit={handleMobileNextClick}>
                <div className="_7mobileNumber">
                    <div className="inputContainer">
                        <label htmlFor="selectBox" style={{ fontWeight: "600" }}>Select Gender</label>
                        <select className="_7mobileInput" style={{ height: "40px" }} id="selectBox" value={enterGenderType} onChange={handleChange} required>
                            <option value="" disabled>Select Gender Type</option>
                            <option value="Male">Male</option>
                            <option value="FeMale">Female</option>
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