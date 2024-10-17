import React, { useState,useContext } from "react";
import "./UserAuth.css";
import { CheckUserMobile, SignupUser } from "../../services/UserService";
import { MatchOTP, OTPAuthenticate } from "../../services/riderServices";
import AuthContext from "../../Pages/AuthProvider";
export default function UserPhoneSignup({mobile }) {

    const [sendOTP, setSendOTP] = useState(false);
    const [enterOtp, setEnterOtp] = useState(['', '', '', '', '', '']);
    const [errorForOTP, setErrorForOTP] = useState(null);
    const [verifyOTP, setVerifyOTP] = useState(false);
    const [enterName, setEnterName] = useState("");
    const [enterPassword, setEnterPassword] = useState("");
    const [nameError, setNameError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState(null);
    const [enterConfirmPassword, setEnterConfirmPassword] = useState("");
    const [authenticationRole, setAuthenticationRole] = useState(null);
    const { auth, setAuth, notification, setNotification } = useContext(AuthContext);
    const handleNameChange = (e) => setEnterName(e.target.value);
    const handlePasswordChange = (e) => setEnterPassword(e.target.value);
    const handleCnfPasswordChange = (e) => setEnterConfirmPassword(e.target.value);
    const isValidEmailAddress = (address) => {
        return !!address.match(/.+@.+/);
    }
    const validateInput = (input) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 format for international phone numbers

        if (emailRegex.test(input)) {
            return 'email';
        } else if (phoneRegex.test(input)) {
            return 'phone';
        } else {
            return 'invalid';
        }
    };

    const handleCreateAccount = (event) => {
        event.preventDefault();
        clearError();

        let validate = true;
        if (!enterName.trim()) {
            setNameError("Please Enter Name");
            validate = false;
        }

        if (!enterPassword.trim()) {
            setPasswordError("Please Enter Password");
            validate = false;
        }

        if (!enterConfirmPassword.trim()) {
            setConfirmPasswordError("Please Enter Confirm Password");
            validate = false;
        }

        if (enterPassword !== enterConfirmPassword) {
            setConfirmPasswordError("Password And Confirm Password must be same");
            validate = false;
        }

        if (mobile) {
            const lowerCaseUsername = mobile.toLowerCase();

            if (validate) {
                CheckUserMobile(lowerCaseUsername)
                    .then((response) => {
                        if (response.data.requestedObject) {
                            clearError();
                            if (validateInput(mobile) === 'email' && isValidEmailAddress(lowerCaseUsername)) {
                                setAuthenticationRole('Email');
                                const otpDetails = {
                                    ID: 0,
                                    Type: "Email",
                                    Details: lowerCaseUsername,
                                    OTP: "000000",
                                    DateTime: new Date().toLocaleString(),
                                    Role: "User"
                                };
                                OTPAuthenticate(otpDetails).then(() => setSendOTP(true));
                            } else {
                                setAuthenticationRole('Mobile');
                                // Handle mobile number registration (if needed)
                            }
                        }
                    })
                    .catch((error) => {
                        console.error("Error during mobile check", error);
                    });
            }
        }
    };
    const clearError = () => {
        setNameError(null);
        setPasswordError(null);
        setConfirmPasswordError(null);
    }
    const handleVerifyOtpButton = () => {
        const enteredOtp = enterOtp.join('');
        const otpDetails = {
            ID: 0,
            Type: "Email",
            Details: mobile,
            OTP: enteredOtp,
            DateTime: new Date().toLocaleString(),
            Role: "User"
        };
        MatchOTP(otpDetails)
            .then(response => {
                if (!response.data.isSuccessful) {
                    setErrorForOTP(response.data.message[0].reason);
                } else {
                    setVerifyOTP(true);
                    const userDetails = {
                        Id: 0,
                        UserName: mobile,
                        Name: enterName,
                        Password: enterPassword,
                        IsDeleted: 0
                    };
                    SignupUser(userDetails).then((response) => {
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
                        } else {
                            setNameError("Login failed, please check credentials");
                        }
                    });
                }
            })
            .catch(error => {
                console.error("Error during OTP verification:", error);
            });
    };
        const handleOtpChange = (e, index) => {
            const value = e.target.value;
            if (/^\d$/.test(value) || value === '') {
                const newOtp = [...enterOtp];
                newOtp[index] = value;
                setEnterOtp(newOtp);
                if (value && index < 5) {
                    document.getElementById(`otp-${index + 1}`).focus();
                }
            }
        };

        const handleKeyDown = (e, index) => {
            if (e.key === 'Backspace' && !enterOtp[index] && index > 0) {
                document.getElementById(`otp-${index - 1}`).focus();
            }
        };

    return (
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
                    <button className="_2QN4q _1im59" data-cy="back-button" aria-label="Double tap to go back">
                        <svg className="uHGrw" viewBox="0 0 32 32" height="18" width="18">
                            <path d="M3.333 14.984l28.667-0v2.097l-0.16 0.006h-28.506l-0.16-0.16v-1.782l0.16-0.16zM1.114 14.986l10.079-10.079 0.121-0.108 1.465 1.467-0.101 0.127-10.079 10.079h-0.226l-1.26-1.26v-0.226zM12.679 25.676l0.108 0.117-1.468 1.484-0.126-0.115-10.079-10.079v-0.226l1.26-1.26h0.226l10.079 10.079zM3.268 12.87l0.272 0.116-0.022 6.125-0.272 0.114-3.245-3.18 0.111-0.112 3.157-3.062z"></path>
                        </svg>
                    </button>
                    <div className="_1IbBN">
                        <h1 className="_2clOW" data-cy="header-title">SIGN UP</h1>
                        <div role="heading" aria-level="3" className="DLItg _2_k47" data-cy="header-description">
                            Create an account with the new phone number
                        </div>
                    </div>
                </div>
                <div className="_12IIP">

                    {sendOTP ? (
                        <>
                            <div className="npnSS">
                                <label className="otp label" htmlFor="otp">Enter OTP Here</label>
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: '10px' }}>
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
                                            style={{ width: '40px', textAlign: 'center', height: '40px', borderRadius: '10px', fontSize: '20px', fontWeight: 600 }}
                                        />
                                    ))}
                                </div>
                                <div onClick={handleVerifyOtpButton} className="sendOtpButton">Verify</div>
                            </div>
                        </>
                    ) : (
                    <>

                    <div className="npnSS">
                        <div className="_11Jfu" aria-hidden="true">
                            <label className="_21cv8 _3Aw9B" htmlFor="username" data-cy="input-label-mobile" aria-hidden="true">
                                USERNAME
                            </label>
                            <label>
                                <input
                                    className="_1ZK9h _1g81h"
                                    disabled
                                    type="text"
                                    name="username"
                                    id="username"
                                    autoComplete="on"
                                    tabIndex="1"
                                    data-testid="input-field-mobile"
                                    value={mobile}
                                    readOnly
                                />
                            </label>
                            <span className="Qe5_f"></span>
                        </div>
                        <span className="_2YNHY mnuxf" aria-hidden="true">+91 - </span>                        
                    </div>

                    <div className="_1xL_m">
                        <div className="_11Jfu" aria-hidden="true">
                            <label className="_21cv8" htmlFor="name" data-cy="input-label-name" aria-hidden="true">
                                NAME
                            </label>
                            <label>
                                <input
                                    className="_1ZK9h"
                                    type="text"
                                    name="name"
                                    id="name"
                                    tabIndex="1"
                                    autoComplete="on"
                                    data-cy="input-name"
                                    data-testid="input-field-name"
                                    value={enterName}
                                    onChange={handleNameChange}
                                />
                            </label>
                                        <span className="Qe5_f"></span>
                                        <span className="errorMesssage">{nameError}</span>
                        </div>
                    </div>

                    <div className="_1xL_m">
                        <div className="_11Jfu" aria-hidden="true">
                            <label className="_21cv8" htmlFor="password" data-cy="input-label-password" aria-hidden="true">
                                PASSWORD
                            </label>
                            <label>
                                <input
                                    className="_1ZK9h"
                                    type="password"
                                    name="password"
                                    id="password"
                                    tabIndex="3"
                                    autoComplete="on"
                                    data-cy="input-password"
                                    data-testid="input-field-password"
                                    value={enterPassword}
                                    onChange={handlePasswordChange}
                                />
                            </label>
                                        <span className="Qe5_f"></span>
                                        <span className="errorMesssage">{passwordError}</span>
                        </div>
                        <div className="_11Jfu" aria-hidden="true">
                            <label className="_21cv8" htmlFor="cnfpassword" data-cy="input-label-password" aria-hidden="true">
                                CONFIRM PASSWORD
                            </label>
                            <label>
                                <input
                                    className="_1ZK9h"
                                    type="password"
                                    name="cnfpassword"
                                    id="cnfpassword"
                                    tabIndex="3"
                                    autoComplete="on"
                                    data-cy="input-password"
                                    data-testid="input-field-password"
                                    value={enterConfirmPassword}
                                    onChange={handleCnfPasswordChange}
                                />
                            </label>
                                        <span className="Qe5_f"></span>
                                        <span className="errorMesssage">{confirmPasswordError}</span>
                        </div>
                                </div>

                    <div className="_3JGzG">
                        <button
                            className="_1vTVI _2UPEv"
                            data-cy="primary-button"
                            onClick={handleCreateAccount}
                        >
                            CREATE ACCOUNT
                        </button>
                    </div>

                    </>
                    )}
                    
                </div>
            </div>
            <div className="_1r-M3 _3JaG6 _3C3Tg"></div>
            <div className="_3JaG6 _3C3Tg"></div>
        </div>
    );
}