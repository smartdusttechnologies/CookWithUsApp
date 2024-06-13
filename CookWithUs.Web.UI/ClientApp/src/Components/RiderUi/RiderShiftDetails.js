import React, { useState } from "react";
import { ChevronRight, Clock } from 'lucide-react';
export default function RiderShiftDetails() {

    return (
        <div className="p-20">
            <div className="shiftDetails">
                <div className="shift">
                    <div className="timerIcon">
                        <Clock />
                    </div>
                    <div className="shiftText">Shift Details</div>
                </div>
                <div className="shiftArrow">
                    <ChevronRight />
                </div>
            </div>
        </div>
    );
} 