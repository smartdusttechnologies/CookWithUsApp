import axiosInstance from "../utils/axiosInstance";

export const getRestaurants = () => {
    return axiosInstance.get("/resturant/Get");
};
