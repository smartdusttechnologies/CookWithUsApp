import React, { useEffect, useState } from "react";
import "./ChooseAddress.css";
import PhoneAddAddress from "./AddAddress";
import { FetchAddress } from "../../services/UserService";
export default function ChooseAddress({ setChooseCurrentAddress, chooseCurrentAddress, setShowChooseAddress }) {
    const [addPopUp, SetAddPopUp] = useState(false);
    const [addresses, setAddresses] = useState([]);
    useEffect(() => {
        const UserId = 1;
        FetchAddress(UserId)
            .then(Response => {
                setAddresses(Response.data);                
            });
    }, []);
    useEffect(() => {
        const UserId = 1;
        FetchAddress(UserId)
            .then(Response => {
                setAddresses(Response.data);
            });
    }, [addPopUp]);
    useEffect(() => {
        if (addresses.length > 0) {
            setChooseCurrentAddress(addresses[0].id);
        }
    }, [addresses]);
    const handleChooseAddress = (id) => {
        setChooseCurrentAddress(id);
    }

    return (
        <>
            <div className="_2yoTv" style={{zIndex: 9999999,position: 'fixed',top: 0,right: 0,background: 'white',left: 0} }>
                <div style={{ paddingTop: '56px', height: '100%' }}>
                    <div className="_391lA">
                        <div className="_31Bjb">
                            <button onClick={() => setShowChooseAddress(false)} className="_3RA-w" data-testid="refine-header-close" aria-label="Double Tap to close">
                                <svg className="_2nwKw" viewBox="0 0 32 32" height="14" width="14">
                                    <path d="M29.278 0l2.722 2.722-13.278 13.278 13.278 13.278-2.722 2.722-13.278-13.278-13.278 13.278-2.722-2.722 13.278-13.278-13.278-13.278 2.722-2.722 13.278 13.278z"></path>
                                </svg>
                            </button>
                            <div className="_1_Eli">CHOOSE DELIVERY ADDRESS</div>
                            <button className="_2AEjt" data-testid="add-item" onClick={()=>SetAddPopUp(true) } >ADD NEW</button>
                        </div>
                        <div className="_1cx3b">
                            {addresses.map(address => (
                                <div className="_3vApR" key={address.id} >
                                    <div className="icon-home _24l4f _3s2u2"></div>
                                    <div className="_3pBjM">
                                        <div>
                                            <div onClick={()=>handleChooseAddress(address.id)} className="HZm2V">
                                                <label className={`_1UQLO ${chooseCurrentAddress == address.id ? 'T_my3' : ''}`}>
                                                    <input type="radio" className="_2YyVu" name="selectedAddress" value="cpf1mnnikq42jahbtuq0" checked />
                                                </label>
                                            </div>
                                            <div className="iVDxh">{address.locationType}</div>
                                        </div>
                                        <div className="_211R4">{`${address.building}, ${address.landMark} ${address.address}`}</div>
                                        <div className="_3FsYM">40 min - 45 min</div>
                                    </div>
                                </div>
                            ))}                           
                        </div>
                        <div className="_3JFxT" onClick={() => setShowChooseAddress(false)} >
                            <div   className="_2uVgO _3nuec" style={{ backgroundColor: 'rgb(252, 128, 25)', color: 'white' }}>CONTINUE</div>
                        </div>
                    </div>
                </div>
                <div className="_1r-M3 _3JaG6 _3C3Tg"></div>
                <div className="_3JaG6 _3C3Tg"></div>
            </div>
            {addPopUp && <PhoneAddAddress SetAddPopUp={SetAddPopUp } /> }
            
        </>
    );
}