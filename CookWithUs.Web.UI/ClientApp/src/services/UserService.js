import axiosInstance from "../utils/axiosInstance";


export const FetchAddress = (UserId) => {
    return axiosInstance.get(`/user/FetchAddress/${UserId}`);
};
export const AddAddress = (Details) => {
    return axiosInstance.post('/user/AddressUpdate',  Details);
};


