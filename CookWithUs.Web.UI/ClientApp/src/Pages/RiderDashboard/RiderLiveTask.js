import React, { useState } from 'react';
import "./RiderLiveTask.css";
import { Utensils, ChevronRight, MapPin, Info } from 'lucide-react';
import RiderNextDirection from './RiderNextDirection';


const RiderLiveTask = ({ restaurantDetails }) => {
    const [seeLocation, setSeeLocation] = useState(false);
    const handleCheckRestaurentLocation = () => {
        setSeeLocation(true);
    }
    return (

        seeLocation ? (
            <>
                <RiderNextDirection setSeeLocation={setSeeLocation} destinationReached={" REACHED PICKUP LOCATION "} nextDestination={restaurantDetails} />
            </>
            ) : (
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
                            <div onClick={handleCheckRestaurentLocation } className="_4RightArrow">
                                <ChevronRight />
                            </div>
                        </div>
                        <div className="_4RestaurantName">
                            {restaurantDetails.name }
                        </div>
                        <div className="_4RestaurantLocation">
                            {restaurantDetails.address}
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
            )
        
    );
};

export default RiderLiveTask;
