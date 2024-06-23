/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import "./Carts.css";
import AddressUpdate from "./AddressUpdate";
import { FetchAddress } from "../../services/UserService";
import axios from 'axios';
import PAYMENT_OPTIONS from "../Checkout/PaymentCard";
const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;


const Cart = () => {
    const [addresses, setAddresses] = useState([]);
    const navigate = useNavigate();

    const isSideNavOpen = useSelector((state) => state.app.isSideNavOpen);
    const darkMode = useSelector((state) => state.app.darkMode);
    const [PaymentAddress, SetPaymentAdd] = useState(null);
    const [OrderPicker, SetOrderPicker] = useState([]);
    const [IsSidebarOpen, setIsSidebarOpen] = useState(true);
    const [RestaurantDetail, setRestaurnatDetail] = useState(false);
    const [RestaurantLoc, setRestaurantLoc] = useState(false);

    const [items, setItems] = useState([]);
    const [itemTotal, setItemTotal] = useState(0);
    const [deliveryFee] = useState(36.00); // Assuming delivery fee is fixed
    const [itemDiscount, setItemDiscount] = useState(0);
    const [gstAndCharges] = useState(12.78); // Assuming GST and other charges are fixed
    const [totalToPay, setTotalToPay] = useState(0);

    const [PaymentPage, SetPaymentPage] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get(`/user/CartDetails/1`);
            setRestaurnatDetail(response.data[0].restaurantName);
            setRestaurantLoc(response.data[0].restaurantLocation);
            setItems(response.data);

            setItemTotal(calculateItemTotal(response.data));
            setItemDiscount(calculateItemDiscount(response.data));

            setTotalToPay(calculateTotalToPay());
        } catch (error) {
            // Handle errors if any
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        setTotalToPay(calculateTotalToPay());
    }, [itemTotal]);
    useEffect(() => {
        const UserId = 1;
        FetchAddress(UserId)
            .then(Response => {
                setAddresses(Response.data);
            });
        fetchData();
    }, []);

    const PayingAdd = (Id) => {
        const selectedAddress = addresses.find(address => address.id === Id);
        SetOrderPicker(selectedAddress);
        SetPaymentAdd(true);
    }
    // Function to calculate total item price
    function calculateItemTotal(items) {
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
    }

    // Function to calculate total item discount
    function calculateItemDiscount(items) {
        return items.reduce((total, item) => total + (item.price - item.discountedPrice) * item.quantity, 0);
    }

    // Function to calculate total to pay
    function calculateTotalToPay() {

        return itemTotal + deliveryFee + gstAndCharges ;
    }

    const IncreaseItem = async (id, quantity) => {
        try {
            // Make an Axios POST request to your endpoint
            const response = await axios.post('/user/CartUpdate', null, {
                params: {
                    Id: id,
                    Quantity: quantity
                }
            });


            console.log("Response:", response.data);
            fetchData();

        } catch (error) {

            console.error("Error fetching data:", error);
        }
    };
    const handleIncreaseQuantity = (index) => {
        const updatedItems = [...items];
        updatedItems[index].quantity++;
        IncreaseItem(updatedItems[index].id, updatedItems[index].quantity);
    };
    const handleDecreaseQuantity = (index) => {
        const updatedItems = [...items];
        updatedItems[index].quantity--;
        IncreaseItem(updatedItems[index].id, updatedItems[index].quantity);
    };
    const [showAddressUpdate, setShowAddressUpdate] = useState(false);
    const handleAddressUpdateClick = () => {
        setShowAddressUpdate(true);
        setIsSidebarOpen(true);
    };

    return (
        <>
            {PaymentPage === null ? (
                <div className="CheckoutPg" style={{ marginTop: "80px" }}>

                    {PaymentAddress !== null ? (
                        <div className="_3djal">
                            <div className="_3djal">
                                <div className="_1rwo5 _1Ak49 _34Whq">
                                    <div className="F8Sye">
                                        <div className="_2YrH-">Delivery address</div>
                                        <div className="C2lmo _3za0v">
                                            <div className="_2C3aj _1eJQw"><span className="_1ZSwS icon-tickRound"></span></div>
                                        </div>
                                    </div>
                                    <div className="_2zPJt">
                                        <div className="_1IPhI" onClick={() => SetPaymentAdd(null)}>Change</div>
                                        <div className="_2kejs">{OrderPicker.locationType}</div>
                                        <div className="_1QRRt">{`${OrderPicker.building}, ${OrderPicker.landMark} ${OrderPicker.address}`}</div>
                                        <div className="_1__JV">{/*{OrderPicker.deliveryTime}*/} 25min</div>
                                    </div>
                                    <div className="_250uQ"></div>
                                    <div className="_2b4pY"><span className="_1q8J4 icon-marker-checkout"></span></div>
                                </div>
                                <div className="_1rwo5">
                                    <div className="F8Sye">
                                        <div className="_2YrH-">Choose payment method</div>
                                    </div>
                                    <button className="_3PNwl" onClick={() => SetPaymentPage(true)}>Proceed to Pay</button>
                                    <div className="_2b4pY"><span className="_1q8J4 icon-wallet-checkout"></span></div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div class="CartMenu">
                            <div class="AddressSide">
                                <div class="AddressHead"><div class="AddTxt">Choose a delivery address</div></div>
                                <div>
                                    <span class="AddLoc">Multiple addresses in this location</span>
                                    <div class="AddressList">
                                        {addresses.map(address => (
                                            <div className="_Item" key={address.id} onClick={() => PayingAdd(address.id)}>

                                                <div className="IconSide">
                                                    <div className="IconLogo">
                                                        <span className="icon-work"></span>
                                                    </div>
                                                    <div>
                                                        <div className="LocationType">{address.locationType}</div>
                                                        <div className="LocationDetail">{`${address.building}, ${address.landMark} ${address.address}`}</div>

                                                        <div className="DeliveryTime">{/*{address.deliveryTime}*/}25 min</div>
                                                        <div className="DeliveryPoint"> Deliver Here </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <div class="_2nd--" onClick={handleAddressUpdateClick}>
                                            <div class="_3p8Mf Ldi91">
                                                <div class="WtfuC _3mJDe">
                                                    <div class="icon-location"></div>
                                                    <div class="_2_VIS">+</div>
                                                </div>
                                                <div>
                                                    <div class="_2xgU6">Add new Address</div>
                                                    <div class="KYAcN"></div>
                                                    <div class="_3dNWs _1AS3P">Add New</div>
                                                </div>
                                            </div>
                                        </div>
                                        {showAddressUpdate && <AddressUpdate IsSidebarOpen={IsSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />}
                                    </div>
                                    <div class="_250uQ _26MRf"></div>
                                    <div class="_2b4pY"><span class="_1q8J4 icon-marker-checkout"></span></div>
                                </div>
                                <div class="Payment">
                                    <div class="AddressSide">
                                        <div class="AddressHead _1rtRz">
                                            <div class="AddTxt">Payment</div>
                                        </div>
                                        <div class="_2b4pY AuX5b">
                                            <span class="_1q8J4 wallet-Col icon-wallet-checkout"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="ProductDesc">
                        <div className="ProdBox">
                            <button className="ProdBtn">
                                <span className="ProdImg"></span>
                                <span className="ProdDet">
                                    <div className="ProdText">{RestaurantDetail}</div>
                                    <div className="ProdPlace">{RestaurantLoc}</div>
                                </span>
                            </button>
                            <div className="ProdInf">
                                <div className="ProdPricing">
                                    <div className="_3YMqW"></div>
                                    <div className="PricingDet _2XVjJ _1S7oI">
                                        <div>
                                            <div className="_2zsON"></div>
                                            <div className="_2pdCL">
                                                {items.map((item, index) => (
                                                    <div key={index} className="_2bXOy">
                                                        <div className="_3SG03">
                                                            <i className="styles_icon__m6Ujp _2MJB6 icon-Veg styles_iconVeg__shLxJ" role="presentation" aria-hidden="true" style={{ lineHeight: 1.2 }}></i>
                                                            <div className="_33KRy">{item.name}</div>
                                                        </div>
                                                        <div className="_2bWmk">
                                                            <div className="_1yTZI">
                                                                <div className="_3L1X9 _29ugw">
                                                                    <div className="_1RPOp _36fT9 _4aKW6" >-</div>
                                                                    <div className="_3Hy2E hDN3x _4aKW6" >+</div>
                                                                    <div className="_1ds9T" onClick={() => handleIncreaseQuantity(index)}>+</div>
                                                                    <div className="_29Y5Z" onClick={() => handleDecreaseQuantity(index)}></div>
                                                                    <div className="_2zAXs">{item.quantity}</div>
                                                                </div>
                                                                <div className="_1mx0r">
                                                                    <span className="_2OlEg">{item.price}</span>
                                                                    <span className="_2W2U4">{item.discountedPrice}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="_3PZFF">
                                                <div className="_3e0Qi">Bill Details</div>
                                                <div className="_3rlIu">
                                                    <div className="_2VV4a">
                                                        <span>Item Total</span>
                                                    </div>
                                                    <div className="_1I8bA">
                                                        <span className="ZH2UW">{itemTotal}</span>
                                                    </div>
                                                </div>
                                                <div className="_3rlIu">
                                                    <div className="_2VV4a">
                                                        <div>Delivery Fee | 1.8 kms</div>
                                                    </div>
                                                    <div className="_1I8bA">
                                                        {/* <span className="_1A4pB _3Lk3Q ZH2UW">{deliveryFee}</span>*/}
                                                        <span className="ZH2UW">{deliveryFee}</span>
                                                    </div>
                                                </div>
                                                {/*<div className="_3rlIu" style={{ color: 'rgb(96, 178, 69)' }}>*/}
                                                {/*    <div className="_2VV4a">*/}
                                                {/*        <div>Item Discount</div>*/}
                                                {/*    </div>*/}
                                                {/*    <div className="_1I8bA">*/}
                                                {/*        <span className="ZH2UW">{itemDiscount}</span>*/}
                                                {/*    </div>*/}
                                                {/*</div>*/}
                                                <div className="_3rlIu">
                                                    <div className="_2VV4a">
                                                        <div>GST and Restaurant Charges</div>
                                                    </div>
                                                    <div className="_1I8bA">
                                                        <span className="ZH2UW">{gstAndCharges}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="_3DPdG"></div>
                                </div>
                                <div className="_1v28S"></div>
                            </div>
                        </div>
                        <div className="ZBf6d">
                            <div>TO PAY</div>
                            <div className="_3ZAW1">{totalToPay}</div>
                        </div>
                    </div>


                </div>
            ) : (
                <div className="CheckoutPg" style={{ marginTop: "100px" }}>
                        <PAYMENT_OPTIONS FoodItem={{ items }} Address={{ OrderPicker }} TotalAmount={{ totalToPay }} />
                </div>

            )}
        </>
    );

};
export default Cart;
