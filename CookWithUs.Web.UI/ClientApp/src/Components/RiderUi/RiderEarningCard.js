import React from 'react';
import RiderDashboard from '../../Pages/RiderDashboard/RiderDashboard';

const RiderEarningsCard = ({ enableStartDuty }) => {
    return (
        <div className="container">
            <div className="earnings-card">
                <div className="progress-circle">
                    <div className="circle">
                        <div className="mask full">
                            <div className="fill"></div>
                        </div>
                        <div className="mask half">
                            <div className="fill"></div>
                            <div className="fill fix"></div>
                        </div>
                    </div>
                    <div className="inside-circle">
                        <span className="amount">₹271</span>
                        <span className="description">so far this week</span>
                        <div className="last-week">
                            <span className="amount">₹924</span>
                            <span className="description">Last week</span>
                        </div>
                    </div>
                </div>

                <div className="message">
                    Complete more tasks & earn more!
                </div>
                <div style={{display:'flex',justifyContent:'center',alignItems:'center'} }>
                    <div onClick={enableStartDuty } className="start-duty">START DUTY</div>
                </div>
            </div>
           
        </div>
    );
};

export default RiderEarningsCard;
