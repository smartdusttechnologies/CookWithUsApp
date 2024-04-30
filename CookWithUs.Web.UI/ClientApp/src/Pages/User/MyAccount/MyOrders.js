import React from "react";
import "./MyOrders.css";
import UserSideBar from "../Component/UserSideBar";
const MyOrders = () => {

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
                                        <div className="_3lCtm">Past Orders</div>
                                        <div>
                                            <div className="_3xMk0">
                                                <div className="g28rk">
                                                    <div className="_359Fc">
                                                        <img
                                                            className=""
                                                            imageid="qamlqozfw2h479ggimis"
                                                            height="200"
                                                            width="300"
                                                            imageurl=""
                                                            alt="img renderer"
                                                            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_200,c_fill/qamlqozfw2h479ggimis"
                                                        />
                                                    </div>
                                                    <div className="_2XWVq">
                                                        <div className="_3h4gz">La Pino'z Pizza</div>
                                                        <div className="_2haEe">Phulwari Sharif</div>
                                                        <div className="_299_I">ORDER #169206770179445 | Tue, Mar 12, 2024, 03:22 PM</div>
                                                        <div className="_1ziWV">VIEW DETAILS</div>
                                                        <div className="_2fkm7">
                                                            <span>
                                                                Cancelled on Tue, Mar 12, 2024, 03:23 PM
                                                                <span className="hDcdF icon-alert"></span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="_3SKK0">
                                                    <div className="_33I3_">Sweet Corns Pizza x 1</div>
                                                    <div className="_2a27y">
                                                        <button className="_3PUy8 f4Ovn">REORDER</button>
                                                        <button className="_3PUy8">HELP</button>
                                                    </div>
                                                    <div className="_23DHc">Total Paid: <span className="_1jGfr"> 188 </span></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="_3xMk0">
                                                    <div className="g28rk">
                                                        <div className="_359Fc">
                                                            <img
                                                                className=""
                                                                imageid="healpsfc0yuplmblcraz"
                                                                height="200"
                                                                width="300"
                                                                imageurl=""
                                                                alt="img renderer"
                                                                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_200,c_fill/healpsfc0yuplmblcraz"
                                                            />
                                                        </div>
                                                        <div className="_2XWVq">
                                                            <div className="_3h4gz">La Pino'z Pizza</div>
                                                            <div className="_2haEe">Khajpura</div>
                                                            <div className="_299_I">ORDER #173337021245 | Tue, Jul 25, 2023, 10:40 AM</div>
                                                            <div className="_1ziWV">VIEW DETAILS</div>
                                                            <div className="_2fkm7">
                                                                <span>
                                                                    Delivered on Tue, Jul 25, 2023, 11:18 AM
                                                                    <span className="h-Ntp icon-tickSharp"></span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="_3SKK0">
                                                        <div className="_33I3_">Sweet Corns Pizza x 2</div>
                                                        <div className="_2a27y">
                                                            <button className="_3PUy8 f4Ovn">REORDER</button>
                                                            <button className="_3PUy8">HELP</button>
                                                        </div>
                                                        <div className="_23DHc">Total Paid: <span className="_1jGfr"> 151 </span></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="_3eCKY">Show More Orders</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="_1a4Mf"></div>
                </div>
            </div>
        </div>
    );
}
export default MyOrders;