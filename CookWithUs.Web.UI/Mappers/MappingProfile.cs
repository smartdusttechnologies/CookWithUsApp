using AutoMapper;
using CookWithUs.Buisness.Models;
using CookWithUs.Web.UI.Models;

namespace SmartdustApp.Web.UI.Mappers
{
    public class MappingProfile :Profile
    {
        public MappingProfile()
        {
            CreateMap<RegisterRestaurantDTO, RegisterRestaurantModel>().ReverseMap();
            CreateMap<MenuDTO, RestaurantMenu>().ReverseMap();
        }
    }
}