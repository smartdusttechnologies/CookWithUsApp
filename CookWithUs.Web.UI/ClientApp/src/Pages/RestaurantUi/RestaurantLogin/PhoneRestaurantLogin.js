import React, { useState,useEffect,useContext } from 'react';
import '../PhoneRestaurantAuth.css';
import AuthContext from '../../AuthProvider';
import { RestaurantDetailsLogin } from '../../../services/restaurantServices';
import RestaurantPhoneSignup from '../RestaurantSignUp/RestaurantPhoneSignup';

const PhoneRestaurantLogin = () => {
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        // Get elements by class name
        const sidebar = document.getElementsByClassName('_2PhoneTopBar');
        const topbar = document.getElementsByClassName('mainBottomBar');

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

    const handleLogin = (event) => {
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
                Password: enterPassword
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

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            {signUp ? (
                <RestaurantPhoneSignup setSignUp={setSignUp} />
            ) : (
                <><div className="_8phoneRestaurantLogin-container">
                    <div className="_8phoneRestaurantLogin-box">
                        <h2 className="_8phoneRestaurantLogin-title">Restaurant Login</h2>

                        <div className="_8phoneRestaurantLogin-form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                value={enterEmailAddress}
                                onChange={(e) => setEnterEmailAddress(e.target.value)}
                                className="_8phoneRestaurantLogin-input-field"
                                placeholder="Enter your email"
                            />
                            <p className="_7RestaurantError">{enterEmailAddressError}</p>
                        </div>

                        <div className="_8phoneRestaurantLogin-form-group">
                            <label>Password</label>
                            <div className="_8phoneRestaurantLogin-input-container">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={enterPassword}
                                    onChange={(e) => setEnterPassword(e.target.value)}
                                    className="_8phoneRestaurantLogin-input-field"
                                    placeholder="Enter your password"
                                />
                                <button className="_8phoneRestaurantLogin-toggle-password" onClick={togglePasswordVisibility}>
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                                <p className="_7RestaurantError">{enterPasswordError}</p>
                            </div>
                        </div>

                        <button className="_8phoneRestaurantLogin-login-button" onClick={handleLogin}>
                            Login
                        </button>
                        <div className="_8phoneRestaurantLogin-signText">
                                Have't an Account?<div onClick={() => setSignUp(true)} className="_8phoneRestaurantLogin-signButton" >Sign In</div>
                        </div>
                    </div>
                </div></>
            )}
        </>
    );
};

export default PhoneRestaurantLogin;
