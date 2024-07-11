import React from 'react';
import "./RiderLiveTask.css";
import { Utensils, ChevronRight, MapPin, Info } from 'lucide-react';

const RiderLiveTask = () => {
    return (
        <>
            <div className="_4mainContainer">
                <div className="_4restaurantDetails">
                    <div className="_4iconLocation">
                        <div className="_4icon">
                            <Utensils />
                        </div>
                        <div className="_4hrParent">
                           
                        </div>
                    </div>
                    <div className="_4RestaurantInfo">
                        <div className="_4RestaurantTitle">
                            <div className="_4Stauts">
                                Pick Food
                            </div>
                            <div className="_4RightArrow">
                                <ChevronRight />
                            </div>
                        </div>
                        <div className="_4RestaurantName">
                            Theobroma
                        </div>
                        <div className="_4RestaurantLocation">
                            Plot 10, Ground Floor, Defence Colony Main Market , Defence Colon,
                            New Delhi
                        </div>
                    </div>
                </div>
                <div className="_4userDetails">
                    <div className="_4iconMap">
                        <div className="_4hrParent">

                        </div>
                        <div className="_4icon">
                            <MapPin />
                        </div>
                        
                    </div>
                    <div className="_4UserInfo">
                        <div className="_4RestaurantName">
                            Deliver
                        </div>
                        <div className="_4RestaurantTitle">
                            <div className="_4UserName">
                                Mohit
                            </div>
                            <div className="_4info">
                                <Info />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default RiderLiveTask;
