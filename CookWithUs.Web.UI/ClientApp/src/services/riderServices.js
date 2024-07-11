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

export const FindOrder = (id) => {
    return axiosInstance.get(`/Rider/FindOrder/${id}`);
}
export const GetOrderDetailsById = (id) => {
    return axiosInstance.get(`/Rider/GetOrderDetailsById/${id}`);
}