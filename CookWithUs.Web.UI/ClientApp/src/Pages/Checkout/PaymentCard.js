import {
    Box,
    Button,
    ButtonBase,
    CircularProgress,
    Container,
    Paper,
    Radio,
    Typography,
    useTheme,
} from "@mui/material";
import React, { useState } from "react";
import CodIcon from "../../assets/icons/CodIcon";
import MastercardIcon from "../../assets/icons/MastercardIcon";
import PayPalIcon from "../../assets/icons/PayPalIcon";
import VisaIcon from "../../assets/icons/VisaIcon";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { InitiateRazorPayPayment } from "../../services/paymentServices";
import { ToastContainer, toast } from "react-toastify";
import * as signalR from '@microsoft/signalr';



const PAYMENT_OPTIONS = [
    {
        id: 0,
        payment: "RazorPay",
        label: "RazorPay UPI / Credit / Debit",
        icon: <VisaIcon />,
        icon1: <MastercardIcon />,
    },
    {
        id: 1,
        payment: "Paytm",
        label: "Paytm UPI / Card",
        icon: <VisaIcon />,
        icon1: <MastercardIcon />,
    },
    {
        id: 2,
        payment: "COD",
        label: "Cash",
        icon: <CodIcon />,
    },
];

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

function post(details) {
    const form = buildForm(details);
    document.body.appendChild(form);
    // setLoading(false);
    form.submit();
    form.remove();
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

function PaymentCard({ loading, FoodItem, Address, TotalAmount }) {
    const navigate = useNavigate();

    //const [connection, setConnection] = useState();
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [orderId, SetOrderId] = useState(null);
    const [userID, setUserID] = useState(1);
    
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
                const Food = FoodItem.items.map(item => ({
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
                }));

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
                        try {
                            const connection = await ConnectionBuild();
                            await addUserInRoom(connection, response.data.requestedObject);
                            await notifyRestaurantForNewOrder(connection, response.data.requestedObject);
                            await checkUsersInRoom(connection, response.data.requestedObject);
                        } catch (error) {
                            console.error('Error in establishing connection or notifying restaurant:', error);
                        }
                    })
                    .catch(error => {
                        // Handle error
                        console.error('Error placing order:', error);
                    });
                break;
            }

            default:
                toast.warn("Invalid payment method.");
        }
    };

    const ConnectionBuild = async () => {
        try {
            const connectionBuild = new signalR.HubConnectionBuilder()
                .withUrl('/location', {
                    skipNegotiation: true,
                    transport: signalR.HttpTransportType.WebSockets
                })
                .build();

            await connectionBuild.start();
            console.log("Connection established:", connectionBuild);
            return connectionBuild;
        } catch (e) {
            console.error("Error establishing connection:", e);
            throw e;
        }
    };
    const addUserInRoom = async (connection, orderId) => {
        try {
            await connection.invoke("JoinRoom", orderId,"User",1010);           
            console.log("User Join This Room:", orderId);
        } catch (error) {
            console.error("Error notifying the specific User:", error);
        }
    };
    const notifyRestaurantForNewOrder = async (connection, orderId) => {
        try {
            await connection.invoke("JoinRoom", orderId,"Restaurant",1);
            console.log("User Join This Room:", orderId);
            await connection.invoke("NotifySpecificRestaurantForNewOrder", orderId, FoodItem.items[0].restaurantId);
            navigate("/success");
            console.log("Notification sent to the specific restaurant for new order:", orderId);
        } catch (error) {
            console.error("Error notifying the specific restaurant:", error);
        }
    };
    const checkUsersInRoom = async (connection, orderId) => {
        try {
            const users = await connection.invoke("GetUsersInRoom", orderId);
            console.log(`Users in room for order ${orderId}:`, users);
        } catch (error) {
            console.error("Error getting users in room:", error);
        }
    };


    const theme = createTheme();

    return (
        <ThemeProvider theme={theme} style={{ marginTop: "100px" }}>
            <Paper
                style={{
                    background: theme.palette.common.white,
                    borderRadius: "inherit",
                    paddingBottom: theme.spacing(2),
                    paddingTop: theme.spacing(2),
                    marginTop: theme.spacing(2),
                    margin: "auto",

                }}
            >
                <Container>
                    <Box display="flex" alignItems="center">
                        <Box ml={theme.spacing(1)} />
                        <Typography variant="h5" color="textSecondary">
                            Payment
                        </Typography>
                    </Box>
                    {PAYMENT_OPTIONS.map((item, index) => (
                        <ButtonBase
                            key={`CARD_${index}`}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                width: "100%",
                                height: "100%",
                                padding: theme.spacing(1),
                                marginTop: theme.spacing(4),
                                border: `1px solid ${theme.palette.grey[300]}`,
                            }}
                            onClick={() => setPaymentMethod(item)}
                        >
                            <Box display="flex" alignItems="center">
                                <Radio
                                    color="primary"
                                    checked={paymentMethod?.id === item.id}
                                    onChange={() => setPaymentMethod(item)}
                                />
                                <Typography variant="body1" color="textSecondary">
                                    {item.label}
                                </Typography>
                            </Box>
                            <Box display="flex">
                                {item.icon}
                                {item.icon1 && (
                                    <>
                                        <Box ml={theme.spacing(1)} />
                                        {item.icon1}
                                    </>
                                )}
                            </Box>
                        </ButtonBase>
                    ))}
                    <Button
                        disabled={loading}
                        style={{
                            maxWidth: "auto",
                            padding: `${theme.spacing(2)} 0`,
                            background: theme.palette.primary.main,
                            marginTop: theme.spacing(2),
                            width: "100%",
                            borderRadius: 0,
                        }}
                        onClick={() => {
                            handlePayment();
                        }}
                    >
                        {loading ? (
                            <CircularProgress color="secondary" size={20} />
                        ) : (
                            <Typography
                                style={{
                                    ...theme.typography.body1,
                                    color: theme.palette.common.white,
                                    fontWeight: 700,
                                }}
                            >
                                PLACE ORDER
                            </Typography>
                        )}
                    </Button>
                    <Box mt={theme.spacing(2)} />
                    <Typography
                        variant="caption"
                        style={{
                            color: theme.palette.text.disabled,
                        }}
                    >
                        I agree and I demand that you execute the ordered service before the
                        end of the revocation period. I am aware that after complete
                        fulfillment of the service I lose my right of recission. Payment
                        transactions will be processed abroad.
                    </Typography>
                </Container>
                <ToastContainer />
            </Paper>
        </ThemeProvider>
    );
}

export default PaymentCard;
