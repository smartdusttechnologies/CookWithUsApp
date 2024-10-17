import axiosInstance from "../utils/axiosInstance";

export const GetUserByUserName = (UserName) => {
    return axiosInstance.get(`/user/GetUserByUserName/${UserName}`);
};
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
export const CheckUserMobile = (MobileNumber) => {
    return axiosInstance.get(`/Auth/CheckUserMobile/${MobileNumber}`);
}
export const SignupUser = (UserDetails) => {
    return axiosInstance.post('/Auth/SignupUser', UserDetails);
}
export const LoginUser = (loginDetails) => {
    return axiosInstance.post("/Auth/LoginUser", loginDetails);
};