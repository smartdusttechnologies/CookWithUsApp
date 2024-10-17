import React, { useState } from "react";
import "./RiderSignup.css";

export default function BankDetails({ setBankDetailsStep,setPanCardStep, setBankName, bankName,setAccountNumber,accountNumber,setIfscCode , ifscCode }) {
    const [enterBankName, setEnterBankName] = useState(bankName);
    const [enterAccountNumber, setEnterAccountNumber] = useState(accountNumber);
    const [enterIfscCode, setEnterIfscCode] = useState(ifscCode);
    const handleMobileNextClick = (event) => {
        event.preventDefault();
        setBankName(enterBankName);
        setAccountNumber(enterAccountNumber);
        setIfscCode(enterIfscCode);
        setBankDetailsStep(false);
        setPanCardStep(true);
    }
    const handleBankNameChange = (event) => {
        setEnterBankName(event.target.value);
    };

    const handleAccountNumberChange = (event) => {
        setEnterAccountNumber(event.target.value);
    };

    const handleIfscCodeChange = (event) => {
        setEnterIfscCode(event.target.value);
    };
    return (
        <>
            <form onSubmit={handleMobileNextClick}>
                <div className="_7mobileNumber" style={{ flexDirection: "column" }}>
                    <div className="inputContainer">
                        <input id="bankName" value={enterBankName} className="_7mobileInput inputfield" type="text" onChange={handleBankNameChange} required />
                        <label htmlFor="mobile" class="labelField">Enter Bank Name</label>
                    </div>
                    <div className="inputContainer">
                        <input id="accountNumber" value={enterAccountNumber} className="_7mobileInput inputfield" type="number" onChange={handleAccountNumberChange} required />
                        <label htmlFor="mobile" class="labelField">Enter Account Number</label>
                    </div>
                    <div className="inputContainer">
                        <input id="ifscCode" value={enterIfscCode} className="_7mobileInput inputfield" type="text" onChange={handleIfscCodeChange} required />
                        <label htmlFor="mobile" class="labelField">Enter Ifsc Code</label>
                    </div>                                                            
                </div>
                <button type="submit" className="_6RiderLogin">
                    NEXT
                </button>
            </form>
        </>
    );
}