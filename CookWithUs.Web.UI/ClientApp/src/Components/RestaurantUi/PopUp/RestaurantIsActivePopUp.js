import React from "react";
import "./RestaurantIsActivePopup.css";
const RestaurantIsActivePopUp = ({ setIsActive, setOpenActivePopup }) => {

    return (
        <div className="mainContent modalOpen">
            <div class="head">
                Start Taking Orders ?</div><div class="note">
                note :
            </div>
            <div class="content" >
                Are you sure you want to start accepting orders ?
            </div>
            <div class="cnf-button" >
                <button onClick={() => {  setOpenActivePopup(false); }} className="cnf-cancel">
                    CANCEL
                </button>
                <button onClick={() => { setIsActive(true); setOpenActivePopup(false); }} className="cnf-yes" >YES</button></div></div>
    );
}
export default RestaurantIsActivePopUp;