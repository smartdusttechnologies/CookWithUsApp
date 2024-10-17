import React, { useState,useContext } from "react";
import "./UserAuth.css";
import { CheckUserMobile, SignupUser } from "../../services/UserService";
import { MatchOTP, OTPAuthenticate } from "../../services/riderServices";
import AuthContext from "../../Pages/AuthProvider";


export default function UserSignUp({ setOpenSignUp, setOpenLogin }) {
    const [usernameError, setUsernameError] = useState(null);
    const [nameError, setNameError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState(null);
    const [sendOTP, setSendOTP] = useState(false);
    const [verifyOTP, setVerifyOTP] = useState(false);
    const [enterOtp, setEnterOtp] = useState(['', '', '', '', '', '']);
    const [errorForOTP, setErrorForOTP] = useState(null);
    const [enterUsername, setEnterUsername] = useState("");
    const [enterName, setEnterName] = useState("");
    const [enterPassword, setEnterPassword] = useState("");
    const [enterConfirmPassword, setEnterConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [inputType, setInputType] = useState("text");
    const [labelText, setLabelText] = useState("Enter Mobile Number Or Email ID");
    const [authenticationRole, setAuthenticationRole] = useState(null);
    const { auth, setAuth, notification, setNotification } = useContext(AuthContext);
    const handleUsernameOnchange = (event) => {
        const value = event.target.value;
        if (value === '') {
            setInputType('text');
            setLabelText('Enter Mobile Number Or Email ID');
        } else if (/^\d*$/.test(value)) {
            setInputType('number');
            setLabelText('Enter Mobile Number');
        } else {
            setInputType('email');
            setLabelText('Enter Email ID');
        }
        setEnterUsername(value);
    }

    const handleNameOnchange = (event) => {
        setEnterName(event.target.value);
    }

    const handlePasswordOnchange = (event) => {
        setEnterPassword(event.target.value);
    }

    const handleConfirmPasswordOnchange = (event) => {
        setEnterConfirmPassword(event.target.value);
    }

    const clearError = () => {
        setErrorMessage("");
        setUsernameError(null);
        setNameError(null);
        setPasswordError(null);
        setConfirmPasswordError(null);
    }

    const isValidEmailAddress = (address) => {
        return !!address.match(/.+@.+/);
    }

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

    const handleContinueButton = (event) => {
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

        if (enterUsername) {
            const lowerCaseUsername = enterUsername.toLowerCase();
            setEnterUsername(lowerCaseUsername);

            if (validate) {
                CheckUserMobile(lowerCaseUsername)
                    .then((response) => {
                        if (response.data.requestedObject) {
                            clearError();
                            if (inputType === 'email' && isValidEmailAddress(lowerCaseUsername)) {
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
                        } else {
                            setUsernameError("User Already Exists");
                        }
                    })
                    .catch((error) => {
                        console.error("Error during mobile check", error);
                    });
            }
        } else {
            setErrorMessage("Please Enter Email or Phone");
        }
    };

    const handleVerifyOtpButton = () => {
        const enteredOtp = enterOtp.join('');
        const otpDetails = {
            ID: 0,
            Type: "Email",
            Details: enterUsername,
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
                        UserName: enterUsername,
                        Name: enterName,
                        Password: enterPassword,
                        IsDeleted: 0
                    };
                    SignupUser(userDetails).then((response) => {
                        if (response.data.isSuccessful) {
                            
                            const isAuthenticated = response?.data.isSuccessful;

                            // For Success
                            if (isAuthenticated) {
                                const accessToken = response?.data.requestedObject.accessToken;
                                const userName = response?.data.requestedObject.userName;
                                const userId = response?.data.requestedObject.userId;
                                localStorage.setItem("jwtToken", accessToken);
                                setAuth({ accessToken, userName, userId, isAuthenticated });
                                
                            }
                        } else {
                            setUsernameError("Login failed, please check credentials");
                        }
                    });
                }
            })
            .catch(error => {
                console.error("Error during OTP verification:", error);
            });
    };

    return (
        <>
            <div id="overlay-sidebar-root">
                <div>
                    <div>
                        <div className="FYlIl"></div>
                        <div className="_3vi_e" style={{ right: 0, transform: 'translate(0%, 0px)' }}>
                            <div className="_12S7_">
                                <div>
                                    <div style={{ paddingLeft: '40px', paddingRight: '160px', width: '562px' }}>
                                        <div className="_3pYe-" style={{ height: '130px' }}>
                                            <span onClick={() => setOpenSignUp(false)} className="_22fFW icon-close-thin"></span>
                                            <div className="_1Tg1D">Sign up</div>
                                            <div className="HXZeD"></div>
                                            <div className="_2r91t">
                                                or <div className="_3p4qh" onClick={() => { setOpenLogin(true); setOpenSignUp(false); }}>login to your account</div>
                                            </div>
                                            <img
                                                className="jdo4W"
                                                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r"
                                                alt="Sign up"
                                                width="100"
                                                height="105"
                                            />
                                        </div>
                                        <form>
                                            {sendOTP ? (
                                                <div className="inputContainer" style={{ marginBottom: "25px" }}>
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
                                            ) : (
                                                <>
                                                    <div className="inputContainer" style={{ marginBottom: "25px" }}>
                                                        <div className="_3Um38 _3lG1r">
                                                            <input
                                                                className="_381fS inputfield"
                                                                type={inputType}
                                                                name="mobile"
                                                                id="mobile"
                                                                maxLength={inputType === "number" ? "10" : undefined}
                                                                autoComplete="off"
                                                                value={enterUsername}
                                                                onChange={handleUsernameOnchange}
                                                            />
                                                            <div className="_2EeI1 _26LFr"></div>
                                                            <label className="_1Cvlf _2tL9P" htmlFor="mobile">{labelText}</label>
                                                                <span className="errorMesssage">{usernameError}</span>
                                                        </div>
                                                    </div>
                                                    <div className="inputContainer" style={{ marginBottom: "25px" }}>
                                                        <div className="_3Um38 _3lG1r">
                                                            <input
                                                                className="_381fS inputfield"
                                                                type="text"
                                                                name="name"
                                                                id="name"
                                                                autoComplete="off"
                                                                value={enterName}
                                                                onChange={handleNameOnchange}
                                                            />
                                                            <div className="_2EeI1 _26LFr"></div>
                                                            <label className="_1Cvlf _2tL9P" htmlFor="name">Enter Full Name</label>
                                                                <span className="errorMesssage">{nameError}</span>
                                                        </div>
                                                    </div>
                                                    <div className="inputContainer" style={{ marginBottom: "25px" }}>
                                                        <div className="_3Um38 _3lG1r">
                                                            <input
                                                                className="_381fS inputfield"
                                                                type="password"
                                                                name="password"
                                                                id="password"
                                                                autoComplete="off"
                                                                value={enterPassword}
                                                                onChange={handlePasswordOnchange}
                                                            />
                                                            <div className="_2EeI1 _26LFr"></div>
                                                            <label className="_1Cvlf _2tL9P" htmlFor="password">Enter Password</label>
                                                                <span className="errorMesssage">{passwordError}</span>
                                                        </div>
                                                    </div>
                                                    <div className="inputContainer" style={{ marginBottom: "25px" }}>
                                                        <div className="_3Um38 _3lG1r">
                                                            <input
                                                                className="_381fS inputfield"
                                                                type="password"
                                                                name="confirmPassword"
                                                                id="confirmPassword"
                                                                autoComplete="off"
                                                                value={enterConfirmPassword}
                                                                onChange={handleConfirmPasswordOnchange}
                                                            />
                                                            <div className="_2EeI1 _26LFr"></div>
                                                            <label className="_1Cvlf _2tL9P" htmlFor="confirmPassword">Confirm Password</label>
                                                                <span className="errorMesssage">{confirmPasswordError}</span>
                                                        </div>
                                                    </div>
                                                    <div className="_1DS7T">
                                                            <div className="_25qBi _2-hTu">
                                                                <button className="a-ayg" onClick={handleContinueButton}>
                                                                    Continue
                                                                </button>
                                                            </div>
                                                        {errorMessage && (
                                                            <div style={{ marginTop: "20px", textAlign: "center" }}>
                                                                <span style={{ color: "red", fontSize: "16px" }}>{errorMessage}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </>
                                            )}
                                        </form>
                                    </div>
                                    <div className="bdsEU"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
