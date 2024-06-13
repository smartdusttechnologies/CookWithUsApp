import React, { useRef, useState, useEffect } from "react";
import useLocation from "../../hooks/useLocation";
import GoogleMapComponent from "../../Components/GoogleMapComponent/GoogleMapComponent ";
import { AddAddress } from "../../services/UserService";
import "./AddAddress.css";

export default function PhoneAddAddress({ SetAddPopUp }) {

    const [flatNo, setFlatNo] = useState("");
    const [landmark, setLandmark] = useState("");
    const [tag, setTag] = useState("");
    const [hideMap, setHideMap] = useState(false);

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
            Id: 0,
            Address: "testing address",
            LandMark: document.getElementById("landmark").value,
            LocationType: LocationType,
            Building: document.getElementById("building").value


        };
        AddAddress(Details)
            .then(response => {

                console.log("Address added successfully:", response);
                SetAddPopUp(false);
            })
            .catch(error => {

                console.error("An error occurred while adding address:", error);
            });


    };

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
                    element.style.fontWeight = '500';
                    element.style.color = '#282c3f';
                } else {
                    element.style.fontWeight = '';
                    element.style.color = '';
                }
            }

        });
    };
    const hideMapRef = useRef(null);
    useEffect(() => {
        if (hideMap) {
            hideMapRef.current.style.transform = 'unset';
        }
        else {
            hideMapRef.current.style.transform = 'translateY(60%)';
        }
    }, [hideMap]);
    const handleBackButton=()=>{
        if (hideMap) {
            setHideMap(false);
        }
        else {
            SetAddPopUp(false);
        }
    }
    return (
        <>
            <div  className="_2yoTv" style={{ zIndex: 9999999, position: 'fixed', top: 0, right: 0, background: 'white', left: 0 }}>
                <div style={{paddingTop: '56px', height: '100%'}}>
                    <div data-testid="common-header" className="_3gfxq swiggy-add-ios-padding">
                        <div className="eR8c-">
                            <button onClick={handleBackButton} className="_2QN4q" data-cy="back-button" aria-label="Double tap to go back">
                                <svg className="uHGrw" viewBox="0 0 32 32" height="18" width="18">
                                    <path d="M3.333 14.984l28.667-0v2.097l-0.16 0.006h-28.506l-0.16-0.16v-1.782l0.16-0.16zM1.114 14.986l10.079-10.079 0.121-0.108 1.465 1.467-0.101 0.127-10.079 10.079h-0.226l-1.26-1.26v-0.226zM12.679 25.676l0.108 0.117-1.468 1.484-0.126-0.115-10.079-10.079v-0.226l1.26-1.26h0.226l10.079 10.079zM3.268 12.87l0.272 0.116-0.022 6.125-0.272 0.114-3.245-3.18 0.111-0.112 3.157-3.062z"></path>
                                </svg>
                            </button>
                            <div className="_1jnwd" data-testid="common-header-content">
                                <div className="anfG9">
                                    <div className="_2O4ey">ADD ADDRESS</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="_2w09q _2nZmJ">
                        <div className="vvaPz">
                            <div ref={hideMapRef} className="_3D1HA _3qkct">
                                <div className="_3dp6z">
                                    <h2 className="_100ez">Save delivery location</h2>
                                    <div className="_1IC3n _2Yn2B">
                                        <label className="uyQrW _14_73" htmlFor="address-string">ADDRESS</label>
                                        <input
                                            id="address-string"
                                            className="_2eSrj"
                                            placeholder=""
                                            readOnly
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                    </div>
                                    <div className="_1IC3n _2Yn2B">
                                        <label className="uyQrW" htmlFor="building">HOUSE / FLAT NO</label>
                                        <input
                                            id="building"
                                            className="_2eSrj"
                                            maxLength="100"
                                            value={flatNo}
                                            onChange={(e) => setFlatNo(e.target.value)}
                                            placeholder=""
                                            onClick={()=>setHideMap(true) }
                                        />
                                    </div>
                                    <div className="_1IC3n _2Yn2B">
                                        <label className="uyQrW" htmlFor="landmark">LANDMARK</label>
                                        <input
                                            id="landmark"
                                            className="_2eSrj"
                                            placeholder=""
                                            maxLength="100"
                                            value={landmark}
                                            onChange={(e) => setLandmark(e.target.value)}
                                            onClick={() => setHideMap(true)}
                                        />
                                    </div>
                                    <div className="_1OdPa">
                                        <div className="_2qiu-">TAG AS</div>
                                        <div className="OTs-9">
                                            <div className="_14IAq">
                                                <div className="DalMo EBqIH" role="button" aria-label="HOME" id="home" onClick={() => handleLocationType("home")}>
                                                    <span className="_3Ey3V icon-home _1nXIx"></span>HOME
                                                </div>
                                                <div className="DalMo" role="button" aria-label="WORK" id="work" onClick={() => handleLocationType("work")}>
                                                    <span className="_3Ey3V icon-work _1nXIx"></span>WORK
                                                </div>
                                                <div className="DalMo " role="button" aria-label="OTHER" id="other" onClick={() => handleLocationType("other")}>
                                                    <span className="_3Ey3V icon-location _1nXIx"></span>OTHER
                                                </div>
                                            </div>
                                            <div className="_3ocSf">
                                                <i className="icon-markerDark _1E2ZW"></i>
                                                <input
                                                    type="text"
                                                    className="_2HUrr"
                                                    maxLength="20"
                                                    value={tag}
                                                    onChange={(e) => setTag(e.target.value)}
                                                />
                                                <span className="_1-i3i" role="button" tabIndex="0" aria-label="Cancel">Cancel</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="_3JGzG x-Lri _2YPAH">
                                        <button className="_1vTVI _2UPEv" data-cy="primary-button" onClick={handleSubmit}>SAVE AND PROCEED</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="_1r-M3 _3JaG6 _3C3Tg"></div>
                <div className="_3JaG6 _3C3Tg"></div>
            </div>
        </>
    );
}