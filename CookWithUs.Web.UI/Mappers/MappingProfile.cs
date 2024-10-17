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
            CreateMap<VariantOptionDTO, VariantOption>().ReverseMap();
            CreateMap<OrderDTO, OrderModel>().ReverseMap();
            CreateMap<OrderHistoryDTO, OrderHistoryModel>().ReverseMap();
            CreateMap<AddressDTO, AddressModel>().ReverseMap();
            CreateMap<AddToCartDTO, AddToCartModel>().ReverseMap();
            CreateMap<CartDto, CartModel>().ReverseMap();
            CreateMap<MenuCategoryDTO, MenuCategory>().ReverseMap();
            CreateMap<SetOrderStatusDTO, SetOrderStatusModel>().ReverseMap();
            CreateMap<FindOrderDTO, FindOrderModel>().ReverseMap();
            CreateMap<SendOrderRequestDTO, SendOrderRequestModel>().ReverseMap();
            CreateMap<RiderDetailsDTO, RiderDetailsModel>().ReverseMap();
            CreateMap<UserDetailsDTO, UserDetailsModel>().ReverseMap();
            CreateMap<ManageOtpDTO, ManageOtpModel>().ReverseMap();
            CreateMap<LoginSequrityDetailsDTO, LoginSequrityDetailsModel>().ReverseMap();
            CreateMap<RestaurantDetailsDTO, RestaurantDetailsModel>().ReverseMap();
        }
    }
}