import React, {useEffect,useState } from "react";
import "./PhoneCart.css";
import ChooseAddress from "../../Components/Modal/ChooseAddress";
import { FetchAddress } from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from 'axios';
import PhonePaymentOption from "../../Components/Modal/PhonePaymentOption";
export default function PhoneCart() {
    const [addresses, setAddresses] = useState([]);
    const [chooseCurrentAddress, setChooseCurrentAddress] = useState(null);
    const [choosesAddress, setChoosesAddress] = useState(null);
    const [makePaymentModal, setMakePaymentModal] = useState(false);
    useEffect(() => {
        const elements = document.getElementsByClassName('_2456r');
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.display = 'none';
        }
        const elements2 = document.getElementsByClassName('_3JaG6');
        for (let i = 0; i < elements2.length; i++) {
            elements2[i].style.display = 'none';
        }
    }, []);
    const [quantity, setQuantity] = useState(1);
    useEffect(() => {
        const UserId = 1;
        FetchAddress(UserId)
            .then(Response => {
                setAddresses(Response.data);
            });
        fetchData();
    }, []);
    const navigate = useNavigate();

    const isSideNavOpen = useSelector((state) => state.app.isSideNavOpen);
    const darkMode = useSelector((state) => state.app.darkMode);
    const [PaymentAddress, SetPaymentAdd] = useState(null);
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


    useEffect(() => {
        if (addresses.length > 0) {
            setChooseCurrentAddress(addresses[0].id);
            setChoosesAddress(addresses.find(address => address.id === chooseCurrentAddress));
        }
    }, [addresses]);
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

        return itemTotal + deliveryFee + gstAndCharges;
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

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };
    const handleButtonClick = () => {
        // Define what should happen when the button is clicked
        console.log('Apply Coupon button clicked');
    };
    const handleTipClick = (amount) => {
        console.log(`Tip ${amount} clicked`);
        // Add functionality to handle tip amount click
    };

    const handleHowItWorksClick = () => {
        console.log('How it works clicked');
        // Add functionality to handle the "How it works" button click
    };
    const handleInfoClick = () => {
        console.log('Info button clicked');
        // Add functionality to handle info button click
    };
    const handleAddTipClick = () => {
        console.log('Add tip button clicked');
        // Add functionality to handle add tip button click
    };
    const [showChooseAddress, setShowChooseAddress] = useState(false);
    return (
        <>
        <div className="_hideWithPopup">
        <div className="_2_q9F">
            <button
                className="_2QN4q"
                data-cy="back-button"
                aria-label="Double tap to go back"
                href="/"
            >
                <svg className="uHGrw" viewBox="0 0 32 32" height="18" width="18">
                    <path d="M3.333 14.984l28.667-0v2.097l-0.16 0.006h-28.506l-0.16-0.16v-1.782l0.16-0.16zM1.114 14.986l10.079-10.079 0.121-0.108 1.465 1.467-0.101 0.127-10.079 10.079h-0.226l-1.26-1.26v-0.226zM12.679 25.676l0.108 0.117-1.468 1.484-0.126-0.115-10.079-10.079v-0.226l1.26-1.26h0.226l10.079 10.079zM3.268 12.87l0.272 0.116-0.022 6.125-0.272 0.114-3.245-3.18 0.111-0.112 3.157-3.062z"></path>
                </svg>
            </button>
            <div className="_3v0Oe">
                <div className="wk7IU" data-cy="restaurant-info" role="presentation">
                    <div className="_38vxc">
                        <span>Doraemon's Cafe</span>
                    </div>
                    <p className="ScreenReaderOnly_screenReaderOnly___ww-V">
                        1 Item Estimated time to arrival: 40-45 MINS
                    </p>
                    <div aria-hidden="true">
                        <div className="_3XxTy">
                            <span className="_3wyd3"></span>
                            <span> 1 Item</span> | <span>ETA 40-45 MINS</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
            <div className="_2yBRr">
                {items.map((item, index) => (
                    <div className="_2WrBX _1Asgo">
                        <div role="list" className="_34m_P">
                            <div className="_1zE-m" data-cy="cart-food-item-instock">
                                <i className="styles_icon__m6Ujp _15wOa icon-NonVeg" role="presentation" data-cy="food-item-symbol" aria-hidden="true" style={{ lineHeight: '1.2' }}></i>
                                <div data-cy="food-item-info" className="_3v-Q2">
                                    <p className="ScreenReaderOnly_screenReaderOnly___ww-V" role="listitem">
                                        Egg Item Chicken Handi Half, Quantity: {quantity}, Item Total: {quantity * 248} Rupees
                                    </p>
                                    <div className="_1DnwP" aria-hidden="true">{item.name}</div>
                                    <div className="_1kXsR" aria-hidden="true">Half</div>
                                    {/*<button className="_3dYuL">*/}
                                    {/*    <span>CUSTOMIZED</span>*/}
                                    {/*    <span className="_3FNWW icon-rightArrow"></span>*/}
                                    {/*</button>*/}
                                </div>
                                <div className="_2pWL- YtkFu" data-cy="item-quantity-button">
                                    <button aria-label="Decrease Quantity to 0" className="_1H238" onClick={() => handleDecreaseQuantity(index)}>-</button>
                                    <div className="_33Vfv" aria-hidden="true">{item.quantity}</div>
                                    <button aria-label="Increase Quantity to 2" className="QSzbj" onClick={() => handleIncreaseQuantity(index)}>+</button>
                                </div>
                                <div className="_31p1C" data-cy="food-item-price" aria-hidden="true">
                                    <div className="LwgZu">{item.quantity *  item.price }</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div role="checkbox" aria-checked={isChecked} className="Ripple_container__17nxL _3VkUZ" onClick={handleCheckboxChange}>
                <div className="_3u0Bh">
                    <div className="_3awyI" aria-hidden="true">
                        <label className="Checkbox_orangeCheckboxLabel__JV0CV">
                            <input
                                type="checkbox"
                                className="Checkbox_checkboxInput__16SSg"
                                name="CUTLERY_INSTRUCTION_CHK_BOX"
                                value="CUTLERY_INSTRUCTION_CHK_BOX"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                            />
                            <svg className="Checkbox_orangeCheckboxTick__23Zdf" viewBox="0 0 24 24">
                                <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                            </svg>
                        </label>
                    </div>
                    <div>
                        <div className="_2RklK">Opt in for No-contact Delivery</div>
                        <div className="_1qmfW">Unwell, or avoiding contact? Please select no-contact delivery. Partner will safely place the order outside your door (not for COD)</div>
                    </div>
                </div>
            </div>
            <div className="_2dfTA"></div>
            <div className="_2CpAN _2S55X">
            <div
                role="button"
                className="_6a6S4 U8s7d"
                data-cy="offer-navigate"
                tabIndex="0"
                onClick={handleButtonClick}
                onKeyPress={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        handleButtonClick();
                    }
                }}
            >
                <div className="_3SJO5 icon-offersOutline"></div>
                <div className="hkIgw">
                    <div className="_3zjTB">APPLY COUPON</div>
                    <div className="_1afMj">
                        <span className="_1EsgC icon-rightArrow"></span>
                    </div>
                </div>
            </div>
            <div className="_3uEXI"></div>
            <div id="de-tip-container">
                <div className="vXMXI">
                    <p className="ScreenReaderOnly_screenReaderOnly___ww-V" tabIndex="0" id="de-tip-screen-reader">
                        Say thanks with a Tip! Day &amp; night, our delivery partners bring your favourite meals. Thank them with a tip.
                    </p>
                    <span data-cy="de-tip-header-icon" className="icon-tip _3e2t9" aria-hidden="true"></span>
                    <div>
                        <div className="_2hPEE" data-cy="de-tip-header-text">
                            <div className="_3JyxV" aria-hidden="true">Say thanks with a Tip!</div>
                            <button className="Ripple_container__17nxL _3-7Bu" aria-label="Tap to know how tipping works." onClick={handleHowItWorksClick}>
                                How it works
                            </button>
                        </div>
                        <div data-cy="de-tip-subheader" className="_1e1_Z" aria-hidden="true">
                            Day &amp; night, our delivery partners bring your favourite meals. Thank them with a tip.
                        </div>
                    </div>
                </div>
                <div className="_1sS-O">
                    <div className="TipsWrapper_tipsWrapper__2KXM4" data-cy="de-tip-boxes-wrapper">
                        <div className="HorizontalScroller_itemList__3_IFD TipsWrapper_tipsWrapperScrollBarContainer__ArHLG">
                            <div className="HorizontalScroller_item__3vrve TipsWrapper_tipsWrapperItemContainer__UiXZQ" style={{ height: 'auto', width: 'auto' }}>
                                <div data-cy="de-tip-box-20">
                                    <button aria-label="Tip Rupees 20" className="Ripple_container__17nxL TipBox_tipBoxContainer__2130M" onClick={() => handleTipClick(20)}>
                                        <span className="TipBox_tipBoxText__KKW0f">
                                            <span className="TipBox_tipBoxTextRupee__eNOZp">20</span>
                                        </span>
                                    </button>
                                </div>
                            </div>
                            <div className="HorizontalScroller_item__3vrve TipsWrapper_tipsWrapperItemContainer__UiXZQ" style={{ height: 'auto', width: 'auto' }}>
                                <div data-cy="de-tip-box-30">
                                    <button aria-label="Tip Rupees 30 Most Tipped Amount" className="Ripple_container__17nxL TipBox_tipBoxContainer__2130M TipBox_tipBoxContainerMostTipped__1hCY2" onClick={() => handleTipClick(30)}>
                                        <span className="TipBox_tipBoxText__KKW0f TipBox_tipBoxTextMostTipped__2pYYM">
                                            <span className="TipBox_tipBoxTextRupee__eNOZp">30</span>
                                            <span className="TipBox_tipBoxMostTippedContainer__3lxet">Most Tipped</span>
                                        </span>
                                    </button>
                                </div>
                            </div>
                            <div className="HorizontalScroller_item__3vrve TipsWrapper_tipsWrapperItemContainer__UiXZQ" style={{ height: 'auto', width: 'auto' }}>
                                <div data-cy="de-tip-box-50">
                                    <button aria-label="Tip Rupees 50" className="Ripple_container__17nxL TipBox_tipBoxContainer__2130M" onClick={() => handleTipClick(50)}>
                                        <span className="TipBox_tipBoxText__KKW0f">
                                            <span className="TipBox_tipBoxTextRupee__eNOZp">50</span>
                                        </span>
                                    </button>
                                </div>
                            </div>
                            <div className="HorizontalScroller_item__3vrve TipsWrapper_tipsWrapperItemContainer__UiXZQ" style={{ height: 'auto', width: 'auto' }}>
                                <div data-cy="de-tip-box-Other">
                                    <button aria-label="Select to add any other amount" className="Ripple_container__17nxL TipBox_tipBoxContainer__2130M" onClick={() => handleTipClick('Other')}>
                                        <span className="TipBox_tipBoxText__KKW0f">
                                            <span className="">Other</span>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="_3uEXI"></div>
            <div className="_2sSwD" role="heading" aria-level="4">Bill Details</div>
            <div className="dMf8y" data-cy="billdetail-item-ITEM_TOTAL">
                <p className="ScreenReaderOnly_screenReaderOnly___ww-V">
                            Item Total Rupees {itemTotal}.
                </p>
                <div className="_3nvlr">
                    <div data-cy="billdetail-itemName" className="_1DYnm" aria-hidden="true">
                        <div className="_2IK3e">Item Total</div>
                    </div>
                    <div aria-hidden="true" data-cy="billdetail-itemValue" className="qNh0b">
                        <button className="_3u1kN">
                            <div className="XCitJ" aria-hidden="true">
                                <span></span>
                                        <span className="_2kaUM _3V2AK">{itemTotal}</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
                <div className="_1BMTS"></div>
                <div className="XP__f" data-cy="billdetail-item-POSITIVE_DELIVERY_CHARGES_EXCLUSIVE">
                    <p className="ScreenReaderOnly_screenReaderOnly___ww-V">
                            Delivery Fee | 6.1 kilometres. Rupees {deliveryFee}. Enjoy Discounted Delivery!
                    </p>
                    <div className="_3nvlr">
                        <div data-cy="billdetail-itemName" className="_1DYnm">
                            <span aria-hidden="true"> Delivery Fee | 6.1 kms</span>
                            <div className="_2_UzK" aria-hidden="true">
                                <button className="icon-info" aria-label="Show Info" onClick={handleInfoClick}></button>
                            </div>
                        </div>
                        <div data-cy="billdetail-itemValue" className="qNh0b" aria-hidden="true">
                            <button className="_3u1kN">
                                <div className="XCitJ" aria-hidden="true">
                                    <span></span>
                                        <span className="_2kaUM _3V2AK">{deliveryFee }</span>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className="zWgCd" aria-hidden="true">Enjoy Discounted Delivery!</div>
                </div>
                <div className="_1BMTS"></div>
                <div className="dMf8y" data-cy="billdetail-item-ADD_DELIVERY_TIP">
                    <p className="ScreenReaderOnly_screenReaderOnly___ww-V">Delivery Tip.</p>
                    <div className="_3nvlr">
                        <div data-cy="billdetail-itemName" className="_1DYnm" aria-hidden="true">
                            <div className="_2IK3e">Delivery Tip</div>
                        </div>
                        <div aria-hidden="false" data-cy="billdetail-itemValue" className="qNh0b">
                            <button className="_3u1kN" onClick={handleAddTipClick}>
                                <div className="XCitJ" aria-hidden="true" style={{ color: 'rgb(228, 109, 71)' }}>
                                    <span></span>
                                    <span className="_2kaUM">Add tip</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="XP__f" data-cy="billdetail-item-PLATFORM_FEE_M3">
                    <p className="ScreenReaderOnly_screenReaderOnly___ww-V">
                        Platform fee Rupees 5.
                    </p>
                    <div className="_3nvlr">
                        <div data-cy="billdetail-itemName" className="_1DYnm">
                            <span aria-hidden="true"> Platform fee</span>
                            <div className="_2_UzK" aria-hidden="true">
                                <button className="icon-info" aria-label="Show Info" onClick={handleInfoClick}></button>
                            </div>
                        </div>
                        <div data-cy="billdetail-itemValue" className="qNh0b" aria-hidden="true">
                            <button className="_3u1kN">
                                <div className="XCitJ" aria-hidden="true">
                                    <span></span>
                                    <span className="_2kaUM _3V2AK">5</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="XP__f" data-cy="billdetail-item-TAXES_AND_CHARGES">
                    <p className="ScreenReaderOnly_screenReaderOnly___ww-V">
                            GST and Restaurant Charges Rupees {gstAndCharges}.
                    </p>
                    <div className="_3nvlr">
                        <div data-cy="billdetail-itemName" className="_1DYnm">
                            <span aria-hidden="true"> GST and Restaurant Charges</span>
                            <div className="_2_UzK" aria-hidden="true">
                                <button className="icon-info" aria-label="Show Info" onClick={handleInfoClick}></button>
                            </div>
                        </div>
                        <div data-cy="billdetail-itemValue" className="qNh0b" aria-hidden="true">
                            <button className="_3u1kN">
                                <div className="XCitJ" aria-hidden="true">
                                    <span></span>
                                        <span className="_2kaUM _3V2AK">{gstAndCharges}</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="_1BMTS"></div>
                <div className="dMf8y _Xz8c" data-cy="billdetail-item-GRAND_TOTAL" style={{ fontWeight: 600 }}>
                    <p className="ScreenReaderOnly_screenReaderOnly___ww-V">To Pay Rupees {totalToPay}.</p>
                    <div className="_3nvlr">
                        <div data-cy="billdetail-itemName" className="_1DYnm" aria-hidden="true">
                            <div className="_2IK3e">To Pay</div>
                        </div>
                        <div data-cy="billdetail-itemValue" className="qNh0b" aria-hidden="true">
                            <button className="_3u1kN" onClick={handleButtonClick}>
                                <div className="XCitJ" aria-hidden="true">
                                    <span></span>
                                        <span className="_2kaUM _3V2AK">{totalToPay}</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="CancellationNoticeV2Awareness_wrapper__3fjf5">
                <div className="CancellationNoticeV2Awareness_header__1BwAV">
                    <img
                        alt=""
                        className="CancellationNoticeV2Awareness_logo__13uwl"
                        height="48"
                        loading="lazy"
                        width="48"
                        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_48,h_48/CancellationPolicyAssets/CancellationsReviewOrderCollapsed.png"
                    />
                    <p data-cy="cart-cancellation-awareness-notice-title" className="CancellationNoticeV2Awareness_title__Nv8xQ">
                        Review your order and address details to avoid cancellations
                    </p>
                </div>
                <div role="region" aria-label="If you choose to cancel, you can do it within 60 seconds after placing the order. Post 60 seconds, you will be charged a 100% cancellation fee. However, in the event of an unusual delay of your order, you will not be charged a cancellation fee. This policy helps us avoid food wastage and compensate restaurants / delivery partners for their efforts." className="NoticeBody_points__3YVDZ">
                    <div className="NoticeBody_point__397KX" aria-hidden="true">
                        <div>
                            <img
                                alt=""
                                className="NoticeBody_pointIcon__3eyED"
                                height="32"
                                loading="lazy"
                                width="32"
                                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_32,h_32/CancellationPolicyAssets/Cancellations60Seconds.png"
                            />
                        </div>
                        <p data-cy="cart-cancellation-awareness-notice-point-message" className="NoticeBody_pointText__1yOhn">
                            If you choose to cancel, you can do it within 60 seconds after placing the order.
                        </p>
                    </div>
                    <div className="NoticeBody_point__397KX" aria-hidden="true">
                        <div>
                            <img
                                alt=""
                                className="NoticeBody_pointIcon__3eyED"
                                height="32"
                                loading="lazy"
                                width="32"
                                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_32,h_32/CancellationPolicyAssets/CancellationsFee.png"
                            />
                        </div>
                        <p data-cy="cart-cancellation-awareness-notice-point-message" className="NoticeBody_pointText__1yOhn">
                            Post 60 seconds, you will be charged a 100% cancellation fee.
                        </p>
                    </div>
                    <div className="NoticeBody_point__397KX" aria-hidden="true">
                        <div>
                            <img
                                alt=""
                                className="NoticeBody_pointIcon__3eyED"
                                height="32"
                                loading="lazy"
                                width="32"
                                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_32,h_32/CancellationPolicyAssets/CancellationException.png"
                            />
                        </div>
                        <p data-cy="cart-cancellation-awareness-notice-point-message" className="NoticeBody_pointText__1yOhn">
                            However, in the event of an unusual delay of your order, you will not be charged a cancellation fee.
                        </p>
                    </div>
                    <div className="NoticeBody_point__397KX" aria-hidden="true">
                        <div>
                            <img
                                alt=""
                                className="NoticeBody_pointIcon__3eyED"
                                height="32"
                                loading="lazy"
                                width="32"
                                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_32,h_32/CancellationPolicyAssets/CancellationCompensation.png"
                            />
                        </div>
                        <p data-cy="cart-cancellation-awareness-notice-point-message" className="NoticeBody_pointText__1yOhn">
                            This policy helps us avoid food wastage and compensate restaurants / delivery partners for their efforts.
                        </p>
                    </div>
                </div>
                <div className="ActionButtons_wrapper__3vWGV">
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cy="cart-cancellation-awareness-notice-anchor-btn"
                        href="https://www.swiggy.com/refund-policy"
                        className="ActionButtons_actionButton__1dM-h"
                        style={{ color: 'rgb(93, 142, 213)', borderColor: 'rgb(109, 153, 217)', backgroundColor: 'rgb(255, 255, 255)' }}
                    >
                        Read cancellation policy
                    </a>
                </div>
            </div>
            <div className="_1WMhj">
                <div className="YI-QT">
                    <div data-cy="cart-address-container" className="_3zFm4">
                        <p className="ScreenReaderOnly_screenReaderOnly___ww-V">Deliver to Home near main road. Estimated time for delivery is 35-40 MINS</p>
                        <div className="BOUNP" aria-hidden="true">
                            <div className="_3NRbN">
                                <span className="icon-home"></span>
                                <div className="_1fb2p">
                                    <span className="icon-tickSharp"></span>
                                </div>
                            </div>
                            <div aria-hidden="true" className="_1fU9t">
                                <div className="_2gx5m">Deliver to Home</div>
                                <div className="_11qmA">near main road</div>
                                <div className="_1tVQS">35-40 MINS</div>
                            </div>
                        </div>
                        <button onClick={() => setShowChooseAddress(true) } data-cy="cart-address-change-button" className="_1NVec" aria-label="Change Address">Change</button>
                    </div>
                    <div className="_2o9TN">
                        <button aria-label="Total bill amount: 224 Rupees. Tap here to view detailed bill." className="Ripple_container__17nxL _1CK6G">
                            <div className="_15GdU">224</div>
                            <div className="_3grjI">View Detailed Bill<span className="icon-downArrow _3mMMb"></span></div>
                        </button>
                        <button id="makePaymentButton" data-cy="cart-make-payment-btn" className="Ripple_container__17nxL BIpEb">
                            <div onClick={()=>setMakePaymentModal(true) } className="_2HQUw"><span>Make Payment</span></div>
                        </button>
                    </div>
                </div>
            </div>
            </div>
            {showChooseAddress && <ChooseAddress chooseCurrentAddress={chooseCurrentAddress} setChooseCurrentAddress={setChooseCurrentAddress} setShowChooseAddress={setShowChooseAddress } />}
            {makePaymentModal && <PhonePaymentOption FoodItem={{ items }} Address={{ choosesAddress }} TotalAmount={{ totalToPay }} setMakePaymentModal={setMakePaymentModal } />}
    </>
    );
}