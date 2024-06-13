import React, { useEffect,useState } from "react";
import "./PhonePaymentOption.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { InitiateRazorPayPayment } from "../../services/paymentServices";
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
export default function PhonePaymentOption({ setIsOpenVariantModal,  FoodItem, Address, TotalAmount }) {
    const notifyRestaurantForNewOrder = async (connection, orderId) => {
        try {
            // Ensure that connection is established before invoking methods
            if (!connection) {
                await ConnectionBuild();
            }

            await connection.invoke("JoinRoom", orderId);
            await connection.invoke("NotifySpecificRestaurantForNewOrder", orderId, FoodItem.items[0].restaurantId);
            navigate("/success");
            console.log("Notification sent to the specific restaurant for new order:", orderId);
        } catch (error) {

            console.error("Error notifying the specific restaurant:", error);
        }
    };
    const ConnectionBuild = async () => {
        try {
            const connectionBuild = new HubConnectionBuilder()
                .withUrl("https://localhost:7042/location")
                .configureLogging(LogLevel.Information)
                .build();

            await connectionBuild.start(); // Wait for connection to be established
            console.log("Connection established:", connectionBuild);
            return connectionBuild;
            // Once connection is established, set it

        } catch (e) {
            console.log("Error establishing connection:", e);
            throw e;
        }
    };
    useEffect(() => {
        const elements = document.getElementsByClassName('_2_q9F');
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.display = 'none';
        }
        const elements2 = document.getElementsByClassName('_3JaG6');
        for (let i = 0; i < elements2.length; i++) {
            elements2[i].style.display = 'none';
        }
        const elements3 = document.getElementsByClassName('_hideWithPopup');
        for (let i = 0; i < elements3.length; i++) {
            elements3[i].style.display = 'none';
        }
    }, []);
    const navigate = useNavigate();

    //const [connection, setConnection] = useState();
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [orderId, SetOrderId] = useState(null);

    const handleRazorpayPayment = async () => {
        const data = {
            id: 2,
            customerName: "Yash raj",
            email: "itsyash@gmail.com",
            mobile: "123456789",
            totalAmount: 233,
        }; // here anything extra can be passed while creating an order
        const response = await InitiateRazorPayPayment(data);
        const order_id = response.data.id;
        const options = {
            key: `razorpay_key`,
            amount: 200,
            currency: "INR",
            name: "Cook With Us",
            description: "Food Order",
            image: "/your_logo.png",
            order_id: order_id,
            handler: (response) => {
                axios
                    .post(`payment/confirmRzpPayment`, response)
                    .then((response) => {
                        alert(response.data);
                        console.log(response.data);
                    })
                    .catch((err) => console.log(err));
            },
            prefill: {
                name: "TESTUSER", //your customer's name
                email: "testuser@mail.com",
                contact: "9000000000", //Provide the customer's phone number
            },
            theme: {
                color: "#F37254",
            },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };
    function buildForm({ action, params }) {
    const form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", action);

    Object.keys(params)?.forEach((key) => {
        const input = document.createElement("input");
        input.setAttribute("type", "hidden");
        input.setAttribute("name", key);
        input.setAttribute("value", stringifyValue(params[key]));
        form.appendChild(input);
    });
    return form;
    }
    function isDate(val) {
        // Cross realm comptatible
        return Object.prototype.toString.call(val) === "[object Date]";
    }
    function isObj(val) {
        return typeof val === "object";
    }
    function stringifyValue(val) {
        if (isObj(val) && !isDate(val)) {
            return JSON.stringify(val);
        } else {
            return val;
        }
    }
    function post(details) {
        const form = buildForm(details);
        document.body.appendChild(form);
        // setLoading(false);
        form.submit();
        form.remove();
    }
    const handlePaytmPayment = async () => {
        const data = {
            id: 2,
            customerName: "Yash raj",
            email: "itsyash@gmail.com",
            mobile: "123456789",
            totalAmount: 233,
        }; // here anything extra can be passed while creating an order

        await axios.post("payment/CreatePaytmPayment", data).then((response) => {
            console.log(response.data);
            const { paytmURL, ...params } = response?.data;
            post({
                action: paytmURL,
                params: params,
            });
        });
    };


    const handlePayment = () => {
        if (!paymentMethod) {
            toast.warn("Please select a payment method.");
            return;
        }



        switch (paymentMethod?.id) {
            case 0:
                handleRazorpayPayment();
                break;
            case 1:
                handlePaytmPayment();
                break;
            case 2: {
                const Food = FoodItem.items.map(item => {
                    return {
                        Id: 0,
                        UserId: item.userId,
                        Name: item.name,
                        ItemId: item.itemId,
                        Quantity: item.quantity,
                        RestaurantId: item.restaurantId,
                        Price: item.price,
                        DiscountedPrice: item.discountedPrice,
                        Time: item.time,
                        RestaurantLocation: item.restaurantLocation,
                        RestaurantName: item.restaurantName
                    };
                });

                const Data = {
                    OrderID: 0,
                    UserID: Address.OrderPicker.userId,
                    OrderDate: new Date(),
                    DeliveryAddress: Address.OrderPicker.address,
                    PaymentMethod: "Cash on Delivery",
                    TotalAmount: TotalAmount.totalToPay,
                    OrderStatus: "Processing",
                    RiderId: 0,
                    RestaurantId: FoodItem.items[0].restaurantId,
                    FoodList: Food

                };

                axios.post('/user/PlaceOrder', Data)
                    .then(async response => {
                        SetOrderId(response.data.requestedObject);

                        const connection = await ConnectionBuild();
                        await notifyRestaurantForNewOrder(connection, response.data.requestedObject);
                        // Handle success response
                    })
                    .catch(error => {
                        // Handle error
                        console.error('Error placing order:', error);
                    });
                /*const response = ConnectionBuild();*/

                break;
            }

            default:
                toast.warn("Invalid payment method.");
        }
    };
    return (
        
        <>
            <div style={{height:"100%"} }>
                <div className="_2yoTv">
                    <div className="style_container_2wGgmQBL">
                        <div className="style_container_2wGgmQBL">
                            <div className="styles_container_2U_BJoll styles_containerUx4_2R4FRGb5">
                                <div className="styles_header_3pJd-soj styles_headerUx4_1WAu6S4B">
                                    <div className="Header_container_17TeZht_ Header_containerUx4_2XTqmRvT"><button
                                        onClick={() => setIsOpenVariantModal(false) }
                                        data-testid="header_back"
                                        className="Header_containerButton_8joGRyzf Header_containerButtonUx4_1oib6YLY"
                                        aria-label="Go Back"><svg width="20" height="18" viewBox="0 0 20 16" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.9"
                                                d="M6.81875 14.5714L1 8.23808M1 8.23808L6.81875 1.90475M1 8.23808L19 8.23808"
                                                stroke="var(--arrow-color-env, #66686E)" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round"></path>
                                        </svg></button>
                                        <div className="Header_containerContent_2n-qQAeo">
                                            <div className="styles_header_2m84gsh0">
                                                <h4 className="styles_headerTitleUx4_2H9faJAq" data-testid="header_title">Payment Options
                                                </h4>
                                                <div className="styles_headerSubtitleUx4_2w0M1AuO" data-testid="header_subtitle">1 item •
                                                    Total: ₹340</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="styles_content_3vmBOQV0 styles_contentUx4_2ASL4wVh">
                                    <div className="DeliveryAddressView_wrapper_1zazTnRd">
                                        <div className="DeliveryAddressView_innerWrapper_3H4RKzRr">
                                            <div className="DeliveryAddressView_icons_3L9XU_AK"><span data-testid="dav_outlet_icon"><svg
                                                width="12" height="12" viewBox="0 0 12 12" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="6" cy="6" r="4.5" fill="white" stroke="#6541E4" stroke-width="3">
                                                </circle>
                                            </svg></span><svg width="4" height="15" viewBox="0 0 4 24" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M2 0V27" stroke="#6541E4" stroke-width="5"></path>
                                                </svg><span data-testid="dav_addr_icon"><svg width="12" height="12" viewBox="0 0 12 12"
                                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="6" cy="6" r="4.5" fill="white" stroke="#6541E4" stroke-width="3">
                                                    </circle>
                                                </svg></span></div>
                                            <p className="ScreenReaderOnly_screenReaderOnly_15MQ-BaD">Delivering to: Work Near School,
                                                G4q6+265, Simra-parsa Bazar Rd, Punpun, Patna, Bihar 804453, India</p>
                                            <div className="DeliveryAddressView_details_3OknIm69" aria-hidden="true">
                                                <div className="DeliveryAddressView_pickupDetails_1rjxaQZT">
                                                    <div className="DeliveryAddressView_restaurantName_2QejD4Cm"
                                                        data-testid="dav_outlet_name">Pizza Hub</div><span
                                                            className="DeliveryAddressView_separator_nkPQ345c">|</span>
                                                    <p className="DeliveryAddressView_pickupSubtext_3IKZifcp">Delivery in: 55-60 mins</p>
                                                </div>
                                                <div className="DeliveryAddressView_deliveryDetails_2yW-ZRVX">
                                                    <div className="DeliveryAddressView_annotation_1pIAn_Ia" data-testid="dav_addr_tag">Work
                                                    </div><span className="DeliveryAddressView_separator_nkPQ345c">|</span>
                                                    <div className="DeliveryAddressView_deliveryAddress_21_UKzb1"
                                                        data-testid="dav_addr_dtls">Near School, G4q6+265, Simra-parsa Bazar Rd, Punpun,
                                                        Patna, Bihar 804453, India</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="PaymentUIHandler-v4_container_3VG0fIsc PaymentUIHandler-v4_containerUx4_2dradPLX">
                                        <div className="OffersStrip_banner_NB4h2gO4" data-testid="offer_strip_container">
                                            <div className="OffersStrip_wrapper_dv1b7JqT">
                                                <div className="OffersStrip_carousel_2zTB23eO">
                                                    <div className="OffersStrip_carouselStaticItem_3vD3V5nT">
                                                        <div className="OffersStrip_carouselIcon_1WXuKVSe"><img crossorigin="anonymous"
                                                            alt=""
                                                            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/v1685605082/Ratnesh_Badges/Icon_for_offer.png"
                                                            className="OffersStrip_carouselImg_38qKA6Z3"
                                                            data-testid="offer_strip_static_image" /></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="OffersStrip_bannerContentContainer_36CRbueG" data-testid="offer_strip_text">Save
                                                <span style={{ fontWeight: 600 }}>upto ₹68</span> more with payment offers</div>
                                            <div className="OffersStrip_ArrowIconWrapper_13QbaT6S" aria-hidden="true"><svg width="20"
                                                height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                    d="M8 14.54L12.105 10.4L8 6.26L8.9843 5L14 10.4L8.9843 15.8L8 14.54Z"
                                                    fill="#1BA672"></path>
                                            </svg></div>
                                        </div>
                                        <div className="PaymentGroup-v4_paymentGroup_3Q5FegGu" data-testid="pg_container">
                                            <div className="PaymentGroup-v4_paymentGroupHeader_1_5oQRhP">
                                                <div className="PaymentGroup-v4_paymentGroupHeaderTitleContainer_2slIigo7"><img
                                                    alt=""
                                                    className="sc-llJcti kiXfMA PaymentGroup-v4_paymentGroupHeaderGroupIcon_3fRCNRL5"
                                                    src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_64/portal/m/upi_group.png"
                                                    height="16px" />
                                                    <h2 className="PaymentGroup-v4_paymentGroupHeaderTitle_1IbAmKSG"
                                                        data-testid="pg_upi_title">Pay by any UPI App</h2>
                                                </div>
                                            </div>
                                            <div className="PaymentGroup-v4_paymentGroupContainer_1u_Nn8rZ">
                                                <div
                                                    className="PaymentGroup-v4_paymentGroupContainerRow_1Nym0Db5 PaymentGroup-v4_paymentGroupContainerColumn_3UHb0jUV">
                                                    <div className="NewUpi-v4_paymentMethod_2C36UHdj">
                                                        <div data-testid="pm_nu_container">
                                                            <div className="NewUpi-v4_container_2moX6zUd">
                                                                <div className="styles-v4_icon_3v8U5RPP NewUpi-v4_paymentMethodCardNewIconParent_luMuTT2V"
                                                                    data-testid="pm_nu_icon" aria-hidden="true">
                                                                    <div className="NewUpi-v4_paymentMethodCardNewIcon_3zE4QG9C"></div>
                                                                </div>
                                                                <div className="styles_container_1npcgTkG styles_name_Lvfatkqb NewUpi-v4_paymentMethodCardNewTitle_UyP4Cnag"
                                                                    data-testid="pm_nu_name">
                                                                    <div aria-disabled="false" tabindex="0" role="button"
                                                                        className="styles_nameWrapper_2gaxBtO7">
                                                                        <div className="styles_truncateText_AhBvukJ7">Add New UPI ID</div>
                                                                    </div>
                                                                    <div className="styles_promoMsg_1fqbWYNW" data-testid="promo-msg"
                                                                        aria-hidden="true">
                                                                        <div>You need to have a registered UPI ID</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="PaymentGroup-v4_paymentGroup_3Q5FegGu" data-testid="pg_container">
                                            <div className="PaymentGroup-v4_paymentGroupHeader_1_5oQRhP">
                                                <div className="PaymentGroup-v4_paymentGroupHeaderTitleContainer_2slIigo7">
                                                    <h2 className="PaymentGroup-v4_paymentGroupHeaderTitle_1IbAmKSG"
                                                        data-testid="pg_card_title">Credit &amp; Debit Cards</h2>
                                                </div>
                                            </div>
                                            <div className="PaymentGroup-v4_paymentGroupContainer_1u_Nn8rZ">
                                                <div className="NewCard-v4_paymentMethod_2KPuKabG" data-testid="pm_nc_container">
                                                    <div className="NewCard-v4_paymentMethodContainer_1XgQAF_U">
                                                        <div className="styles-v4_icon_3v8U5RPP NewCard-v4_paymentMethodCardNewIconParent_1yZxWumq NewCard-v4_paymentMethodCardNewIconParentWithSubtext_2bcxr2yu"
                                                            data-testid="pm_nc_icon" aria-hidden="true">
                                                            <div className="NewCard-v4_paymentMethodCardNewIcon_1hI0F09a"></div>
                                                        </div>
                                                        <div className="styles_container_1npcgTkG styles_name_Lvfatkqb NewCard-v4_paymentMethodCardNewTitle_3I0DWrIV"
                                                            data-testid="pm_nc_name">
                                                            <div aria-disabled="false" tabindex="0" role="button"
                                                                className="styles_nameWrapper_2gaxBtO7">
                                                                <div className="styles_truncateText_AhBvukJ7">Add New Card</div>
                                                            </div>
                                                            <div className="styles_promoMsg_1fqbWYNW" data-testid="promo-msg"
                                                                aria-hidden="true">
                                                                <div>Save and Pay via Cards.</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="PaymentGroup-v4_paymentGroup_3Q5FegGu" data-testid="pg_container">
                                            <div className="PaymentGroup-v4_paymentGroupHeader_1_5oQRhP">
                                                <div className="PaymentGroup-v4_paymentGroupHeaderTitleContainer_2slIigo7">
                                                    <h2 className="PaymentGroup-v4_paymentGroupHeaderTitle_1IbAmKSG"
                                                        data-testid="pg_mo_title">More Payment Options</h2>
                                                </div>
                                            </div>
                                            <div className="PaymentGroup-v4_paymentGroupContainer_1u_Nn8rZ">
                                                <div className="PaymentOption-v4_containerBorder_2a_jNgRZ" data-testid="pg_mo_wal">
                                                    <div className="PaymentOption-v4_container_2NfWVPjQ">
                                                        <div className="styles-v4_icon_3v8U5RPP PaymentOption-v4_containerIconParent_3FZDum-2"
                                                            data-testid="pg_mo_wal_icon" aria-hidden="true"><img crossorigin="anonymous"
                                                                className="styles-v4_iconImg_25Y5Kzks PaymentOption-v4_containerIconWithUrl_37qhy8VR"
                                                                alt=""
                                                                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_64,e_trim/PaymentLogos/instruments/4x/Wallet"
                                                                width="24" /></div>
                                                        <div className="PaymentOption-v4_containerTextWrapper_2fKIj4ul" role="button"
                                                            tabindex="0" aria-label="Wallets. Paytm, PhonePe, Amazon Pay &amp; more">
                                                            <div className="PaymentOption-v4_containerText_8vTEHWoU"
                                                                data-testid="pg_mo_wal_header" aria-hidden="true">Wallets</div>
                                                            <div className="PaymentOption-v4_containerSubtext_3xDV0ITU"
                                                                data-testid="pg_mo_wal_subtext" aria-hidden="true">Paytm, PhonePe,
                                                                Amazon Pay &amp; more</div>
                                                        </div>
                                                        <div className="PaymentOption-v4_containerArrowIconWrapper_3oi8xyB4"
                                                            aria-hidden="true"><svg width="8" height="12" viewBox="0 0 8 12" fill="none"
                                                                className="PaymentOption-v4_containerArrowIcon_13glsTwt">
                                                                <path d="M1 1.00024L6 6.00024L1 11.0002" stroke="#BABBC0"
                                                                    stroke-width="1.5"></path>
                                                            </svg></div>
                                                    </div>
                                                    <div></div>
                                                </div>
                                                <div className="PaymentOption-v4_containerBorder_2a_jNgRZ" data-testid="pg_mo_fc">
                                                    <div className="PaymentOption-v4_container_2NfWVPjQ">
                                                        <div className="styles-v4_icon_3v8U5RPP PaymentOption-v4_containerIconParent_3FZDum-2"
                                                            data-testid="pg_mo_fc_icon" aria-hidden="true"><img crossorigin="anonymous"
                                                                className="styles-v4_iconImg_25Y5Kzks PaymentOption-v4_containerIconWithUrl_37qhy8VR"
                                                                alt=""
                                                                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_64,e_trim/PaymentLogos/instruments/4x/food_card"
                                                                width="24" /></div>
                                                        <div className="PaymentOption-v4_containerTextWrapper_2fKIj4ul" role="button"
                                                            tabindex="0"
                                                            aria-label="Pluxee. Pluxee card valid only on Food &amp; Instamart">
                                                            <div className="PaymentOption-v4_containerText_8vTEHWoU"
                                                                data-testid="pg_mo_fc_header" aria-hidden="true">Pluxee</div>
                                                            <div className="PaymentOption-v4_containerSubtext_3xDV0ITU"
                                                                data-testid="pg_mo_fc_subtext" aria-hidden="true">Pluxee card valid only
                                                                on Food &amp; Instamart</div>
                                                        </div>
                                                        <div className="PaymentOption-v4_containerArrowIconWrapper_3oi8xyB4"
                                                            aria-hidden="true"><svg width="8" height="12" viewBox="0 0 8 12" fill="none"
                                                                className="PaymentOption-v4_containerArrowIcon_13glsTwt">
                                                                <path d="M1 1.00024L6 6.00024L1 11.0002" stroke="#BABBC0"
                                                                    stroke-width="1.5"></path>
                                                            </svg></div>
                                                    </div>
                                                    <div></div>
                                                </div>
                                                <div className="PaymentOption-v4_containerBorder_2a_jNgRZ" data-testid="pg_mo_nb">
                                                    <div className="PaymentOption-v4_container_2NfWVPjQ">
                                                        <div className="styles-v4_icon_3v8U5RPP PaymentOption-v4_containerIconParent_3FZDum-2"
                                                            data-testid="pg_mo_nb_icon" aria-hidden="true"><img crossorigin="anonymous"
                                                                alt=""
                                                                className="styles-v4_iconImg_25Y5Kzks PaymentOption-v4_containerIconWithUrl_37qhy8VR"
                                                                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_64,e_trim/PaymentLogos/instruments/4x/Net_banking"
                                                                width="24" /></div>
                                                        <div className="PaymentOption-v4_containerTextWrapper_2fKIj4ul" role="button"
                                                            tabindex="0" aria-label="Netbanking. Select from a list of banks">
                                                            <div className="PaymentOption-v4_containerText_8vTEHWoU"
                                                                data-testid="pg_mo_nb_header" aria-hidden="true">Netbanking</div>
                                                            <div className="PaymentOption-v4_containerSubtext_3xDV0ITU"
                                                                data-testid="pg_mo_nb_subtext" aria-hidden="true">Select from a list of
                                                                banks</div>
                                                        </div>
                                                        <div className="PaymentOption-v4_containerArrowIconWrapper_3oi8xyB4"
                                                            aria-hidden="true"><svg width="8" height="12" viewBox="0 0 8 12" fill="none"
                                                                className="PaymentOption-v4_containerArrowIcon_13glsTwt">
                                                                <path d="M1 1.00024L6 6.00024L1 11.0002" stroke="#BABBC0"
                                                                    stroke-width="1.5"></path>
                                                            </svg></div>
                                                    </div>
                                                    <div></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="PaymentGroup-v4_paymentGroup_3Q5FegGu" data-testid="pg_container">
                                            <div className="PaymentGroup-v4_paymentGroupHeader_1_5oQRhP">
                                                <div className="PaymentGroup-v4_paymentGroupHeaderTitleContainer_2slIigo7">
                                                    <h2 className="PaymentGroup-v4_paymentGroupHeaderTitle_1IbAmKSG"
                                                        data-testid="pg_cod_title">Pay on Delivery</h2>
                                                </div>
                                            </div>
                                            <div className="PaymentGroup-v4_paymentGroupContainer_1u_Nn8rZ">
                                                <div className="Cod-v4_paymentMethod_1oID1wp- "
                                                    data-testid="pm_cod_container">
                                                    <div className="Cod-v4_paymentMethodContainer_2bw3daUa">
                                                        <div className="styles-v4_icon_3v8U5RPP" data-testid="pm_cod_icon"
                                                            aria-hidden="true"><img crossorigin="anonymous"
                                                                alt=""
                                                                className="styles-v4_iconImg_25Y5Kzks"
                                                                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_64,e_grayscale/portal/m/COD_icon.png" />
                                                        </div>
                                                        <div className="styles_container_1npcgTkG styles_name_Lvfatkqb styles_containerDisabled_1Hy16t9n"
                                                            data-testid="pm_cod_name">
                                                            <div aria-label="Cash Cash on delivery is not available."
                                                                aria-disabled="true" tabindex="0" role="button"
                                                                className="styles_nameWrapper_2gaxBtO7">
                                                                <div className="styles_truncateText_AhBvukJ7">Pay on Delivery (Cash/UPI)
                                                                </div>
                                                            </div>
                                                            <div className="Alert-v4_alert_PepeXn3d Cod-v4_paymentMethodDisable_12vArO0z"
                                                                aria-hidden="true">
                                                                <p className="Alert-v4_alertMessage_2_GUfeog"
                                                                    data-testid="pm_cod_disable_msg">Cash on delivery is now available.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="_1r-M3 _3JaG6 _3C3Tg"></div>
                    <div className="_3JaG6 _3C3Tg"></div>
                </div>
            </div>
        </>
    );
}