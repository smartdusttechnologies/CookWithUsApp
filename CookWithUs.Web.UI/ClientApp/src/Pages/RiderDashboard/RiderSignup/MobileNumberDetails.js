import React, {useState } from "react";
import "./RiderSignup.css";
import { SendOTPEmail, OTPAuthenticate } from "../../../services/riderServices";

export default function MobileNumberDetails({ mobile, setMobileNumberDetailsStep, setOtpDetailsStep, setMobile, inputType, setInputType }) {
    const [enterNumber, setEnterNumber] = useState(mobile);    
    const [errorMessage, setErrorMessage] = useState("");
    const [authenticationRole, setAuthenticationRole] = useState(null);
    const [lableText, setLabelText] = useState('Enter Mobile Number Or Email ID');
    const currentDateTime = new Date();
    const clearError = () => {
        setErrorMessage("");
    }
    function isValidEmailAddress(address) {
        return !!address.match(/.+@.+/);
    }
    const handleMobileNextClick = (event) => {
        event.preventDefault();
        var validate = true;
        clearError();
        if (!enterNumber.trim()) {
            validate = false;
            if (inputType === 'email') {
                if (!isValidEmailAddress(enterNumber)) {
                    setErrorMessage("Invalid Email");
                }
            }
            else if (inputType === 'text') {
                setErrorMessage("Please Enter Email or Phone");
            }
        }
        if (validate) {
            if (inputType === 'email') {
                setAuthenticationRole('Email');

                const otpDetails = {
                    ID: 0,
                    Type: "Email",
                    Details: enterNumber,
                    OTP: "000000",
                    DateTime: currentDateTime.toLocaleString(),
                    Role: "Rider"
                }
                OTPAuthenticate(otpDetails);
            }
            else {
                setAuthenticationRole('Mobile');
            }
            setMobile(enterNumber);
            setMobileNumberDetailsStep(false);
            setOtpDetailsStep(true);
        }

    }
    const handleChange = (e) => {
        const value = e.target.value;
        // Determine if the user is entering a mobile number or an email
        if (value === '') {
            setInputType('text'); // Set input type to 'text' if the input is empty
            setLabelText('Enter Mobile Number Or Email ID');
        } else if (/^\d*$/.test(value)) {
            setInputType('number'); // Set input type to 'number' if the input is digits only
            setLabelText('Enter Mobile Number');
        } else {
            setInputType('email'); // Set input type to 'email' if the input contains non-digit characters
            setLabelText('Enter Email ID');
        }
        setEnterNumber(value); // Update the input value
    };

    return (
        <>
            <form onSubmit={handleMobileNextClick}>
                <div className="_7mobileNumber" style={{flexDirection:"column"} }>
                    <div className="inputContainer">
                        <input id="mobile" value={enterNumber} className="_7mobileInput inputfield" type={inputType} onChange={handleChange} required />
                        <label htmlFor="mobile" class="labelField">{lableText}</label>
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
