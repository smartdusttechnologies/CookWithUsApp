import React, { useState, useEffect } from "react";
import useLocation from "../../hooks/useLocation";
import GoogleMapComponent from "../../Components/GoogleMapComponent/GoogleMapComponent ";


const AddressUpdate = () => {
    const [currentLocation, setCurrentLocation] = useState(null);
    const { location, loading, getCurrentLocation } = useLocation();

    const [address, setAddress] = useState('');
    const [doorLandmark, setDoorLandmark] = useState('');

    useEffect(() => {
        // Fetch current location
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

    const handleDoorLandmarkChange = (event) => {
        setDoorLandmark(event.target.value);
    };

    const handleSubmit = () => {

        console.log('Address:', address);
        console.log('Door/Landmark:', doorLandmark);
    };
    return (

        <div>
            <div className="FYlIl"></div>
            <div className="_3vi_e" style={{ left: '0px', right: 'auto', transform: 'translate(0%, 0px)' }}>
                <div className="_12S7_">
                    <div className="_3btQx">sticky_sentinel sticky_sentinel--top</div>
                    <div style={{ paddingLeft: '112px', paddingRight: '40px', width: '442px', zIndex: '2' }}>
                        <div className="_1L8WG">
                            <span className="SSFcO icon-close"></span>
                            <div className="_2Joay">Save delivery address</div>
                        </div>
                    </div>
                    <div style={{ paddingLeft: '80px', paddingRight: '40px', width: '442px' }}>

                        <div class="" >
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
                            <div>
                                <div className="_3Um38 _23P1X">
                                    <input
                                        className="_381fS"
                                        type="text"
                                        name="building"
                                        id="building"
                                        tabIndex="1"
                                        autoComplete="off"
                                        value=""
                                    />
                                    <div className="_2EeI1"></div>
                                    <label className="_1Cvlf" htmlFor="building">
                                        Door / Flat No.
                                    </label>
                                </div>
                            </div>
                            <div>
                                <div className="_3Um38 _23P1X">
                                    <input
                                        className="_381fS"
                                        type="text"
                                        name="landmark"
                                        id="landmark"
                                        tabIndex="1"
                                        autoComplete="off"
                                        value=""
                                    />
                                    <div className="_2EeI1"></div>
                                    <label className="_1Cvlf" htmlFor="landmark">
                                        Landmark
                                    </label>
                                </div>
                            </div>
                            <div className="_2i256">
                                <div className="_1dzL9">
                                    <span className="_3Ey3V icon-home"></span>
                                    <div className="sf8jl">Home</div>
                                </div>
                                <div className="_1dzL9">
                                    <span className="_3Ey3V icon-work"></span>
                                    <div className="sf8jl">Work</div>
                                </div>
                                <div className="_1dzL9">
                                    <span className="_3Ey3V icon-location"></span>
                                    <div className="sf8jl">Other</div>
                                </div>
                                <div className="_1qe1S">
                                    <div className="_3Um38 _3vwW5">
                                        <input
                                            className="_381fS _1oTLG _2VYMY"
                                            type="text"
                                            name="annotation"
                                            id="annotation"
                                            tabIndex="1"
                                            placeholder="Dad’s home, my man cave"
                                            maxLength="20"
                                            value=""
                                        />
                                        <div className="_2EeI1 _26LFr"></div>
                                        <label className="_1Cvlf _2tL9P" htmlFor="annotation"></label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="" style={{ paddingLeft: '80px', paddingRight: '40px', width: '480px' }}>
                        <div className="gbzB0">
                            <div className="_25qBi">
                                <a href className="_2sd1x">
                                    <input type="submit" style={{ display: 'none' }} />
                                    SAVE ADDRESS &amp; PROCEED
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default AddressUpdate;
