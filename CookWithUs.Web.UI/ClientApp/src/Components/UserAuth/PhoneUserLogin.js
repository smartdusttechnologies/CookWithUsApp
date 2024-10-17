import React, { useState,useEffect,useContext } from "react";
import UserPhoneSignup from "./UserPhoneSignup";
import "./UserAuth.css";
import { CheckUserMobile, LoginUser } from "../../services/UserService";
import AuthContext from "../../Pages/AuthProvider";

export default function PhoneUserLogin({ setOpenPhoneLogin }) {
    const [usernameError, setUsernameError] = useState(null);
    const [enterUsername, setEnterUsername] = useState("");
    const [inputType, setInputType] = useState("Text");
    const [labelText, setLabelText] = useState("Enter Mobile Number Or Email ID");
    const [enterPassword, setEnterPassword] = useState("");
    const [passwordError, setPasswordError] = useState(null);
    const [authenticationRole, setAuthenticationRole] = useState(null);
    const { auth, setAuth, notification, setNotification } = useContext(AuthContext);
    const currentDateTime = new Date();
    const [responce, setResponce] = useState(null);
    const [openPhoneUserSignup, setOpenPhoneUserSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const handlePasswordOnchange = (event) => {
        setEnterPassword(event.target.value);
    }
    const handleUsernameOnchange = (event) => {
        const value = event.target.value;
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
        setEnterUsername(event.target.value);
    }

    const handlePhoneUserLoginContinue = () => {
        if (enterUsername == null) { // Checks for both null and undefined
            setUsernameError('Please Enter Mobile Number First');
        } else {
           // setMobileunFieldError(null);
            CheckUserMobile(enterUsername)
                .then(response => {
                    console.log("An error occurred while adding address:", response);
                })
                .catch(error => {
                    console.error("An error occurred while adding address:", error);
                });
        }
    };
    const handleContinueButton = (event) => {
        event.preventDefault();
        var validate = true;
        if (enterUsername !== "") {
            const lowerCaseString = enterUsername.toLowerCase().toString();
            setEnterUsername(lowerCaseString);

            // Use correct variable name
            CheckUserMobile(lowerCaseString)
                .then((response) => {
                    if (response && response.data && response.data.requestedObject === false) {
                        setShowPassword(true);
                    } else {
                        setOpenPhoneUserSignup(true);
                    }
                });
        }

    }
    const clearError = () => {
        setUsernameError("");
        setPasswordError("");
    }
    function isValidEmailAddress(address) {
        return !!address.match(/.+@.+/);
    }
    const handleLoginContinueButton = (event) => {
        event.preventDefault();
        var validate = true;
        if (!enterPassword.trim()) {
            validate = false;
            setPasswordError("Please Enter Password");
        }
        if (enterUsername !== "") {
            const lowerCaseString = enterUsername.toLowerCase().toString();
            setEnterUsername(lowerCaseString);

            // Use correct variable name
            CheckUserMobile(lowerCaseString)
                .then((response) => {
                    if (response && response.data && response.data.requestedObject === false) {
                        clearError();

                        // Validate if string is empty
                        if (!lowerCaseString.trim()) {
                            validate = false;
                            if (inputType === 'email') {
                                if (!isValidEmailAddress(lowerCaseString)) {
                                    setUsernameError("Invalid Email");
                                }
                            }
                            else if (inputType === 'text') {
                                setUsernameError("Please Enter Email or Phone");
                            }
                        }

                        if (validate) {
                            if (inputType === 'email') {
                                setAuthenticationRole('Email');
                                const loginDetails = {
                                    UserName: lowerCaseString,
                                    password: enterPassword
                                };

                                LoginUser(loginDetails)
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
                                                setNotification([...notification, { message: response?.data.message[0], success: isAuthenticated }]);
                                                setOpenPhoneLogin(false);
                                            }
                                        } else {
                                            setUsernameError("Login failed, please check credentials");
                                        }
                                    });
                            }
                            else {
                                setAuthenticationRole('Mobile');
                            }
                        }
                    } else {
                        setOpenPhoneUserSignup(true);
                    }
                });
        }

    }

    useEffect(() => {
        if (responce) {
            document.body.style.backgroundColor = 'black';
        } else {
            document.body.style.backgroundColor = '';
        }
    }, [responce]);

    return (
        <>
            {openPhoneUserSignup ? (
                <>
                    <UserPhoneSignup mobile={enterUsername } />
                </>
            ) : (
                <>
                    <div className="_2yoTv">
                        <div>
                            <div className="_3EFMg">
                                <img
                                    alt=""
                                    className="_2yQPs _1rfuP"
                                    height="134"
                                    width="75"
                                    src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/create_account_graphics_2x_brdvrk"
                                />
                                    <button onClick={() => { setOpenPhoneLogin(false) } } className="_2QN4q _1im59" data-cy="back-button" aria-label="Double tap to go back">
                                    <svg className="uHGrw" viewBox="0 0 32 32" height="18" width="18">
                                        <path d="M3.333 14.984l28.667-0v2.097l-0.16 0.006h-28.506l-0.16-0.16v-1.782l0.16-0.16zM1.114 14.986l10.079-10.079 0.121-0.108 1.465 1.467-0.101 0.127-10.079 10.079h-0.226l-1.26-1.26v-0.226zM12.679 25.676l0.108 0.117-1.468 1.484-0.126-0.115-10.079-10.079v-0.226l1.26-1.26h0.226l10.079 10.079zM3.268 12.87l0.272 0.116-0.022 6.125-0.272 0.114-3.245-3.18 0.111-0.112 3.157-3.062z"></path>
                                    </svg>
                                </button>
                                <div className="_1IbBN">
                                    <h1 className="_2clOW" data-cy="header-title">LOGIN</h1>
                                    <div role="heading" aria-level="3" className="DLItg _2_k47" data-cy="header-description">
                                        Enter your phone number or Email to continue
                                    </div>
                                </div>
                            </div>
                            <div className="cDWSj" style={{ padding: '5px 16px', position: 'relative' }}>
                                <form autoComplete="off">
                                    <div className="npnSS">
                                        <div className="_11Jfu inputContainer" aria-hidden="true">
                                                <label style={{top:"-10px"}} className="_21cv8 labelField" htmlFor="mobile" data-cy="input-label-mobile" aria-hidden="true">
                                                    {labelText }
                                                </label>                                            
                                                <input
                                                    className="_1ZK9h _1g81h inputField"
                                                    type={inputType}
                                                    name="mobile"
                                                    id="mobile"
                                                    autoComplete="on"
                                                    tabIndex="1"
                                                    data-cy="input-phone-number"
                                                    data-testid="input-field-mobile"
                                                    value={enterUsername}
                                                    onChange={handleUsernameOnchange}
                                                />
                                                <label style={{ color: "red", fontWeight: "400" }}>{usernameError}</label>
                                            <span className="Qe5_f"></span>
                                        </div>
                                        <span className="_2YNHY" aria-hidden="true">+91 - </span>
                                        </div>
                                        {showPassword ? (
                                            <>
                                                <div className="inputContainer" style={{ marginBottom: "25px" }}>
                                                    <div className="_3Um38 _3lG1r inputfield">
                                                        <input
                                                            className="_381fS"
                                                            type="password"
                                                            name="password"
                                                            id="email"
                                                            autoComplete="off"
                                                            value={enterPassword}
                                                            onChange={handlePasswordOnchange}
                                                        />
                                                        <div className="_2EeI1"></div>
                                                        <label className="_1Cvlf labelField" htmlFor="email">Password</label>
                                                    </div>
                                                    <div class="errorMesssage">{passwordError}</div>
                                                </div>
                                                <div className="_25qBi _2-hTu">
                                                    <button className="a-ayg" onClick={handleLoginContinueButton}>
                                                        Login
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                                <>
                                                    <div className="_3JGzG _3nBzT">
                                                        <button
                                                            onClick={handleContinueButton}
                                                            className="_1vTVI _2UPEv"
                                                            data-cy="primary-button"
                                                            aria-label="Click here to send the OTP"
                                                        >
                                                            CONTINUE
                                                        </button>
                                                    </div>
                                                </>
                                        )}
                                    
                                    <div className="_1CZpY">
                                        By clicking, I accept the{' '}
                                        <a href="/terms-and-conditions" className="_1yKIM">
                                            Terms &amp; Conditions
                                        </a>{' '}
                                        &amp;{' '}
                                        <a href="/privacy-policy" className="_1yKIM">
                                            Privacy Policy
                                        </a>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="_1r-M3 _3JaG6 _3C3Tg"></div>
                        <div className="_3JaG6 _3C3Tg"></div>
                    </div>
                </>
            )}
        </>
    );

}