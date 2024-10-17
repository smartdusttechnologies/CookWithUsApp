import React, { useState } from "react";
import RiderSignupTopBar from "../../Components/RiderUi/RiderSignupTopBar";
import "./RiderContinueWithLogin.css";
import LoginDetails from "./RiderLogin/LoginDetails";

export default function RiderContinueWithLogin({ continueWith, setContinueWith }) {
    const [loginDetailsStep, setLoginDetailsStep] = useState(false);
    const allStepsFalse = !loginDetailsStep;
    const [inputType, setInputType] = useState('text'); // Default input type
    const [mobile, setMobile] = useState();
    const [otpDetailsStep, setOtpDetailsStep] = useState(false);
    const [password, setPassword] = useState(null);

    return (
        <>
            {allStepsFalse && (
                <>
                    <RiderSignupTopBar continueWith={continueWith} backClickEvent={() => setContinueWith(null)}  stepName={"LOGIN DETAILS"} />
                    <div className="_6RiderLoginPage">
                        <div className="_6RiderLoginButton">
                            <div onClick={() => setLoginDetailsStep(true)} className="_6RiderLogin">
                                NEXT
                            </div>
                        </div>
                    </div>
                </>
            )}
            {loginDetailsStep &&
                <>
                <RiderSignupTopBar continueWith={continueWith} backClickEvent={() => setLoginDetailsStep(false)}  stepName={"ENTER LOGIN DETAILS"} />
                <LoginDetails mobile={mobile} setLoginDetailsStep={setLoginDetailsStep} setOtpDetailsStep={setOtpDetailsStep} setMobile={setMobile} inputType={inputType} setInputType={setInputType} password={password} setPassword={setPassword } />
                </>
            }
        </>
    );
}