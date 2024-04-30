import react, { useRef, useEffect, useState } from "react";
import axios from 'axios';
const DeletePopup = ({ onClose, addressData, getAddress }) => {
    const modalRef = useRef();
    const closeModal = (e) => {
        if (modalRef.current === e.target) {
            onClose();

        }
    }

    const deleteAddress = async (id) => {
        try {
             await axios.get(`/user/DeleteAddress/${id}`, null, {
            });
            onClose();
            getAddress();
            
        } catch (error) {
            // Handle errors if any
            console.error("Error fetching data:", error);
        }
    };
    return (
        <div ref={modalRef} onClick={closeModal} className="_3qvoY">
            <div className="_2w4-E _3e6Dx">
                <div className="_2835q" style={{ marginBottom: '160px' }}>
                    <div className="tdLYq">
                        <div className="zmgWM">
                            <div className="R4-yb">Are you sure you want to delete this address ?</div>
                        </div>
                    </div>
                    <div className="_3G9po">
                        <button onClick={onClose} className="b0G1m" style={{ color: 'rgb(0, 0, 0)', borderColor: 'rgb(0, 0, 0)' }}>
                            CANCEL
                        </button>
                        <span className="U5Ri6"></span>
                        <button onClick={() => deleteAddress(addressData.id)} className="_2-MHS" style={{ backgroundColor: 'rgb(0, 0, 0)', borderColor: 'rgb(0, 0, 0)' }}>
                            DELETE
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default DeletePopup;