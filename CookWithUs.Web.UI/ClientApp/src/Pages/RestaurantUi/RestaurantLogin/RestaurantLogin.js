import React, { useState,useEffect,useContext } from "react";
import "./../RestaurantAuth.css";
import RestaurantSignup from "../RestaurantSignUp/RestaurantSignup";
import { RestaurantDetailsLogin } from '../../../services/restaurantServices';
import AuthContext from "../../AuthProvider";

export default function RestaurantLogin({ setRole }) {
    useEffect(() => {
        // Get elements by class name
        const sidebar = document.getElementsByClassName('sidebar');
        const topbar = document.getElementsByClassName('topbar');

        // Loop through the elements and set display to 'none'
        for (let i = 0; i < sidebar.length; i++) {
            sidebar[i].style.display = 'none';
        }
        for (let i = 0; i < topbar.length; i++) {
            topbar[i].style.display = 'none';
        }
    }, []);
    const { auth, setAuth, notification, setNotification } = useContext(AuthContext);
    const [signUp, setSignUp] = useState(false);
    const [enterEmailAddress, setEnterEmailAddress] = useState("");
    const [enterPassword, setEnterPassword] = useState("");
    const [enterPasswordError, setEnterPasswordError] = useState("");
    const [enterEmailAddressError, setEnterEmailAddressError] = useState("");
    function isValidEmailAddress(address) {
        return !!address.match(/.+@.+/);
    }
    const clearError = () => {
        setEnterEmailAddressError("");
        setEnterPasswordError("");
    };
    const submitRestaurantLogin = (event) => {
        event.preventDefault();
        var validate = true;
        clearError();
        if (!enterEmailAddress || !isValidEmailAddress(enterEmailAddress)) {
            setEnterEmailAddressError("A valid email address is required.");
            validate = false;
        }
        if (!enterPassword || enterPassword.trim() === "") {
            setEnterPasswordError("  password is required.");
            validate = false;
        }
        if (validate) {
            const loginDetails = {
                UserName: enterEmailAddress,
                Password:enterPassword
            }
            RestaurantDetailsLogin(loginDetails).then((response) => {
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
        }
    }

    return (
        <>
            {signUp ? (
                <RestaurantSignup setSignUp={setSignUp} />
            ): (
                    <>
                        <div style={{ position: "fixed", height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <div className="_7SignUpRestaurantPage">
                                <div className="_7SignupRestaurantPageTopbar">
                                    <div className="_7logoName">
                                        COOK WITH US
                                    </div>
                                    
                                    <div className="_7rightSide">
                                        <div className="_7anotherLoginButton" onClick={() => setRole("Rider")}>Login With Rider</div>
                                        <div className="_7anotherLoginButton" onClick={() => setRole("User")}>Login With User</div>
                                        <div className="_7loginButton">
                                            Have't Account <div onClick={() => setSignUp(true)} style={{ color: "green", cursor: "pointer", textDecoration: "underline" }}>Sign Up</div>
                                        </div>
                                        <div className="_7FAQs">
                                            FAQs
                                        </div>
                                    </div>
                                </div>
                                <div className="_7RestaurantContainer">
                                    <div className="_7RestaurantMainContent">
                                        <form className="_7RestaurantForm">

                                        </form>
                                    </div>
                                </div>
                            </div>

                            <div className="_8modelLayout">
                                <div className="_8otpDetailsText">LOGIN</div>
                                <form style={{ padding: "20px" }}>
                                    <div className="_7RestaurantFormGroup">
                                        <label htmlFor="_7RestaurantOwnerEmail">Email address</label>
                                        <input className="_7RestaurantRegisterInputs" onChange={(e) => setEnterEmailAddress(e.target.value)} value={enterEmailAddress} type="email" id="_7RestaurantOwnerEmail" />
                                        <p className="_7RestaurantError">{enterEmailAddressError}</p>
                                    </div>
                                    <div className="_7RestaurantFormGroup">
                                        <label htmlFor="_7RestaurantPanDocuments">Enter Password</label>
                                        <input className="_7RestaurantRegisterInputs" onChange={(e) => setEnterPassword(e.target.value)} value={enterPassword} type="password" id="_7RestaurantPanDocuments" />
                                        <p className="_7RestaurantError">{enterPasswordError}</p>
                                    </div>


                                    <div className="_8otpDetailsButton">
                                        <div type="submit" onClick={submitRestaurantLogin} className="_8otpDetailsSubmitButton">
                                            SUBMIT
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </>
                ) }            
        </>
    );
}