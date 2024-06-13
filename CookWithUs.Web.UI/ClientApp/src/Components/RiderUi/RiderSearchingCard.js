import React from 'react';
import { Bike } from 'lucide-react';
const RiderSearchingCard = () => {
    return (
        <div className="container">
            <a href="/rider/getOrder"  className="searching-card">
                <div className="searchOrder">Searching for orders</div>
                <div className="serarchRiderIcon">
                    <Bike/>
                </div>
            </a>
        </div>
    );
};

export default RiderSearchingCard;
