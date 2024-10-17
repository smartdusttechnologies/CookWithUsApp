import React, { useState } from "react";
import "./RiderSignup.css";
export default function DrivingLicence({ setDrivringLicenceStep,setUploadPicStep,setDrivingLicenceFront,drivingLicenceFront ,setDrivingLicenceBack, drivingLicenceBack }) {
    const [enterDrivringLicenceFront, setEnterDrivringLicenceFront] = useState(drivingLicenceFront);
    const [enterDrivringLicenceBack, setEnterDrivringLicenceBack] = useState(drivingLicenceBack);
    const handleMobileNextClick = (event) => {
        event.preventDefault();
        //setDrivingLicenceFront(enterDrivringLicenceFront);
        //setDrivingLicenceBack(enterDrivringLicenceBack);
        setDrivingLicenceFront(enterDrivringLicenceFront);
        setDrivingLicenceBack(enterDrivringLicenceBack);
        setDrivringLicenceStep(false);
        setUploadPicStep(true);
    }
    const handleFrontChange = (event) => {
        const file = event.target.files[0]; // Get the selected file

        if (file) {
            const reader = new FileReader(); // Create FileReader object

            reader.onloadend = () => {
                if (reader.result) {
                    setEnterDrivringLicenceFront(reader.result); // Set the base64 image data
                }
            };

            reader.onerror = (error) => {
                console.error("File reading error:", error); // Handle any errors
            };

            reader.readAsDataURL(file); // Convert the image file to Base64
        }
    };
    const handleBackChange = (event) => {
        const file = event.target.files[0]; // Get the selected file

        if (file) {
            const reader = new FileReader(); // Create FileReader object

            reader.onloadend = () => {
                if (reader.result) {
                    setEnterDrivringLicenceBack(reader.result); // Set the base64 image data
                }
            };

            reader.onerror = (error) => {
                console.error("File reading error:", error); // Handle any errors
            };

            reader.readAsDataURL(file); // Convert the image file to Base64
        }
    };
    return (
        <>
            <form onSubmit={handleMobileNextClick}>
                <div className="_7mobileNumber" style={{ flexDirection: "column" }}>
                    <div className="inputContainer">
                        <label htmlFor="DLFront" style={{ fontWeight: "600" }}>Upload Drivring Licence Front Pic</label>
                        <input id="DLFront" className="_7mobileInput" type="file" onChange={handleFrontChange} required />
                    </div>
                    <div className="inputContainer">
                        <label htmlFor="DLBack" style={{ fontWeight: "600" }}>Upload Drivring Licence Back Pic</label>
                        <input id="DLBack" className="_7mobileInput" type="file" onChange={handleBackChange} required />
                    </div>                                        
                </div>
                <button type="submit" className="_6RiderLogin">
                    NEXT
                </button>
            </form>
        </>
    );
}