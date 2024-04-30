import React from "react";
const UserSideBar = () => {
    return (
        <div className="_2gu8R">
            <ul>
                <li className="awo_x _1B5rE">
                    <span className="icon-orders _3rA45 _34BwO"></span>
                    <span className="_1ZYny ko2i4"><a href="/my-account/orders" >Orders</a></span>
                </li>
                <li className="awo_x">
                    <span className="icon-super-account _3rA45"></span>
                    <span className="_1ZYny">Swiggy One</span>
                </li>
                <li className="awo_x">
                    <span className="icon-favourites _3rA45"></span>
                    <span className="_1ZYny">Favourites</span>
                </li>
                <li className="awo_x">
                    <span className="icon-payments _3rA45"></span>
                    <span className="_1ZYny">Payments</span>
                </li>
                <li className="awo_x">
                    <span className="icon-manage-addresses _3rA45"></span>
                    <span className="_1ZYny"><a href="/my-account/manage_addresses" >Addresses</a></span>
                </li>
                <li className="awo_x">
                    <span className="icon-settings _3rA45"></span>
                    <span className="_1ZYny">Settings</span>
                </li>
            </ul>
        </div>
    );
}
export default UserSideBar;