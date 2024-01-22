import axiosInstance from "../utils/axiosInstance";

export const getRestaurants = () => {
    return axiosInstance.get("/resturant/Get");
};

export const getRestaurantDetails = (id) => {
    return axiosInstance.get(`/resturant/GetById/${id}`);
};
