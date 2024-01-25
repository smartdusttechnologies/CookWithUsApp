using CookWithUs.Buisness.Models;
using SmartdustApp.Business.Common;

namespace ServiceBooking.Buisness.Repository.Interface
{
    public interface IResturantRepository
    {
        List<Restaurant> Get();
        RestaurantDetails Get(int resturantId);
        RequestResult<bool> RegisterRestaurant(RegisterRestaurantModel restaurantDetails);
    }
}