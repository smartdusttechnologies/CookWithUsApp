import React, { useEffect,useState,useRef} from "react";
import "./RiderSignup.css";
export default function PersonalDetails({ setPersonalDetailsStep,setGenderDetailsStep ,firstName,setFirstName,lastName,setLastName,doorNo,setDoorNo,street,setStreet,city,setCity,pincode,setPincode,landMark,setLandMark }) {
    const [enterFirstName, setEnterFirstName] = useState(firstName);
    const [enterLastName, setEnterLastName] = useState(lastName);
    const [enterDoorNo, setEnterDoorNo] = useState(doorNo);
    const [enterStreet, setEnterStreet] = useState(street);
    const [enterCity, setEnterCity] = useState(city);
    const [enterPincode, setEnterPincode] = useState(pincode);
    const [enterLandMark, setEnterLandMark] = useState(landMark);
    const handleMobileNextClick = (event) => {
        event.preventDefault();
        setFirstName(enterFirstName);
        setLastName(enterLastName);
        setDoorNo(enterDoorNo);
        setStreet(enterStreet);
        setCity(enterCity);
        setPincode(enterPincode);
        setLandMark(enterLandMark);
        setPersonalDetailsStep(false);
        setGenderDetailsStep(true);
    }

    const handleFirstNameChange = (event) => {
        setEnterFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setEnterLastName(event.target.value);
    };

    const handleDoorNoChange = (event) => {
        setEnterDoorNo(event.target.value);
    };

    const handleStreetChange = (event) => {
        setEnterStreet(event.target.value);
    };

    const handleCityChange = (event) => {
        setEnterCity(event.target.value);
    };

    const handlePincodeChange = (event) => {
        setEnterPincode(event.target.value);
    };

    const handleLandMarkChange = (event) => {
        setEnterLandMark(event.target.value);
    };
    return (
        <>
            <form onSubmit={handleMobileNextClick}>
                <div className="_7mobileNumber" style={{ flexDirection: "column" }}>
                    <div className="inputContainer">
                        <input id="firstName" value={enterFirstName} className="_7mobileInput inputfield" type="text" onChange={handleFirstNameChange} required />
                        <label htmlFor="firstName" class="labelField">Enter First Name</label>
                    </div>
                    <div className="inputContainer">
                        <input id="lastName" value={enterLastName} className="_7mobileInput inputfield" type="text" onChange={handleLastNameChange} required />
                        <label htmlFor="mobile" class="labelField">Enter Last Name</label>
                    </div>
                    <div className="inputContainer">
                        <input id="doorNo" value={enterDoorNo} className="_7mobileInput inputfield" type="text" onChange={handleDoorNoChange} required />
                        <label htmlFor="mobile" class="labelField">Enter Door No.</label>
                    </div>
                    <div className="inputContainer">
                        <input id="street" value={enterStreet} className="_7mobileInput inputfield" type="text" onChange={handleStreetChange} required />
                        <label htmlFor="mobile" class="labelField">Enter Street</label>
                    </div>
                    <div className="inputContainer">
                        <input id="city" value={enterCity} className="_7mobileInput inputfield" type="text" onChange={handleCityChange} required />
                        <label htmlFor="mobile" class="labelField">Enter City</label>
                    </div>
                    <div className="inputContainer">
                        <input id="firstPincode" value={enterPincode} className="_7mobileInput inputfield" type="number" onChange={handlePincodeChange} required />
                        <label htmlFor="mobile" class="labelField">Enter Pincode</label>
                    </div>
                    <div className="inputContainer">
                        <input id="landMark" value={enterLandMark} className="_7mobileInput inputfield" type="text" onChange={handleLandMarkChange} required />
                        <label htmlFor="mobile" class="labelField">Enter LandMark</label>
                    </div>                                                                                                                                            
                </div>
                <button type="submit" className="_6RiderLogin">
                    NEXT
                </button>
            </form>
        </>
    );
}