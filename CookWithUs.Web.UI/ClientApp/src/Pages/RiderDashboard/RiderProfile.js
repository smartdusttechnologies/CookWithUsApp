import React, { useContext, useState, useEffect } from "react";
import "./Dashboard.css";
import { User } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';
import AuthContext from "../AuthProvider";
import { RiderGetById } from "../../services/riderServices";

export default function RiderProfile() {
    const { auth } = useContext(AuthContext); // Removed unused setAuth and logOut
    const [user, setUser] = useState(null);

    // Function to get rider details
    const getDetailsOfRider = () => {
        if (auth.isAuthenticated) {
            const token = localStorage.getItem('jwtToken');
            if (token) {
                const decodedToken = jwtDecode(token);
                const RiderId = decodedToken.UserId;

                RiderGetById(RiderId)
                    .then(response => {
                        setUser(response.data);
                    })
                    .catch(error => {
                        console.error("An error occurred while fetching rider details:", error);
                    });
            }
        }
    };

    useEffect(() => {
        getDetailsOfRider();
    }, []);

    return (
        <div className="_9RiderProfileMain">
            {user ? ( // Check if user data is available
                <>
                    <div className="_9RiderProfilePicRow">
                        <div className="_9RiderProfilePic">
                            <img src={user.image} alt="Base64 Image" className="_9RiderProfieIcon" />
                            <div className="_9RiderUserName">
                                {`${user.firstName} ${user.lastName}`}
                            </div>
                        </div>
                    </div>
                    <div className="_9RiderScrollY">

                        <div className="_9RiderDetailsCard">
                            <h5>User Information</h5>
                            <UserInfo label="Area" value={user.area} />
                            <UserInfo label="Vehicle Type" value={user.vechicleType} />
                            <UserInfo label="Shift" value={user.shift} />
                            <UserInfo label="Door No" value={user.doorNo} />
                            <UserInfo label="Street" value={user.street} />
                            <UserInfo label="City" value={user.city} />
                            <UserInfo label="Pincode" value={user.pincode} />
                            <UserInfo label="Landmark" value={user.landMark} />
                            <UserInfo label="Gender" value={user.gender} />
                        </div>

                        <div className="_9RiderDetailsCard">
                            <h5>Bank Details</h5>
                            <UserInfo label="Bank Name" value={user.bankName} />
                            <UserInfo label="Account Number" value={user.accountNumber} />
                            <UserInfo label="IFSC Code" value={user.ifscCode} />
                        </div>
                        <div className="_9RiderDetailsCard">
                            <h5>Pan Card</h5>
                            <img src={user.panCard} alt="Base64 Image" style={{ width: "200px", height: "auto" }} />
                        </div>
                        <div className="_9RiderDetailsCard">
                            <h5>Drivring Licence</h5>
                            <h6>Front</h6>
                            <img src={user.drivingLicenceFront} alt="Base64 Image" style={{ width: "200px", height: "auto" }} />
                            <h6>Back</h6>
                            <img src={user.drivingLicenceBack} alt="Base64 Image" style={{ width: "200px", height: "auto" }} />
                        </div>

                    </div>
                </>
            ) : (
                <div>Loading...</div> // Display loading text while fetching data
            )}
        </div>
    );
}

// UserInfo component to display individual user details
const UserInfo = ({ label, value }) => (
    <div className="_9RiderUserInfo">
        <div className="_9RiderLabel">{label}</div>
        <div className="_9RiderValue">{value || "N/A"}</div> {/* Handle undefined values */}
    </div>
);
