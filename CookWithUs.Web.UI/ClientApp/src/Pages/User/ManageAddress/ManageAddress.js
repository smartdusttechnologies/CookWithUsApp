import React, { useEffect, useState } from "react";
import { FetchAddress } from "../../../services/UserService";
import UserSideBar from "../Component/UserSideBar";
import DeletePopup from "../Component/DeletePopup";
import UpdateAddress from "../Component/UpdateAddress";
const ManageAddress = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [addressDetails, setAddressDetails] = useState(null);
    const [addresses, setAddresses] = useState([]);
    useEffect(() => {
        getAddress();
    }, []);
    const getAddress = () => {
        const UserId = 1;
        FetchAddress(UserId)
            .then(Response => {
                setAddresses(Response.data);
            });
    }
    const [IsSidebarOpen, setIsSidebarOpen] = useState(true);
    const [showAddressUpdate, setShowAddressUpdate] = useState(false);
    const handleAddressUpdateClick = () => {
        setShowAddressUpdate(true);
        setIsSidebarOpen(true);
    };


    return (
        <div
            style={{
                width: "100%",
                margin: "80px 0"
            }}
        >
            <div style={{
                width: "100%",
                minHeight: "100vh",
                margin: " 0",
                backgroundColor: "#37718e",
            }}
            >
                {/*<div className="_3ANBe _1-rIX O6J5C" style={{zIndex:"99999"}}>*/}
                {/*    <div className="_2G5fZ">*/}
                {/*        <div className="_2VR4Z">*/}
                {/*            <div className="-dIwe">ritesh kumar</div>*/}
                {/*            <div className="_3qvHl">8709282126 . ritesh52@flash.co</div>*/}
                {/*        </div>*/}
                {/*        <div className="hIrua">*/}
                {/*            <div className="DCrYO">Edit profile</div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className="_2BkKe">
                    <div className="_27NPr">
                        <div className="DCrYO _3VLw2">Edit profile</div>
                        <div className="_3RkS-">ritesh kumar</div>
                        <div className="_1dvXz">
                            <span>8709282126</span>
                            <span className="_2nhlW">ritesh52@flash.co</span>
                        </div>
                    </div>
                </div>
                <div className="_3tDvm">
                    <div className="v6luz"></div>
                    <div className="_2QhOV _3glSS">
                        <div className="_3R9IF">
                            <UserSideBar />
                            <div className="_1stFr">
                                <div>
                                    <div>
                                        <div className="ZMdmv">Manage Addresses</div>
                                        
                                        {addresses.map((address, index) => (
                                            <div className="_2xL-J">
                                            <div className="_2-CaT">
                                                <div className="Pydh7"><span className="icon-home"></span></div>
                                                <div>
                                                    <div className="_3M0On">home</div>
                                                        <div className="_1rPE3">{`${address.building}, ${address.landMark} ${address.address}`}</div>
                                                        <div className="_2o0z3"><span onClick={() => { setAddressDetails(address); handleAddressUpdateClick();  }} >EDIT</span><span onClick={() => { setSelectedAddress(address); setShowModal(true); }} >DELETE</span></div>
                                                </div>
                                                </div>
                                            </div>
                                            ))}
                                        
                                    </div>
                                </div>
                            </div>
                           
                        </div>
                    </div>
                    <div className="_1a4Mf"></div>
                </div>
                {showAddressUpdate && <UpdateAddress IsSidebarOpen={IsSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} addressDetails={addressDetails } />}
                {showModal && <DeletePopup onClose={() => setShowModal(false)} addressData={selectedAddress} getAddress={getAddress } />}
            </div>
        </div>
    );
}
export default ManageAddress;