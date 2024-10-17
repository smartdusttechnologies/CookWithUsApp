import React, { useState } from "react";
import "./RiderSignup.css";

export default function Pancard({ setPanCardStep, setDrivringLicenceStep, setPanCard, panCard }) {
    const [uploadPan, setUploadPan] = useState(panCard); // Base64 string

    // Handle the file input change
    const handleChange = (event) => {
        const file = event.target.files[0]; // Get the selected file

        if (file) {
            const reader = new FileReader(); // Create FileReader object

            reader.onloadend = () => {
                if (reader.result) {
                    setUploadPan(reader.result); // Set the base64 image data
                    setPanCard(reader.result);   // Store the base64 string in the state to pass further
                }
            };

            reader.onerror = (error) => {
                console.error("File reading error:", error); // Handle any errors
            };

            reader.readAsDataURL(file); // Convert the image file to Base64
        }
    };

    // Handle the form submission
    const handleMobileNextClick = (event) => {
        event.preventDefault();
        // Go to the next step in the signup flow
        setPanCardStep(false);
        setDrivringLicenceStep(true);
    };

    return (
        <>
            <form onSubmit={handleMobileNextClick}>
                <div className="_7mobileNumber">
                    <div className="inputContainer">
                        <label htmlFor="panCard" style={{ fontWeight: "600" }}>Upload Pan Card</label>
                        <input
                            id="panCard"
                            className="_7mobileInput"
                            type="file"
                            accept="image/*" // Ensure the input accepts only images
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <button type="submit" className="_6RiderLogin">
                    NEXT
                </button>
            </form>
        </>
    );
}
