import React, { useState,useEffect } from "react";
import "./RiderContinueWithSignup.css";
import MobileNumberDetails from "./RiderSignup/MobileNumberDetails";
import WorkingCity from "./RiderSignup/WorkingCity";
import VehicleType from "./RiderSignup/VehicleType";
import ShiftPreference from "./RiderSignup/ShiftPreference";
import PersonalDetails from "./RiderSignup/PersonalDetails";
import GenderDetails from "./RiderSignup/GenderDetails";
import BankDetails from "./RiderSignup/BankDetails";
import PanCard from "./RiderSignup/PanCard";
import DrivingLicence from "./RiderSignup/DrivingLicence";
import UploadPic from "./RiderSignup/UploadPic";
import { RiderSignup } from "../../services/riderServices";
import RiderSignupTopBar from "../../Components/RiderUi/RiderSignupTopBar";
import OtpDetails from "./RiderSignup/OtpDetails";
import PasswordDetails from "./RiderSignup/PasswordDetails";

export default function RiderContinueWithSignup( { continueWith,setContinueWith }) {
    const [mobileNumberDetailsStep, setMobileNumberDetailsStep] = useState(false);
    const [otpDetailsStep, setOtpDetailsStep] = useState(false);
    const [passwordDetailsStep, setPasswordDetailsStep] = useState(false);
    const [workingCityStep, setWorkingCityStep] = useState(false);
    const [vechicleTypeStep, setVechicleTypeStep] = useState(false);
    const [siftPrefranceStep, setSiftPrefranceStep] = useState(false);
    const [personalDetailsStep, setPersonalDetailsStep] = useState(false);
    const [genderDetailsStep, setGenderDetailsStep] = useState(false);
    const [bankDetailsStep, setBankDetailsStep] = useState(false);
    const [pancardStep, setPanCardStep] = useState(false);
    const [drivringLicenceStep, setDrivringLicenceStep] = useState(false);
    const [upladPicStep, setUploadPicStep] = useState(false);
    const allStepsFalse = !mobileNumberDetailsStep && !otpDetailsStep && !passwordDetailsStep && !workingCityStep && !vechicleTypeStep && !siftPrefranceStep && !personalDetailsStep && !genderDetailsStep && !bankDetailsStep && !pancardStep && !drivringLicenceStep && !upladPicStep;
    const [mobile, setMobile] = useState();
    const [password, setPassword] = useState();
    const [area, setArea] = useState();
    const [vechicleType, setVechicleType] = useState();
    const [shift, setShift] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [doorNo, setDoorNo] = useState();
    const [street, setStreet] = useState();
    const [city, setCity] = useState();
    const [pincode, setPincode] = useState();
    const [landMark, setLandMark] = useState();
    const [gender, setGender] = useState();
    const [bankName, setBankName] = useState();
    const [accountNumber, setAccountNumber] = useState();
    const [ifscCode, setIfscCode] = useState();
    const [panCard, setPanCard] = useState();//--image
    const [drivingLicenceFront, setDrivingLicenceFront] = useState();//--image
    const [drivingLicenceBack, setDrivingLicenceBack] = useState(); //--image
    const [image, setImage] = useState(); //--image
    const [inputType, setInputType] = useState('text'); // Default input type
    const handleSubmit = () => {
        const details = {
            Id: 0,
            Mobile: mobile,
            Area: area,
            VechicleType: vechicleType,
            Shift: shift,
            FirstName: firstName,
            LastName: lastName,
            DoorNo: doorNo,
            Street: street,
            City: city,
            Pincode: pincode,
            LandMark: landMark,
            Gender: gender,
            BankName: bankName,
            AccountNumber: accountNumber,
            IfscCode: ifscCode,
            PanCard: panCard,
            DrivingLicenceFront: drivingLicenceFront,
            DrivingLicenceBack: drivingLicenceBack,
            Image: image,
            IsDeleted: false,
            Password:password
        }
        RiderSignup(details)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error("An error occurred while adding Signup:", error);
            });
    }
    return (
        <>
            {allStepsFalse && (
                <>
                    <RiderSignupTopBar continueWith={continueWith} backClickEvent={() => setContinueWith(null)}  stepName={"PROFILE DETAILS" } />
                    <div className="_6RiderLoginPage">
                        <div className="_6RiderLoginButton">
                            <div onClick={() => setMobileNumberDetailsStep(true)} className="_6RiderLogin">
                                NEXT
                            </div>
                        </div>
                    </div>
                </>
            )}
            {mobileNumberDetailsStep &&
                <>
                    <RiderSignupTopBar continueWith={continueWith}  backClickEvent={() => setMobileNumberDetailsStep(false)} stepName={"ENTER MOBILE NUMBER"} />
                    <MobileNumberDetails mobile={mobile} setMobileNumberDetailsStep={setMobileNumberDetailsStep} setOtpDetailsStep={setOtpDetailsStep} setMobile={setMobile} inputType={inputType} setInputType={setInputType}  />
                </>
            }
            {otpDetailsStep &&
                <>
                    <RiderSignupTopBar continueWith={continueWith}  backClickEvent={() => { setOtpDetailsStep(false); setMobileNumberDetailsStep(true); }} stepName={"ENTER OTP"} />
                    <OtpDetails mobile={mobile} setOtpDetailsStep={setOtpDetailsStep} setPasswordDetailsStep={setPasswordDetailsStep} inputType={inputType} setInputType={setInputType} />
                </>
            }
            {passwordDetailsStep &&
                <>
                    <RiderSignupTopBar continueWith={continueWith}  backClickEvent={() => { setWorkingCityStep(false); setMobileNumberDetailsStep(true); }} stepName={"SET YOUR PASSWORD"} />
                    <PasswordDetails password={password} setPasswordDetailsStep={setPasswordDetailsStep} setWorkingCityStep={setWorkingCityStep} setPassword={setPassword} />
                </>
            }
            {workingCityStep && 
                <>
                    <RiderSignupTopBar continueWith={continueWith}  backClickEvent={() => {setWorkingCityStep(false); setMobileNumberDetailsStep(true);}} stepName={"SELECT WORKING CITY"} />
                    <WorkingCity area={area} setWorkingCityStep={setWorkingCityStep} setVechicleTypeStep={setVechicleTypeStep} setArea={setArea} />
                </>    
            }
            {vechicleTypeStep && 
                <>
                    <RiderSignupTopBar continueWith={continueWith}  backClickEvent={() => { setWorkingCityStep(true); setVechicleTypeStep(false); }} stepName={"SELECT VEHICLE TYPE"} />
                    <VehicleType vechicleType={vechicleType} setVechicleTypeStep={setVechicleTypeStep} setSiftPrefranceStep={setSiftPrefranceStep} setVechicleType={setVechicleType} />
                </>
            }
            {siftPrefranceStep && 
                <>
                    <RiderSignupTopBar continueWith={continueWith}  backClickEvent={() => { setVechicleTypeStep(true); setSiftPrefranceStep(false); }} stepName={"SELECT SHIFT PREFRANCE"} />
                    <ShiftPreference shift={shift} setPersonalDetailsStep={setPersonalDetailsStep} setSiftPrefranceStep={setSiftPrefranceStep} setShift={setShift} />
                </>
            }
            {personalDetailsStep && 
                <>
                    <RiderSignupTopBar continueWith={continueWith}  backClickEvent={() => { setSiftPrefranceStep(true); setPersonalDetailsStep(false); }} stepName={"ENTER PERSONAL DETAILS"} />
                    <PersonalDetails setPersonalDetailsStep={setPersonalDetailsStep} setGenderDetailsStep={setGenderDetailsStep} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} doorNo={doorNo} setDoorNo={setDoorNo} street={street} setStreet={setStreet} city={city} setCity={setCity} pincode={pincode} setPincode={setPincode} landMark={landMark} setLandMark={setLandMark} />
                </>
            }
            {genderDetailsStep && 
                <>
                    <RiderSignupTopBar continueWith={continueWith}  backClickEvent={() => { setPersonalDetailsStep(true); setGenderDetailsStep(false); }} stepName={"SELECT GENDER"} />
                    <GenderDetails setGenderDetailsStep={setGenderDetailsStep} setBankDetailsStep={setBankDetailsStep} setGender={setGender} gender={gender} />
                </>    
            }
            {bankDetailsStep && 
                <>
                    <RiderSignupTopBar continueWith={continueWith}  backClickEvent={() => { setGenderDetailsStep(true); setBankDetailsStep(false); }} stepName={"ENTER BANK DETAILS"} />
                    <BankDetails setBankDetailsStep={setBankDetailsStep} setPanCardStep={setPanCardStep} setBankName={setBankName} bankName={bankName} setAccountNumber={setAccountNumber} accountNumber={accountNumber} setIfscCode={setIfscCode} ifscCode={ifscCode } />
                </>    
            }
            {pancardStep && 
                <>
                    <RiderSignupTopBar continueWith={continueWith}  backClickEvent={() => { setBankDetailsStep(true); setPanCardStep(false); }} stepName={"PAN CARD"} />
                    <PanCard setPanCardStep={setPanCardStep} setDrivringLicenceStep={setDrivringLicenceStep} setPanCard={setPanCard} panCard={panCard } />
                </>    
            }
            {drivringLicenceStep && 
                <>
                    <RiderSignupTopBar continueWith={continueWith}  backClickEvent={() => { setPanCardStep(true); setDrivringLicenceStep(false); }} stepName={"DRIVRING LICENCE"} />
                    <DrivingLicence setDrivringLicenceStep={setDrivringLicenceStep} setUploadPicStep={setUploadPicStep} setDrivingLicenceFront={setDrivingLicenceFront} drivingLicenceFront={drivingLicenceFront} setDrivingLicenceBack={setDrivingLicenceBack} drivingLicenceBack={drivingLicenceBack } />
                </>    
            }
            {upladPicStep && 
                <>
                    <RiderSignupTopBar continueWith={continueWith}  backClickEvent={() => { setDrivringLicenceStep(true); setUploadPicStep(false); }} stepName={"PROFILE PIC"} />
                    <UploadPic setUploadPicStep={setUploadPicStep} setImage={setImage} image={image} handleSubmit={handleSubmit }  />
                </>    
            }
        </>
    );
}
