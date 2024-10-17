import React, { useState, useContext } from "react";
import "./UserAuth.css";
import { CheckUserMobile, LoginUser } from "../../services/UserService";
import { MatchOTP, OTPAuthenticate } from "../../services/riderServices";
import AuthContext from "../../Pages/AuthProvider";

export default function UserLogin({ setOpenSignUp, setOpenLogin }) {
    const [usernameError, setUsernameError] = useState(null);
    const [enterUsername, setEnterUsername] = useState("");
    const [inputType, setInputType] = useState("Text");
    const [labelText, setLabelText] = useState("Enter Mobile Number Or Email ID");
    const [enterPassword, setEnterPassword] = useState("");
    const [passwordError, setPasswordError] = useState(null);
    const [authenticationRole, setAuthenticationRole] = useState(null);
    const { auth, setAuth, notification, setNotification } = useContext(AuthContext);
    const currentDateTime = new Date();
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
    const handlePasswordOnchange = (event) => {
        setEnterPassword(event.target.value);
    }
    const handleCreateAccount = () => {
        setOpenLogin(false);
        setOpenSignUp(true);
    }
    const clearError = () => {
        setUsernameError("");
        setPasswordError("");
    }
    function isValidEmailAddress(address) {
        return !!address.match(/.+@.+/);
    }
    const handleContinueButton = (event) => {
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
                                                setNotification([...notification, { message: response?.data.message[0], success: isAuthenticated }])
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
                        setUsernameError("User Does't Exists. Please SignUp First");
                    }
                });
        }

    }
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
                                            <span onClick={()=>setOpenLogin(false) } className="_22fFW icon-close-thin"></span>
                                            <div className="_1Tg1D">Login</div>
                                            <div className="HXZeD"></div>
                                            <div className="_2r91t">
                                                or <div className="_3p4qh" onClick={handleCreateAccount }>create an account</div>
                                            </div>
                                            <img
                                                className="jdo4W"
                                                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r"
                                                alt="Login"
                                                width="100"
                                                height="105"
                                            />
                                        </div>
                                        <form>
                                            <div className="inputContainer" style={{ marginBottom: "25px" }} >
                                                <div className="_3Um38 _3lG1r">
                                                    <input
                                                        className="_381fS inputField"
                                                        type={inputType}
                                                        name="mobile"
                                                        id="mobile"
                                                        maxLength={inputType === "number" ? "10" : undefined}
                                                        autoComplete="off"
                                                        value={enterUsername}
                                                        onChange={handleUsernameOnchange}
                                                    />
                                                    <div className="_2EeI1"></div>
                                                    <label className="_1Cvlf labelField" htmlFor="mobile">{labelText}</label>
                                                </div>
                                                <div class="errorMesssage">{usernameError}</div>
                                            </div>
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
                                                <button className="a-ayg" onClick={handleContinueButton}>
                                                    Login
                                                </button>
                                            </div>
                                            <div className="_1FvHn">
                                                By clicking on Login, I accept the{' '}
                                                <a className="IBw2l" href="/terms-and-conditions">Terms & Conditions</a> &{' '}
                                                <a className="IBw2l" href="/privacy-policy">Privacy Policy</a>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="overlay"></div>
        </>
    );
}
