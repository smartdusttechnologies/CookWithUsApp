import axiosInstance from "../utils/axiosInstance";


export const FetchAddress = (UserId) => {
    return axiosInstance.get(`/user/FetchAddress/${UserId}`);
};
export const AddAddress = (Details) => {
    return axiosInstance.post('/user/AddressUpdate',  Details);
};
export const AddressUpdate = (Details) => {
    return axiosInstance.post('/user/UpdateAddress', Details);
};
export const AddItemToCart = (Details) => {
    return axiosInstance.post('/user/AddItemToCart', Details);
};


