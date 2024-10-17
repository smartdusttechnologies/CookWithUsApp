import React, { useEffect,useState,useContext } from 'react';
import "./../RestaurantAuth.css";
import { Hotel, X } from 'lucide-react';
import { GetRestaurantCategory, RestaurantDetailsSignup } from '../../../services/restaurantServices';
import { MatchOTP, OTPAuthenticate } from '../../../services/riderServices';
import AuthContext from '../../AuthProvider';


export default function RestaurantSignup({ setSignUp }) {
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
    const [filledResInfo, setFillResInfo] = useState(false);
    const [filledResDocs, setFillResDocs] = useState(false);
    const [filledMenuSetup, setFillMenuSetup] = useState(false);
    const [filledStep, setFilledStep] = useState("info");
    const [docsActiveClass, setDocsActiveClass] = useState("_7RestaurantStepItem");
    const [menuActiveClass, setMenuActiveClass] = useState("_7RestaurantStepItem");
    const [passActiveClass, setPassActiveClass] = useState("_7RestaurantStepItem");
    const [openSelectCategory, setOpenSelectCategory] = useState(false);
    const [restaurantCategoryDetails, setRestaurantCategoryDetails] = useState("");

    const [enterOwnerFullName, setEnterOwnerFullName] = useState("");
    const [enterRestaurantName, setEnterRestaurantName] = useState("");
    const [enterEmailAddress, setEnterEmailAddress] = useState("");
    const [enterMobileNumber, setEnterMobileNumber] = useState("");
    const [enterWhatsAppNumber, setEnterWhatsAppNumber] = useState("");
    const [selectedWorkingDays, setSelectedWorkingDays] = useState("");
    const [selectedOpeningTime, setSelectedOpeningTime] = useState("");
    const [selectedClosingTime, setSelectedClosingTime] = useState("");

    const [selectedRestaurantCategory, setSelectedRestaurantCategory] = useState("");
    const [enterOwnerPanNumber, setEnterOwnerPanNumber] = useState("");
    const [enterGstinNumber, setEnterGstinNumber] = useState("");
    const [enterIfscCode, setEnterIfscCode] = useState("");
    const [enterAccountNumber, setEnterAccountNumber] = useState("");
    const [enterFssaiCertificate, setEnterFssaiCertificate] = useState("");

    const [uploadMenu, setUploadMenu] = useState("");

    const [enterPassword, setEnterPassword] = useState("");
    const [enterConfirmPassword, setEnterConfirmPassword] = useState("");

    const [enterOwnerFullNameError, setEnterOwnerFullNameError] = useState("");
    const [enterRestaurantNameError, setEnterRestaurantNameError] = useState("");
    const [enterEmailAddressError, setEnterEmailAddressError] = useState("");
    const [enterMobileNumberError, setEnterMobileNumberError] = useState("");
    const [enterWhatsAppNumberError, setEnterWhatsAppNumberError] = useState("");
    const [selectedWorkingDaysError, setSelectedWorkingDaysError] = useState("");
    const [selectedOpeningTimeError, setSelectedOpeningTimeError] = useState("");
    const [selectedClosingTimeError, setSelectedClosingTimeError] = useState("");

    const [selectedRestaurantCategoryError, setSelectedRestaurantCategoryError] = useState("");
    const [enterOwnerPanNumberError, setEnterOwnerPanNumberError] = useState("");
    const [enterGstinNumberError, setEnterGstinNumberError] = useState("");
    const [enterIfscCodeError, setEnterIfscCodeError] = useState("");
    const [enterAccountNumberError, setEnterAccountNumberError] = useState("");
    const [enterFssaiCertificateError, setEnterFssaiCertificateError] = useState("");

    const [enterPasswordError, setEnterPasswordError] = useState("");
    const [enterConfirmPasswordError, setEnterConfirmPasswordError] = useState("");

    const [enterOtp, setEnterOtp] = useState(['', '', '', '', '', '']);
    const [errorForOTP, setErrorForOTP] = useState("");
    const currentDateTime = new Date();

    const [uploadMenuError, setUploadMenuError] = useState("");

    const [enterOtpModel, setEnterOtpModel] = useState(false);

    const { auth, setAuth, notification, setNotification } = useContext(AuthContext);

    const handleMobileNextClick = (event) => {
        event.preventDefault();
        const enteredOtp = enterOtp.join(''); // Combine the otp array into a single string
    }

    const handleOtpChange = (e, index) => {
        const value = e.target.value;
        if (/^\d$/.test(value) || value === '') { // Ensure only one digit is entered
            const newOtp = [...enterOtp];
            newOtp[index] = value;
            setEnterOtp(newOtp);
            // Move focus to the next input field
            if (value && index < 5) {
                document.getElementById(`otp-${index + 1}`).focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        // Move focus to the previous input field on backspace
        if (e.key === 'Backspace' && !enterOtp[index] && index > 0) {
            document.getElementById(`otp-${index - 1}`).focus();
        }
    };
    const handleResendOTP = () => {
        
    }

    const clearError = () => {
        setEnterOwnerFullNameError("");
        setEnterRestaurantNameError("");
        setEnterEmailAddressError("");
        setEnterMobileNumberError("");
        setEnterWhatsAppNumberError("");
        setSelectedWorkingDaysError("");
        setSelectedOpeningTimeError("");
        setSelectedClosingTimeError("");
        setSelectedRestaurantCategoryError("");
        setEnterOwnerPanNumberError("");
        setEnterGstinNumberError("");
        setEnterIfscCodeError("");
        setEnterAccountNumberError("");
        setEnterFssaiCertificateError("");
        setUploadMenuError("");
        setEnterPasswordError("");
        setEnterConfirmPasswordError("");
    };
    function isValidEmailAddress(address) {
        return !!address.match(/.+@.+/);
    }
    function areDaysSelected() {
        return Object.values(selectedDays).some(day => day === true);
    }
    function submitRestaurantInfo(event) {
            event.preventDefault();
            var validate = true;
            clearError();
            if (!enterOwnerFullName || enterOwnerFullName.trim() === "") {
                setEnterOwnerFullNameError("Owner's full name is required.");
                validate = false;
            }
            if (!enterRestaurantName || enterRestaurantName.trim() === "") {
                setEnterRestaurantNameError("Restaurant name is required.");
                validate = false;
            }
            if (!enterEmailAddress || !isValidEmailAddress(enterEmailAddress)) {
                setEnterEmailAddressError("A valid email address is required.");
                validate = false;
            }
            if (!enterMobileNumber || enterMobileNumber.trim() === "") {
                setEnterMobileNumberError("Mobile number is required.");
                validate = false;
            }
            if (!enterWhatsAppNumber || enterWhatsAppNumber.trim() === "") {
                setEnterWhatsAppNumberError("WhatsApp number is required.");
                validate = false;
            }

            if (!areDaysSelected()) {
                setSelectedWorkingDaysError("Please select at least one working day.");
                validate = false;
            }
            if (!selectedOpeningTime || selectedOpeningTime.trim() === "") {
                setSelectedOpeningTimeError("Opening time is required.");
                validate = false;
            }
            if (!selectedClosingTime || selectedClosingTime.trim() === "") {
                setSelectedClosingTimeError("Closing time is required.");
                validate = false;
            }
            if (validate) {
                setFilledStep("Docs");
            }
    }
    function submitRestaurantDocs(event) {
        event.preventDefault();
        var validate = true;
        clearError();
        if (!selectedRestaurantCategory || selectedRestaurantCategory === "") {
            setSelectedRestaurantCategoryError("Restaurant category is required.");
            validate = false;
        }

        if (!enterOwnerPanNumber || enterOwnerPanNumber.trim() === "") {
            setEnterOwnerPanNumberError("PAN number is required.");
            validate = false;
        }

        if (!enterGstinNumber || enterGstinNumber.trim() === "") {
            setEnterGstinNumberError("GSTIN number is required.");
            validate = false;
        }

        if (!enterIfscCode || enterIfscCode.trim() === "") {
            setEnterIfscCodeError("IFSC code is required.");
            validate = false;
        }

        if (!enterAccountNumber || enterAccountNumber.trim() === "") {
            setEnterAccountNumberError("Account number is required.");
            validate = false;
        }

        if (!enterFssaiCertificate || enterFssaiCertificate.trim() === "") {
            setEnterFssaiCertificateError("FSSAI certificate number is required.");
            validate = false;
        }
        if (validate) {
            setFilledStep("menu");
        }
    }

    const handleMenuInputChange = (event) => {
        const file = event.target.files[0]; // Get the selected file

        if (file) {
            const reader = new FileReader(); // Create FileReader object

            reader.onloadend = () => {
                if (reader.result) {
                    setUploadMenu(reader.result); // Set the base64 image data
                }
            };

            reader.onerror = (error) => {
                console.error("File reading error:", error); // Handle any errors
            };

            reader.readAsDataURL(file); // Convert the image file to Base64
        }
    };
    function submitRestaurantMenu(event) {
        event.preventDefault();
        var validate = true;
        clearError();

        if (validate) {
            setFilledStep("Pass");
        }
    }
    function submitRestaurantPass(event) {
        event.preventDefault();
        var validate = true;
        clearError();


        if (!enterPassword || enterPassword.trim() === "") {
            setEnterPasswordError("  password is required.");
            validate = false;
        }

        if (!enterConfirmPassword || enterConfirmPassword.trim() === "") {
            setEnterConfirmPasswordError("Confirm password is required.");
            validate = false;
        }
        if (enterPassword !== enterConfirmPassword) {
            setEnterPasswordError("Password And Confirm password Not Match.");
            validate = false;
        }
        
        if (validate) {
            const otpDetails = {
                ID: 0,
                Type: "Email",
                Details: enterEmailAddress,
                OTP: "000000",
                DateTime: currentDateTime.toLocaleString(),
                Role: "Restaurant"
            }
            OTPAuthenticate(otpDetails);
            setEnterOtpModel(true);
        }
    }
    const submitAllDetails = () => {
        const details = {
            Id: 0,
            OwnerFullName: enterOwnerFullName,
            RestaurantName: enterRestaurantName,
            Latitude: 12.345678,
            Longitude: 98.765432,
            Email: enterEmailAddress,
            Mobile:enterMobileNumber,
            Whatsapp: enterWhatsAppNumber,
            WorkingDays: "Monday to Friday",
            OpeningTime: selectedOpeningTime,
            ClosingTime: selectedClosingTime,
            Category: selectedRestaurantCategory.categoryName,
            OwnerPan: enterOwnerPanNumber,
            GstIn: enterGstinNumber,
            IfscCode: enterIfscCode,
            AccountNumber: enterAccountNumber,
            FssaiNumber: enterFssaiCertificate,
            Menu: "Sample Menu",
            Password: enterPassword,
            IsDeleted: false
        };

        RestaurantDetailsSignup(details).then((response) => {
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
    };
    useEffect(() => {
        if (filledStep === 'Docs') {
            setDocsActiveClass("_7RestaurantStepItem _7StepActive");
        }
        if (filledStep === 'menu') {
            setMenuActiveClass("_7RestaurantStepItem _7StepActive");
        }
        if (filledStep === 'Pass') {
            setPassActiveClass("_7RestaurantStepItem _7StepActive");
        }
    });
    useEffect(() => {
        GetRestaurantCategory()
            .then(response => {
                setRestaurantCategoryDetails(response.data);
                setSelectedRestaurantCategory(response.data[0]);
            })
            .catch(error => {
                console.error("An error occurred while adding address:", error);
            });
    }, []);

    const [selectedDays, setSelectedDays] = useState({
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
        Sunday: false,
    });

    const handleDayChange = (day) => {
        setSelectedDays((prevSelectedDays) => ({
            ...prevSelectedDays,
            [day]: !prevSelectedDays[day],
        }));
    };

    const selectAllDays = () => {
        const allSelected = Object.values(selectedDays).every((selected) => selected);
        setSelectedDays({
            Monday: !allSelected,
            Tuesday: !allSelected,
            Wednesday: !allSelected,
            Thursday: !allSelected,
            Friday: !allSelected,
            Saturday: !allSelected,
            Sunday: !allSelected,
        });
    };
    const submitOtpDetails = (event) => {
        event.preventDefault();
        const enteredOtp = enterOtp.join(''); // Combine the otp array into a single string
        const otpDetails = {
            ID: 0,
            Type: "Email",
            Details: enterEmailAddress,
            OTP: enteredOtp,
            DateTime: currentDateTime.toLocaleString(),
            Role: "Restaurant"
        }
        MatchOTP(otpDetails).then(response => {
            if (response.data.isSuccessful === false) {
                setErrorForOTP(response.data.message[0].reason);
            }
            else {
                submitAllDetails();
                setEnterOtpModel(false);
            }
        })
            .catch(error => {
                console.error("An error occurred while adding Signup:", error);
            });

    }

    const renderStepDetails = () => {
        if (filledStep === 'info') {
            return (
                <>
                    <h2 className="_7RestaurantHeading">Restaurant Information</h2>
                    <div className="_7RestaurantOneEachDetails">
                        <h3 className="_7RestaurantSubheading">Basic Details</h3>
                        <div className="_7RestaurantFormGroup">
                            <label htmlFor="_7RestaurantOwnerName">Owner's Full Name</label>
                            <input className="_7RestaurantRegisterInputs" onChange={(e) => setEnterOwnerFullName(e.target.value)} value={enterOwnerFullName } type="text" id="_7RestaurantOwnerName" />
                            <p className="_7RestaurantError">{enterOwnerFullNameError}</p>
                        </div>
                        <div className="_7RestaurantFormGroup">
                            <label htmlFor="_7RestaurantRestaurantName">Restaurant Name</label>
                            <input className="_7RestaurantRegisterInputs" onChange={(e) => setEnterRestaurantName(e.target.value)} value={enterRestaurantName} type="text" id="_7RestaurantRestaurantName" />
                            <p className="_7RestaurantError">{enterRestaurantNameError}</p>
                        </div>
                    </div>
                    <div className="_7RestaurantOneEachDetails">
                        <h3 className="_7RestaurantSubheading">Owner Contact Details</h3>
                        <div className="_7RestaurantFormGroup">
                            <label htmlFor="_7RestaurantOwnerEmail">Email address</label>
                            <input className="_7RestaurantRegisterInputs" onChange={(e) => setEnterEmailAddress(e.target.value)} value={enterEmailAddress} type="email" id="_7RestaurantOwnerEmail" />
                            <p className="_7RestaurantError">{enterEmailAddressError}</p>
                        </div>
                        <div className="_7RestaurantFormGroup">
                            <label htmlFor="_7RestaurantRestaurantMobile">Mobile Number</label>
                            <input className="_7RestaurantRegisterInputs" onChange={(e) => setEnterMobileNumber(e.target.value)} value={enterMobileNumber} type="number" id="_7RestaurantRestauranMobile" />
                            <p className="_7RestaurantError">{enterMobileNumberError}</p>
                        </div>
                        <div className="_7RestaurantFormGroup">
                            <label htmlFor="_7RestaurantRestaurantWhatsApp">WhatsApp Number</label>
                            <input className="_7RestaurantRegisterInputs" value={enterWhatsAppNumber} onChange={(e) => setEnterWhatsAppNumber(e.target.value)} type="number" id="_7RestaurantRestauranWhatsApp" />
                            <p className="_7RestaurantError">{enterWhatsAppNumberError}</p>
                        </div>
                    </div>
                    <div className="_7RestaurantOneEachDetails">
                        <div className="working-days-header">
                            <h3 className="_7RestaurantSubheading">Working days</h3>
                            <div onClick={selectAllDays} className="select-all-link">
                                Select all
                            </div>
                        </div>
                        <div className="working-days-content">
                            <div className="days-column">
                                {Object.keys(selectedDays).slice(0, 4).map((day) => (
                                    <div key={day} className="day-checkbox">
                                        <input
                                            className={selectedDays[day] ? '_7selectedDays' : '_7unselectedDays'}
                                            type="checkbox"
                                            id={day}
                                            checked={selectedDays[day]}
                                            onChange={() => handleDayChange(day)}
                                        />
                                        <label className="_7selectedDaysLabel" htmlFor={day}>{day}</label>
                                    </div>
                                ))}
                            </div>
                            <div className="days-column">
                                {Object.keys(selectedDays).slice(4).map((day) => (
                                    <div key={day} className="day-checkbox">
                                        <input
                                            className={selectedDays[day] ? '_7selectedDays' : '_7unselectedDays'}
                                            type="checkbox"
                                            id={day}
                                            checked={selectedDays[day]}
                                            onChange={() => handleDayChange(day)}
                                        />
                                        <label className="_7selectedDaysLabel" htmlFor={day}>{day}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <p className="_7RestaurantError">{selectedWorkingDaysError}</p>
                    </div>
                    <div className="_7RestaurantOneEachDetails">
                        <h3 className="_7RestaurantSubheading">Opening & Closing time</h3>
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <div className="_7RestaurantFormGroup" style={{ width: "40%" }} >
                                <label htmlFor="_7RestaurantOpningTime">Opning Time</label>
                                <input className="_7RestaurantRegisterInputs" onChange={(e) => setSelectedOpeningTime(e.target.value)} value={selectedOpeningTime} type="time" id="_7RestaurantOpningTime" />
                                <p className="_7RestaurantError">{selectedOpeningTimeError}</p>
                            </div>
                            <div className="_7RestaurantFormGroup" style={{ width: "40%" }}>
                                <label htmlFor="_7RestaurantClosingTime">Closing Time</label>
                                <input className="_7RestaurantRegisterInputs" onChange={(e) => setSelectedClosingTime(e.target.value)} value={selectedClosingTime} type="time" id="_7RestaurantClosingTime" />
                                <p className="_7RestaurantError">{selectedClosingTimeError}</p>
                            </div>
                        </div>
                    </div>
                    <div className="_7ProceedButton" onClick={submitRestaurantInfo }>
                        Proceed
                    </div>
                </>
            );
        } else if (filledStep === 'Docs') {            
            return (
                <>
                    <h2 className="_7RestaurantHeading">Restaurant Documents</h2>
                    <div className="_7RestaurantOneEachDetails">
                        <h3 className="_7RestaurantSubheading">What's your outlet-Type?</h3>
                        <p>The Determines whether We or you pay GST on the items sold. </p>
                        <div className="_7RestaurantFormGroup">
                            <div className="_7RestaurantRegisterInputs" style={{ display:"flex", justifyContent:"space-between", padding:"0 20px",alignItems:"center" } }>
                                <div className="_7RestaurantCategorySelectedName">
                                    {selectedRestaurantCategory?.categoryName}
                                </div>
                                <div onClick={() => setOpenSelectCategory(true)} className="_7RestaurantSelectButton">
                                    Edit
                                </div>                                
                            </div>
                            <p className="_7RestaurantError">{selectedRestaurantCategoryError}</p>
                        </div>                       
                    </div>
                    <div className="_7RestaurantOneEachDetails">
                        <h3 className="_7RestaurantSubheading">Enter PAN And GSTIN Details</h3>
                        <div className="_7RestaurantFormGroup">
                            <label htmlFor="_7RestaurantPanDocuments">Enter Owner Pan Number</label>
                            <input className="_7RestaurantRegisterInputs" onChange={(e) => setEnterOwnerPanNumber(e.target.value)} value={enterOwnerPanNumber} type="text" id="_7RestaurantPanDocuments" />
                            <p className="_7RestaurantError">{enterOwnerPanNumberError}</p>
                        </div>
                        <div className="_7RestaurantFormGroup">
                            <label htmlFor="_7RestaurantGstinDocuments">Enter GSTIN Number</label>
                            <input className="_7RestaurantRegisterInputs" onChange={(e) => setEnterGstinNumber(e.target.value)} value={enterGstinNumber} type="text" id="_7RestaurantGstinDocuments" />
                            <p className="_7RestaurantError">{enterGstinNumberError}</p>
                        </div>
                    </div>
                    <div className="_7RestaurantOneEachDetails">
                        <h3 className="_7RestaurantSubheading">Official Bank Details</h3>
                        <p>Payment for Cook With Us will be credited here </p>
                        <div className="_7RestaurantFormGroup">
                            <label htmlFor="_7RestaurantIfscCode">Enter IFSC Code</label>
                            <input className="_7RestaurantRegisterInputs" onChange={(e) => setEnterIfscCode(e.target.value)} value={enterIfscCode} type="text" id="_7RestaurantIfscCode" />
                            <p className="_7RestaurantError">{enterIfscCodeError}</p>
                        </div>
                        <div className="_7RestaurantFormGroup">
                            <label htmlFor="_7RestaurantAccountNumber">Enter Account Number</label>
                            <input className="_7RestaurantRegisterInputs" onChange={(e) => setEnterAccountNumber(e.target.value)} value={enterAccountNumber} type="number" id="_7RestaurantAccountNumber" />
                            <p className="_7RestaurantError">{enterAccountNumberError}</p>
                        </div>
                    </div>
                    <div className="_7RestaurantOneEachDetails">
                        <h3 className="_7RestaurantSubheading">FSSAI Certificate</h3>
                        <p>
                            <ul>
                                <li>The FSSAI certificate should either match the name of the restaurant or the owner</li>
                                <li>The address on FSSAI certificate should match the address of the restaurant</li>
                                <li>The FSSAI certificate should not be expiring before 30 days</li>
                            </ul>
                        </p>
                        <div className="_7RestaurantFormGroup">
                            <label htmlFor="_7RestaurantFssaiNumber">FSSAI Certificate Number</label>
                            <input className="_7RestaurantRegisterInputs" onChange={(e) => setEnterFssaiCertificate(e.target.value)} value={enterFssaiCertificate} type="text" id="_7RestaurantFssaiNumber" />
                            <p className="_7RestaurantError">{enterFssaiCertificateError}</p>
                        </div>
                    </div>
                    <div className="_7ProceedButton" onClick={submitRestaurantDocs}>
                        Proceed
                    </div>
                </>
            );
        } else if (filledStep === 'menu') {
            return (
                <>
                    <div className="_7RestaurantOneEachDetails">
                        <h3 className="_7RestaurantSubheading">MENU</h3>
                        <div className="_7RestaurantFormGroup">
                            <label htmlFor="_7RestaurantMenu">Upload Menu Here</label>
                            <input className="_7RestaurantRegisterInputs" onChange={handleMenuInputChange} type="file" id="_7RestaurantMenu" />
                            <p className="_7RestaurantError">{uploadMenuError}</p>
                        </div>                        
                        <div className="_7ProceedButton" onClick={submitRestaurantMenu }>
                            Submit
                        </div>
                    </div>
                </>
            );
        }
        else if (filledStep === 'Pass') {
            return (
                <>
                    <h2 className="_7RestaurantHeading">Password</h2>                    
                    <div className="_7RestaurantOneEachDetails">
                        <h3 className="_7RestaurantSubheading">Enter Password</h3>
                        <div className="_7RestaurantFormGroup">
                            <label htmlFor="_7RestaurantPanDocuments">Enter Password</label>
                            <input className="_7RestaurantRegisterInputs" onChange={(e) => setEnterPassword(e.target.value)} value={enterPassword} type="password" id="_7RestaurantPanDocuments" />
                            <p className="_7RestaurantError">{enterPasswordError}</p>
                        </div>
                        <div className="_7RestaurantFormGroup">
                            <label htmlFor="_7RestaurantGstinDocuments">Enter Confirm Password</label>
                            <input className="_7RestaurantRegisterInputs" onChange={(e) => setEnterConfirmPassword(e.target.value)} value={enterConfirmPassword} type="text" id="_7RestaurantGstinDocuments" />
                            <p className="_7RestaurantError">{enterConfirmPasswordError}</p>
                        </div>
                    </div>                    
                    <div className="_7ProceedButton" onClick={submitRestaurantPass}>
                        Proceed
                    </div>
                </>
            );
        }

    }
    return (
        <>
            <div className="_7SignUpRestaurantPage">
                <div className="_7SignupRestaurantPageTopbar">
                    <div className="_7logoName">
                        COOK WITH US
                    </div>
                    <div className="_7rightSide">
                        <div className="_7loginButton">
                            Already Have Account <div onClick={() => setSignUp(false)} style={{color:"green",cursor:"pointer",textDecoration:"underline"} }>Login Here</div>
                        </div>
                        <div className="_7FAQs">
                            FAQs
                        </div>                        
                    </div>
                </div>
                <div className="_7RestaurantContainer">
                    <div className="_7RestaurantSidebar">
                        <ul className="_7RestaurantStepList">
                            <li className="_7RestaurantStepItem _7StepActive">
                                <div className="_7RestaurantStepNumber">STEP 1</div>
                                <div className="_7RestaurantStepTitle">Restaurant Information</div>
                                {filledStep === "info" && (
                                    <>
                                        <div className="_7RestaurantStepDescription">
                                            Location, Owner details, Open & Close hrs.
                                        </div>
                                    </>
                                ) }
                                <div className="_7RestaurantEditLink">
                                    <a href="/">Edit Information</a>
                                </div>
                            </li>
                            <li className={docsActiveClass}>
                                <div className="_7RestaurantStepNumber">STEP 2</div>
                                <div className="_7RestaurantStepTitle">Restaurant Documents</div>
                                {filledStep === "Docs" && (
                                    <>
                                        <div className="_7RestaurantStepDescription">
                                            FSSAI, PAN,GST and Bank account.
                                        </div>
                                    </>
                                )}                                
                            </li>
                            <li className={menuActiveClass }>
                                <div className="_7RestaurantStepNumber">STEP 3</div>
                                <div className="_7RestaurantStepTitle">Menu Setup</div>
                                {filledStep === "menu" && (
                                    <>
                                        <div className="_7RestaurantStepDescription">
                                            Menu Image
                                        </div>
                                    </>
                                )}
                            </li>     
                            <li className={passActiveClass}>
                                <div className="_7RestaurantStepNumber">STEP 4</div>
                                <div className="_7RestaurantStepTitle">Password</div>
                                {filledStep === "Pass" && (
                                    <>
                                        <div className="_7RestaurantStepDescription">
                                            Password And Confirm Password
                                        </div>
                                    </>
                                )}
                            </li>     
                        </ul>
                    </div>
                    <div className="_7RestaurantMainContent">
                        <form className="_7RestaurantForm">                            
                            {renderStepDetails()}
                        </form>
                    </div>
                </div>
            </div>
            {openSelectCategory &&
                (
                    <>
                    <div className="_7blurFullDisplay">
                    <div className="_7sideBarSelectCategoryLayout">
                        <div className="_7restaurantCategoryTopbar">
                            <div className="_7restaurantCategoryTopbarText">
                                Select Your Outlet Type
                            </div>
                                <div onClick={() => setOpenSelectCategory(false)} className="_7restaurantCategoryTopbarCut">
                                <X/>
                            </div>
                        </div>
                            <div className="_7sideBarSelectCategory">      
                                {restaurantCategoryDetails && restaurantCategoryDetails.map((category, index) => (
                                    <div key={index} className="_7restaurantCategory">
                                        <div className="_7restaurantCategorySelectThis">
                                            <div className="_7restaurantCategoryName">{category.categoryName}</div>
                                            <div onClick={() => { setSelectedRestaurantCategory(category); setOpenSelectCategory(false); }} className="_7restaurantCategorySelectButton">Select</div>
                                        </div>
                                        <div className="_7restaurantFoodType">{category.foodTypeDescription}</div>
                                        <div className="_7restaurantGst">{category.gstInfo}</div>
                                    </div>
                                ))}                      
                            </div>
                        </div>
                    </div>
                    </>
                )    
            }
            {enterOtpModel && (
                <>
                    <div className="_7blurFullDisplay" style={{display:"flex",justifyContent:"center",justifyContent:"center",alignItems:"center"} }>
                        <div className="_8modelLayout">
                            <div className="_8otpDetailsText">OTP DETAILS</div>
                            <form onSubmit={handleMobileNextClick} style={{ padding: "50px" }}>
                                
                                <div className="inputContainer" >
                                        <label htmlFor="selectBox" style={{ fontWeight: "600", fontSize: "20px" }}>Enter OTP Here</label>
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
                                                    style={{ width: '40px', textAlign: 'center', height: '40px', borderRadius: '10px', fontSize: '20px', fontWeight: 600, }}
                                                />
                                            ))}
                                        </div>
                                        <div onClick={handleResendOTP} style={{ cursor: "pointer", display: "flex", justifyContent: "end", color: "blue", fontWeight: "500", fontSize: "15px" }}>Resend OTP</div>
                                        {errorForOTP && (<div style={{ color: "red", fontWeight: "500", fontSize: "15px" }}>{errorForOTP}</div>)}
                                 </div>                                
                            
                                <div className="_8otpDetailsButton">
                                    <div onClick={() =>setEnterOtpModel(false)} className="_8otpDetailsCancelButton">
                                        CANCEL
                                    </div>
                                    <div type="submit" onClick={submitOtpDetails} className="_8otpDetailsSubmitButton">
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