import React, { useState, useContext } from "react";
import "../RiderSignup/RiderSignup.css";
import { Eye, EyeOff } from 'lucide-react';
import { RiderLogin } from "../../../services/riderServices";
import AuthContext from "../../AuthProvider";



export default function LoginDetails({ mobile, setLoginDetailsStep, setOtpDetailsStep, setMobile, inputType, setInputType,password,setPassword }) {
    const [lableText, setLabelText] = useState('Enter Mobile Number Or Email ID');
    const [enterNumber, setEnterNumber] = useState(mobile);
    const [errorMessage, setErrorMessage] = useState("");
    const [enterCnfPassword, setEnterCnfPassword] = useState("");
    const [cnfInputType, setCnfInputType] = useState(false);
    const { auth, setAuth, notification, setNotification } = useContext(AuthContext);
    const clearError = () => {
        setErrorMessage("");
    }
    const handlePasswordNextClick = (event) => {
        event.preventDefault();
        var validate = true;
        clearError();
        if (!enterNumber.trim()) {
            validate = false;
            setErrorMessage("Please Enter Email or Mobile");
        }
        if (!enterCnfPassword.trim()) {
            validate = false;
            setErrorMessage("Please Enter Password");
        }
        if (validate) {
            setPassword(enterCnfPassword);
            setMobile(enterNumber);
            const loginDetails = {
                UserName : enterNumber ,
                password : enterCnfPassword
            }
            RiderLogin(loginDetails)
                .then((response) => {
                    if (response.data.isSuccessful) {
                        console.log(response?.data.message[0]);
                        const isAuthenticated = response?.data.isSuccessful;

                        // For Success
                        if (isAuthenticated) {
                            const accessToken = response?.data.requestedObject.accessToken;
                            const userName = response?.data.requestedObject.userName;
                            const userId = response?.data.requestedObject.userId;
                            localStorage.setItem("jwtToken", accessToken);
                            setAuth({ accessToken, userName, userId, isAuthenticated });
                            setNotification([...notification, { message: response?.data.message[0], success: isAuthenticated }])
                        }
                    }

            });
            setLoginDetailsStep(false);
        }
    }
    const handleCnfPasswordChange=(event)=>{
        setEnterCnfPassword(event.target.value);
    }
    const toggleCnfPasswordVisibility = () => {
        setCnfInputType(!cnfInputType);
    };
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
            <form onSubmit={handlePasswordNextClick}>
                <div className="_7mobileNumber" style={{ flexDirection: "column" }}>
                    <div className="inputContainer">
                        <div className="inputContainer">
                            <input id="mobile" value={enterNumber} className="_7mobileInput inputfield" type={inputType} onChange={handleChange} required />
                            <label htmlFor="mobile" class="labelField">{lableText}</label>
                            {errorMessage && (<div style={{ color: "red", fontWeight: "500", fontSize: "15px" }}>{errorMessage}</div>)}
                        </div>
                    </div>
                    <div className="inputContainer">
                        <label htmlFor="cnfpassword" class="_7directPassword">Please Enter Your Password</label>
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
