import axiosInstance from "../utils/axiosInstance";

export const getRestaurants = (latitude,longitude) => {
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
