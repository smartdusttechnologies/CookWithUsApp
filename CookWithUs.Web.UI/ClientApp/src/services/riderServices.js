import axiosInstance from "../utils/axiosInstance";

export const RiderDetail = (latitude, longitude) => {
    return axiosInstance.get("/Rider/RiderDetail", {
        params: {
            lat: latitude,
            lon: longitude,
        },
    });
};
export const RiderRegister = (details) => {
    return axiosInstance.post("/Rider/RiderRegister", details);
};
export const AssignRiderOrder = (details) => {
    return axiosInstance.post("/Rider/AssignRiderOrder", details);
};
export const SendOrderRequest = (riderDetais) => {
    return axiosInstance.post("/Rider/SendOrderRequest",riderDetais);
};
export const Orderdetails = ( orderdetail) => {
    return axiosInstance.post("/Rider/RiderOrder", orderdetail);
};
export const OrderList = (UserId) => {
    return axiosInstance.get(`/Rider/RiderOrderList?UserId=${UserId}`);
};
export const updateOrder = (orderId) => {
    return axiosInstance.post('/Rider/OrderUpdate', { orderId });
};
export const RiderGetById = (id) => {
    return axiosInstance.get(`/Rider/RiderGetById/${id}`);
};
export const RiderSetStatus = (details) => {
    return axiosInstance.post("/Rider/RiderSetStatus", details);
};
export const RiderStatus = (details) => {
    return axiosInstance.post("/Rider/RiderStatus", details);
};
export const RiderSignup = (details) => {
    return axiosInstance.post("/Auth/RiderSignup", details);
};
export const FindOrder = (orderId) => {
    return axiosInstance.get(`/Rider/FindOrder/${orderId}`);
};
export const checkRiderOrderDetails = (riderId) => {
    return axiosInstance.get(`/Rider/checkRiderOrderDetails/${riderId}`);
};
export const GetOrderDetailsById = (id) => {
    return axiosInstance.get(`/Rider/GetOrderDetailsById/${id}`);
};
export const SendOTPEmail = (message) => {
    return axiosInstance.post("/Auth/SendOTPEmail",message);
};
export const OTPAuthenticate = (otpDetails) => {
    return axiosInstance.post("/Auth/OTPAuthenticate", otpDetails);
};
export const MatchOTP = (otpDetails) => {
    return axiosInstance.post("/Auth/MatchOTP", otpDetails);
};
export const RiderLogin = (loginDetails) => {
    return axiosInstance.post("/Auth/RiderLogin", loginDetails);
};