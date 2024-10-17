import React, { useState } from "react";
import "./RiderSignup.css";
import { Eye, EyeOff } from 'lucide-react';

export default function PasswordDetails({ password, setPasswordDetailsStep, setWorkingCityStep, setPassword }) {
    const [enterPassword, setEnterPassword] = useState(password);
    const [enterCnfPassword, setEnterCnfPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [inputType, setInputType] = useState(false);
    const [cnfInputType, setCnfInputType] = useState(false);
    const clearError = () => {
        setErrorMessage("");
    }
    const handlePasswordNextClick = (event) => {
        event.preventDefault();
        var validate = true;
        clearError();
        if (!enterPassword.trim()) {
            validate = false;
            setErrorMessage("Please Enter Password");
        }
        if (!enterCnfPassword.trim()) {
            validate = false;
            setErrorMessage("Please Enter Password");
        }
        if (enterCnfPassword != enterPassword) {
            validate = false;
            setErrorMessage("Password and Confirm Password Not Matched");
        }
        if (validate) {
            setPassword(enterPassword);
            setPasswordDetailsStep(false);
            setWorkingCityStep(true);
        }
    }
    const handlePasswordChange = (event) => {
        setEnterPassword(event.target.value);
    }
    const handleCnfPasswordChange=(event)=>{
        setEnterCnfPassword(event.target.value);
    }
    const togglePasswordVisibility = () => {
        setInputType(!inputType);
    };
    const toggleCnfPasswordVisibility = () => {
        setCnfInputType(!cnfInputType);
    };
    return (
        <>
            <form onSubmit={handlePasswordNextClick}>
                <div className="_7mobileNumber" style={{ flexDirection: "column" }}>
                    <div className="inputContainer">
                        <label htmlFor="password" class="_7directPassword">Please Enter Your Password</label>
                        <div className="_7mobileInput inputfield" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px' }}>
                            <input style={{ width: '90%', border: 'none' }} id="password" value={enterPassword} Type={inputType ? 'text' : 'password'} onChange={handlePasswordChange} required />
                            <div onClick={togglePasswordVisibility}>{inputType ? <EyeOff /> : <Eye />}</div>
                        </div>
                    </div>
                    <div className="inputContainer">
                        <label htmlFor="cnfpassword" class="_7directPassword">Please Enter Confirm Password</label>
                        <div className="_7mobileInput inputfield" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px' }}>
                            <input style={{ width: '90%', border: 'none' }} id="cnfpassword" value={enterCnfPassword} Type={cnfInputType ? 'text' : 'password'} onChange={handleCnfPasswordChange} required />
                            <div onClick={toggleCnfPasswordVisibility}>{cnfInputType ? <EyeOff /> : <Eye />}</div>
                        </div>

                        {errorMessage && (<div style={{ color: "red", fontWeight: "500", fontSize: "15px" }}>{errorMessage}</div>)}
                    </div>
                </div>
                <button type="submit" className="_6RiderLogin">
                    NEXT
                </button>
            </form>
        </>
    );
}
