/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import { Button } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useSelector } from "react-redux";
import EmptyCart from "./EmptyCart";
import AddressDropdown from "../Checkout/AddressDropdown";
import "./Carts.css";
import AddressUpdate from "./AddressUpdate";
const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Cart = () => {
    const [addresses, setAddresses] = useState([]);
    const navigate = useNavigate();
    const [carts, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const isSideNavOpen = useSelector((state) => state.app.isSideNavOpen);
    const darkMode = useSelector((state) => state.app.darkMode);

    const [items, setItems] = useState([
        { name: 'Vanilla cakes', price: 250, discountedPrice: 237.50, quantity: 1 },
        { name: 'Chocolate cookies', price: 150, discountedPrice: 142.50, quantity: 1 },
        { name: 'Strawberry cupcakes', price: 200, discountedPrice: 190, quantity: 1 },
        { name: 'Blueberry muffins', price: 180, discountedPrice: 171, quantity: 1 },
    ]);


    useEffect(() => {
        // Calculate the total price when the cart changes
        const calculatedTotalPrice = carts.reduce(
            (total, cartItem) => total + cartItem.price * cartItem.quantity,
            0
        );
        setTotalPrice(calculatedTotalPrice);
    }, [carts]);

    const getCartData = () => {
        const cartData = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(cartData);
    };
    const fetchAddresses = () => {
        // Simulated fetch function, replace with actual fetch code
        const fetchedData = [
            { id: 1, type: 'Work', detail: '21, Chhoti Badalpura, Bihar 801105, India (Khagaul)', deliveryTime: '51 MINS' },
            { id: 2, type: 'Work', detail: '22, Chhoti Badalpura, Bihar 801105, India (Khagaul)', deliveryTime: '52 MINS' },
            // Add more fetched data as needed
        ];
        setAddresses(fetchedData);
    };
    const [itemTotal, setItemTotal] = useState(calculateItemTotal(items));
    const [deliveryFee] = useState(36.00); // Assuming delivery fee is fixed
    const [itemDiscount, setItemDiscount] = useState(calculateItemDiscount(items));
    const [gstAndCharges] = useState(12.78); // Assuming GST and other charges are fixed
    const [totalToPay, setTotalToPay] = useState(calculateTotalToPay());

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

        return itemTotal + deliveryFee + gstAndCharges - itemDiscount;
    }

    const handleIncreaseQuantity = (index) => {
        const updatedItems = [...items];
        updatedItems[index].quantity++;
        setItems(updatedItems);
        var value = calculateItemTotal(updatedItems);
        var itemDisc = calculateItemDiscount(updatedItems);
        setItemTotal(value);
        setItemDiscount(itemDisc);
        setTotalToPay(value + deliveryFee + gstAndCharges - itemDisc);

    };

    const handleDecreaseQuantity = (index) => {
        const updatedItems = [...items];
        if (updatedItems[index].quantity > 1) {
            updatedItems[index].quantity--;

        }
        else {
            updatedItems.splice(index, 1);
        }

        setItems(updatedItems);

        var value = calculateItemTotal(updatedItems);
        var itemDisc = calculateItemDiscount(updatedItems);
        setItemTotal(value);
        setItemDiscount(itemDisc);
        setTotalToPay(value + deliveryFee + gstAndCharges - itemDisc);
    };

    useEffect(() => {
        fetchAddresses();
        getCartData();
    }, []);
    const [showAddressUpdate, setShowAddressUpdate] = useState(false);

    const handleAddressUpdateClick = () => {
        setShowAddressUpdate(true);
    };

    return (

        <div class="CheckOut">
            <div class="CheckoutPg">


                <div class="CartMenu">
                    <div class="AddressSide">
                        <div class="AddressHead"><div class="AddTxt">Choose a delivery address</div></div>
                        <div>
                            <span class="AddLoc">Multiple addresses in this location</span>

                            <div class="AddressList">
                                {addresses.map(address => (
                                    <div className="_Item" key={address.id}>
                                        <div className="IconSide">
                                            <div className="IconLogo">
                                                <span className="icon-work"></span>
                                            </div>
                                            <div>
                                                <div className="LocationType">{address.type}</div>
                                                <div className="LocationDetail">{address.detail}</div>
                                                <div className="DeliveryTime">{address.deliveryTime}</div>
                                                <div className="DeliveryPoint">Deliver Here</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div class="_2nd--" onClick={handleAddressUpdateClick}><div class="_3p8Mf Ldi91"><div class="WtfuC _3mJDe">
                                    <div class="icon-location"></div><div class="_2_VIS">+</div></div><div>
                                        <div class="_2xgU6">Add new Address</div>
                                    <div class="KYAcN"></div>
                                        <div class="_3dNWs _1AS3P">Add New</div></div></div></div>
                                {showAddressUpdate && <AddressUpdate />}
                            </div>

                            <div class="_250uQ _26MRf"></div>
                            <div class="_2b4pY"><span class="_1q8J4 icon-marker-checkout"></span></div>



                        </div>
                        <div class="Payment"><div class="AddressSide"><div class="AddressHead _1rtRz">
                            <div class="AddTxt">Payment</div></div><div class="_2b4pY AuX5b">
                                <span class="_1q8J4 wallet-Col icon-wallet-checkout"></span></div></div>
                        </div>

                    </div>







                </div>
                <div className="ProductDesc">
                    <div className="ProdBox">
                        <button className="ProdBtn">
                            <span className="ProdImg"></span>
                            <span className="ProdDet">
                                <div className="ProdText">MALATYA</div>
                                <div className="ProdPlace">Khajpura</div>
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
                                            <div className="_3rlIu" style={{ color: 'rgb(96, 178, 69)' }}>
                                                <div className="_2VV4a">
                                                    <div>Item Discount</div>
                                                </div>
                                                <div className="_1I8bA">
                                                    <span className="ZH2UW">{itemDiscount}</span>
                                                </div>
                                            </div>
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

        </div>






    );
};
export default Cart;
