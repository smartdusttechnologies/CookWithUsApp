import React, { useState,useEffect } from "react";
import "./RiderSignup.css";
export default function UploadPic({ setUploadPicStep,setImage ,image,handleSubmit }) {
    const [uploadPic, setUploadPic] = useState(image);
    const handleMobileNextClick = (event) => {
        event.preventDefault();
        /*setImage(uploadPic);*/
        setImage(uploadPic);
    }
    useEffect(() => {
        if (image === "uploadPic") {
            setUploadPicStep(false);
            handleSubmit();
        }
    }, [image]);
    const handleChange = (event) => {
        const file = event.target.files[0]; // Get the selected file

        if (file) {
            const reader = new FileReader(); // Create FileReader object

            reader.onloadend = () => {
                if (reader.result) {
                    setUploadPic(reader.result); // Set the base64 image data
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
                <div className="_7mobileNumber">
                    <div className="inputContainer">
                        <label htmlFor="Image" style={{ fontWeight: "600" }}>Upload Image</label>
                        <input id="Image" className="_7mobileInput" type="file" onChange={handleChange} required />
                    </div>
                    
                </div>
                <button type="submit" className="_6RiderLogin">
                    NEXT
                </button>
            </form>
        </>
    );
}