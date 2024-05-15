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

export const GetMenuByCategoryID = (CategoryId) => {
    return axiosInstance.post(`/resturant/GetMenuByCategoryID/${CategoryId}`);
};

export const CreateMenu = (details) => {
  return axiosInstance.post("/resturant/CreateMenu", details);
};

export const UpdateMenu = (details) => {
  return axiosInstance.post("/resturant/UpdateMenu", details);
};
export const DeleteMenu = (ItemId) => {
    return axiosInstance.post(`/resturant/DeleteMenu/${ItemId}`);
};

export const GetOrderDetails = (orderId) => {
  return axiosInstance.get(`/resturant/GetOrderDetails/${orderId}`);
};

export const GetOrdersByUserID = (userId) => {
  return axiosInstance.get(`/resturant/GetOrdersByUserID/${userId}`);
};

export const getOrderByRestaurantID = (restaurantId) => {
    return axiosInstance.get(`/resturant/getOrderByRestaurantID/${restaurantId}`);
};

export const PlaceOrder = (requestBody) => {
    return axiosInstance.post("/resturant/PlaceOrder",  requestBody );
};
export const AddMenuCategory = (details) => {
    return axiosInstance.post("/resturant/AddMenuCategory", details);
};
export const FetchMenuCategory = (restaurantId) => {
    return axiosInstance.get(`/resturant/FetchMenuCategory/${restaurantId}`);
};
export const UpdateMenuCategory = (details) => {
    return axiosInstance.post("/resturant/UpdateMenuCategory", details);
}