import axiosInstance from "../utils/axiosInstance";
export const AddAddress = (Detail) => {
    return axiosInstance.post('/User/AddressUpdate', Detail);
};

export const FetchAddress = (UserId) => {
    return axiosInstance.post('/User/AddressUpdate', UserId);
};