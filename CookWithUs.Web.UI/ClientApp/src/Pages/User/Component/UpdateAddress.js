import React, { useRef, useState, useEffect } from "react";
import useLocation from "../../../hooks/useLocation";
import GoogleMapComponent from "../../../Components/GoogleMapComponent/GoogleMapComponent ";
import { AddAddress } from "../../../services/UserService";
import { AddressUpdate } from "../../../services/UserService";

const UpdateAddress = ({

    setIsSidebarOpen, IsSidebarOpen, addressDetails }
) => {
    const [currentAddress, setCurrentAddress] = useState({
        landMark: addressDetails.landMark,
        building:addressDetails.building,
    });
    const [currentLocation, setCurrentLocation] = useState(null);
    const { location, loading, getCurrentLocation } = useLocation();
    const [LocationType, SetLocationType] = useState(null);
    const [address, setAddress] = useState('');
    const [addedClasses, setAddedClasses] = useState(false);

    useEffect(() => {


        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCurrentLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                },
                (error) => {
                    console.error('Error getting current location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }, []);

    useEffect(() => {
        setAddress(location.address)
        if (currentLocation) {
            const apiKey = 'AIzaSyCzNP5qQql2a5y8lOoO-1yj1lj_tzjVImA';
            fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${25.5773124},${85.0434436}&key=${apiKey}`)
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'OK') {
                        const formattedAddress = data.results[0].formatted_address; // Corrected to formatted_address
                        setAddress(formattedAddress); // Assuming setAddress is a function to set the address in your application
                    } else {
                        console.error('Geocoding failed:', data.status);
                    }
                })
                .catch(error => {
                    console.error('Error fetching address:', error);
                });
        }
    }, [currentLocation]);



    const handleSubmit = () => {
        const Details = {
            UserId: 1,
            Id: addressDetails.id,
            Address: address,
            LandMark: document.getElementById("landmark").value,
            LocationType: LocationType,
            Building: document.getElementById("building").value


        };
        AddressUpdate(Details)
            .then(response => {

                console.log("Address added successfully:", response);
            })
            .catch(error => {

                console.error("An error occurred while adding address:", error);
            });


    };
    const sidebarOpenClose = () => {


        setIsSidebarOpen(false);
    }


    const handleInput = (event) => {
        const nextSibling1 = event.target.nextSibling;
        const nextSibling2 = nextSibling1.nextSibling;

        // Check if the classes exist before adding
        if (!addedClasses) {
            if (!nextSibling1.classList.contains("_26LFr")) {
                nextSibling1.classList.add("_26LFr");
            }
            if (!nextSibling2.classList.contains("_2tL9P")) {
                nextSibling2.classList.add("_2tL9P");
            }
            setAddedClasses(true);
        }
    }
    useEffect(() => {
        if (addressDetails.locationType === "home") {
            SetLocationType("home");
        } else if (addressDetails.locationType === "work") {
            SetLocationType("work");
        } else if (addressDetails.locationType === "other") {
            SetLocationType("other");
        }
    }, [addressDetails.locationType]);
    useEffect(() => {
        const handleOutsideClick = (event) => {
            const inputElements = document.querySelectorAll('input[name="building"], input[name="landmark"]');
            const nextSiblings = document.querySelectorAll('input[name="building"] + div, input[name="landmark"] + div');

            if (!inputElements || !nextSiblings) return;

            inputElements.forEach((input, index) => {
                if (input.value === "") {
                    if (event.target !== input && event.target !== nextSiblings[index]) {
                        nextSiblings[index].classList.remove("_26LFr");
                        nextSiblings[index].nextElementSibling.classList.remove("_2tL9P");
                        setAddedClasses(false);
                    }
                }
            });
        };

        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);
    const handleLocationType = (id) => {
        const IdList = ["other", "home", "work"];


        IdList.forEach((itemId) => {

            const element = document.getElementById(itemId);
            if (element) {

                if (itemId === id) {
                    SetLocationType(id);
                    element.style.background = "black";
                    element.style.color = "white";
                } else {

                    element.style.background = "";
                    element.style.color = "";
                }
            }
        });
    };
    return (

        <div className={IsSidebarOpen ? "" : "Sidebar-closed"}>

            <div className="FYlIl"></div>

            <div className="_3vi_e" style={{ left: "0px", right: "auto", transform: "translate(0%, 0px)" }}>
                <div className="_12S7_">
                    <form onSubmit={handleSubmit}>
                        <div className="_3btQx">sticky_sentinel sticky_sentinel--top</div>
                        <div style={{ paddingLeft: '112px', paddingRight: '40px', width: '442px', zIndex: '2' }}>
                            <div className="_1L8WG" onClick={sidebarOpenClose}>
                                <span className="SSFcO icon-close"></span>
                                <div className="_2Joay">Save delivery address</div>
                            </div>
                        </div>
                        <div style={{ paddingLeft: '80px', paddingRight: '40px', width: '442px' }}>
                            <div>
                                <GoogleMapComponent
                                    origin={{ lat: location?.latitude, lng: location?.longitude }}
                                />
                            </div>

                            <div className="_3Um38 _9Wk87">
                                <input
                                    className="_381fS"
                                    disabled
                                    type="text"
                                    name=""
                                    value={address}
                                    readOnly
                                />
                                <div className="_2EeI1 _26LFr"></div>
                                <label className="_1Cvlf _2tL9P">Address</label>
                            </div>

                            <div className="jbXOs">
                                <div className="_3Um38 _23P1X*">
                                    <input
                                        className="_381fS"
                                        type="text"
                                        name="building"
                                        id="building"
                                        tabIndex="1"
                                        autoComplete="off"
                                        value={currentAddress.building}
                                        onClick={handleInput}
                                        onChange={e => setCurrentAddress({ ...currentAddress, building: e.target.value })}
                                    />
                                    <div className="_2EeI1 _26LFr"></div>
                                    <label className="_1Cvlf _2tL9P" htmlFor="building">Door / Flat No.</label>

                                </div>

                                <div className="_3Um38 _23P1X">
                                    <input

                                        className="_381fS"
                                        type="text"
                                        name="landmark"
                                        id="landmark"
                                        tabIndex="1"
                                        autoComplete="off"
                                        value={currentAddress.landMark}
                                        onClick={handleInput}
                                        onChange={e => setCurrentAddress({ ...currentAddress, landMark:e.target.value})}
                                    />
                                    <div className="_2EeI1 _26LFr"></div>
                                    <label className="_1Cvlf _2tL9P" htmlFor="landmark">Landmark</label>
                                </div>

                                <div className="_2i256">
                                    <div style={{ backgroundColor: addressDetails.locationType === "home" ? "black" : "", color: addressDetails.locationType === "home" ? "white" : "" }} className="_1dzL9" id="home" onClick={() => handleLocationType("home")}> 
                                        <span className="_3Ey3V icon-home"></span>
                                        <div className="sf8jl">Home</div>
                                    </div>
                                    <div style={{ backgroundColor: addressDetails.locationType === "work" ? "black" : "", color: addressDetails.locationType === "work" ? "white" : ""  }} className="_1dzL9" id="work" onClick={() => handleLocationType("work")}> 
                                        <span className="_3Ey3V icon-work"></span>
                                        <div className="sf8jl">Work</div>
                                    </div>
                                    <div style={{ backgroundColor: addressDetails.locationType === "other" ? "black" : "", color: addressDetails.locationType === "other" ? "white" : ""  }} className="_1dzL9" id="other" onClick={() => handleLocationType("other")}> 
                                        <span className="_3Ey3V icon-location"></span>
                                        <div className="sf8jl">Other</div>
                                    </div>
                                </div>

                            </div>


                        </div>
                        <div className="" style={{ paddingLeft: '80px', paddingRight: '40px', width: '442px' }}>
                            <div className="gbzB0">
                                <div className="_25qBi">
                                    <button type="submit" className="_2sd1x">
                                        UPDATE ADDRESS
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </div >



    );
};


export default UpdateAddress;
