using CookWithUs.Buisness.Models;
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
        RequestResult<bool> AddMenuCategory(MenuCategory menucategory);
        RequestResult<bool> UpdateMenuCategory(MenuCategory menucategory);
        RestaurantDetails GetByUserID(int userId);
        RequestResult<bool> PlaceOrder(OrderModel order);
        List<OrderModel> GetOrders();
        List<MenuCategory> FetchAllMenuCategory(int resturantId);
        List<OrderModel> GetOrdersByUserID(int userId);
        List<OrderModel> getOrderByRestaurantID(int userId);
        OrderModel GetOrderDetails(int orderId);
        List<RestaurantMenu> GetMenuItemByCategoryID(int categoryId);
    }
}