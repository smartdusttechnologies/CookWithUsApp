import axiosInstance from "../utils/axiosInstance";

export const getRestaurants = (latitude, longitude) => {
  return axiosInstance.get("/resturant/Get", {
    params: {
      latitude: latitude,
      longitude: longitude,
    },
  });
};

export const getRestaurantDetails = (id) => {
  return axiosInstance.get(`/resturant/GetById/${id}`);
};

export const getRestaurantDetailsByUserID = (Userid) => {
  return axiosInstance.get(`/resturant/GetByUserID/${Userid}`);
};

export const ResgisterRestaurant = (details) => {
  return axiosInstance.post("/resturant/RestaurantResgister", details);
};

export const CreateMenu = (details) => {
  return axiosInstance.post("/resturant/CreateMenu", details);
};

export const UpdateMenu = (details) => {
  return axiosInstance.post("/resturant/UpdateMenu", details);
};

export const GetOrderDetails = (orderId) => {
  return axiosInstance.get(`/resturant/GetOrderDetails/${orderId}`);
};

export const GetOrdersByUserID = (userId) => {
  return axiosInstance.get(`/resturant/GetOrdersByUserID/${userId}`);
};
