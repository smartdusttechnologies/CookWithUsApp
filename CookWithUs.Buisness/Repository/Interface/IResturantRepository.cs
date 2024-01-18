using CookWithUs.Buisness.Models;

namespace ServiceBooking.Buisness.Repository.Interface
{
    public interface IResturantRepository
    {
        List<Restaurant> Get();
        object Get(string resturantId);
    }
}