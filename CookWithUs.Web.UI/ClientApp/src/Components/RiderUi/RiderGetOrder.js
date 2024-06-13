import React, { useState, useEffect } from "react";
import { ChevronRight, Clock } from 'lucide-react';
export default function RiderGetOrder() {
    useEffect(() => {
        // Hide elements with class name "ridertopbar"
        const elements = document.getElementsByClassName('ridertopbar');
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.display = 'none';
        }
    }, []);
    useEffect(() => {
        const loadGoogleMapsScript = () => {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
            script.async = true;
            script.defer = true;
            window.initMap = initMap;  // Assign initMap to window
            document.body.appendChild(script);
        };

        const initMap = () => {
            new window.google.maps.Map(document.getElementById('googleMap'), {
                center: { lat: 51.508742, lng: -0.120850 },
                zoom: 5,
            });
        };

        loadGoogleMapsScript();
    }, []);
    return (
        <div>
            <div id="googleMap" style={{ width: '100%', height: '60vh' }}></div>
            <div className="reject">
                <div className="reject-order">
                    <i className="rejectIcon fa fa-times" aria-hidden="true"></i> REJECT
                </div>
            </div>
        </div>
    );
} 