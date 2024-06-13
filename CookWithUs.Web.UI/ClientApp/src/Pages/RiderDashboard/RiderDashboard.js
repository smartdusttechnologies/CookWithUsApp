import React, { useState } from "react";
import { Map, Bell, CircleHelp } from 'lucide-react';
import RiderShiftDetails from "../../Components/RiderUi/RiderShiftDetails";
import RiderEarningsCard from "../../Components/RiderUi/RiderEarningCard";
import RiderSearchingCard from "../../Components/RiderUi/RiderSearchingCard";
export default function RiderDashboard() {
    const [startDuty, setStartDuty] = useState(false);

    return (
        <>
            <RiderShiftDetails />
            {startDuty ? (
                <RiderSearchingCard />
            ) : (
              <RiderEarningsCard enableStartDuty = { () => setStartDuty(true) } />
            )}

        </>
    );
} 