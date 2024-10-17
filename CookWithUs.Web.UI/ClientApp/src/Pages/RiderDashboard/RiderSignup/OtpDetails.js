import React, { useState } from "react";
import { MatchOTP,OTPAuthenticate } from "../../../services/riderServices";

export default function OtpDetails({ mobile, setOtpDetailsStep, setPasswordDetailsStep, inputType, setInputType }) {
    const [enterOtp, setEnterOtp] = useState(['', '', '', '', '', '']);
    const [errorForOTP, setErrorForOTP] = useState(null);
    const currentDateTime = new Date();
    const handleMobileNextClick = (event) => {
        event.preventDefault();
        const enteredOtp = enterOtp.join(''); // Combine the otp array into a single string
        const otpDetails = {
            ID: 0,
            Type: "Email",
            Details: mobile,
            OTP: enteredOtp,
            DateTime: currentDateTime.toLocaleString(),
            Role: "Rider"
        }
        MatchOTP(otpDetails).then(response => {
            if (response.data.isSuccessful === false) {
                setErrorForOTP(response.data.message[0].reason);
            }
            else {
                setOtpDetailsStep(false);
                setPasswordDetailsStep(true);
            }
        })
            .catch(error => {
                console.error("An error occurred while adding Signup:", error);
            });

    }
    const handleOtpChange = (e, index) => {
        const value = e.target.value;
        if (/^\d$/.test(value) || value === '') { // Ensure only one digit is entered
            const newOtp = [...enterOtp];
            newOtp[index] = value;
            setEnterOtp(newOtp);
            // Move focus to the next input field
            if (value && index < 5) {
                document.getElementById(`otp-${index + 1}`).focus();
            }
        }
    };
    const handleKeyDown = (e, index) => {
        // Move focus to the previous input field on backspace
        if (e.key === 'Backspace' && !enterOtp[index] && index > 0) {
            document.getElementById(`otp-${index - 1}`).focus();
        }
    };
    const handleResendOTP = () => {
        if (inputType === 'email') {
            const otpDetails = {
                ID: 0,
                Type: "Email",
                Details: mobile,
                OTP: "000000",
                DateTime: currentDateTime.toLocaleString(),
                Role: "Rider"
            }
            OTPAuthenticate(otpDetails);
        }
        else {

        }
    }

    return (
        <>
            <form onSubmit={handleMobileNextClick}>
                <div className="_7mobileNumber" style={{ flexDirection: "column" }}>                    
                    <div className="inputContainer">
                        <label htmlFor="selectBox" style={{ fontWeight: "600",fontSize:"20px" }}>Enter OTP Here</label>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%',padding:'10px' }}>
                            {enterOtp.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`otp-${index}`}
                                    type="text"
                                    className="form-control"
                                    value={digit}
                                    onChange={(e) => handleOtpChange(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    maxLength="1"
                                    style={{width: '40px',textAlign: 'center',height: '40px',borderRadius: '10px',fontSize: '20px',fontWeight: 600, }}
                                />
                            ))}                            
                        </div>
                        <div onClick={handleResendOTP} style={{cursor:"pointer", display:"flex",justifyContent:"end", color: "blue", fontWeight: "500", fontSize: "15px" }}>Resend OTP</div>
                        {errorForOTP && (<div style={{ color: "red", fontWeight: "500", fontSize: "15px" }}>{errorForOTP}</div>) }
                    </div>
                </div>
                <button type="submit" className="_6RiderLogin">
                    NEXT
                </button>
            </form>
        </>
    );
}