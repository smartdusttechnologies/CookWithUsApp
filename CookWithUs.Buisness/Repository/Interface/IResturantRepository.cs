﻿using CookWithUs.Buisness.Models;
using CookWithUs.Business.Common;

namespace ServiceBooking.Buisness.Repository.Interface
{
    public interface IResturantRepository
    {
        List<Restaurant> Get();
        RestaurantDetails Get(int resturantId);
        RequestResult<bool> RegisterRestaurant(RegisterRestaurantModel restaurantDetails);
        RequestResult<bool> CreateMenu(RestaurantMenu menu);
        RequestResult<bool> UpdateMenu(RestaurantMenu menu);
        RequestResult<bool> DeleteMenu(int menuId);
        RestaurantDetails GetByUserID(int userId);
        RequestResult<bool> PlaceOrder(OrderModel order);
        List<OrderModel> GetOrders();
        List<OrderModel> GetOrdersByUserID(int userId);
        OrderModel GetOrderDetails(int orderId);
    }
}