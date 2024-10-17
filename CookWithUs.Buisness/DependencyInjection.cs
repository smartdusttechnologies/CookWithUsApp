using MediatR;
using Microsoft.Extensions.DependencyInjection;
using ServcieBooking.Buisness.Interface;
using ServcieBooking.Buisness.PipelineBehaviors;
using ServcieBooking.Buisness.Features.Resturant;
using CookWithUs.Buisness.Features.Resturant.Queries;
using CookWithUs.Buisness.Features.Document.Queries;
using CookWithUs.Buisness.Features.Rider;
using CookWithUs.Buisness.Features.User;

namespace ServcieBooking.Buisness
{
    public static class ServiceExtensions
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            services.AddMediatR(cf => cf.RegisterServicesFromAssembly(typeof(ServiceExtensions).Assembly));
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(AuthorizationBehavior<,>));
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(LoggingBehavior<,>));
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));
            services.AddTransient<IAuthorizationRule<GetResturant.Command>, GetResturant.Authorization>();
            services.AddTransient<IAuthorizationRule<GetByIdResturant.Command>, GetByIdResturant.Authorization>();
            services.AddTransient<IAuthorizationRule<RegisterRestaurant.Command>, RegisterRestaurant.Authorization>();
            services.AddTransient<IAuthorizationRule<DownloadFile.Command>, DownloadFile.Authorization>();
            services.AddTransient<IAuthorizationRule<UploadFiles.Command>, UploadFiles.Authorization>();
            services.AddTransient<IAuthorizationRule<CreateMenu.Command>, CreateMenu.Authorization>();
            services.AddTransient<IAuthorizationRule<UpdateMenu.Command>, UpdateMenu.Authorization>();
            services.AddTransient<IAuthorizationRule<DeleteMenu.Command>, DeleteMenu.Authorization>();
            services.AddTransient<IAuthorizationRule<GetMenuByCategoryID.Command>, GetMenuByCategoryID.Authorization>();
            services.AddTransient<IAuthorizationRule<GetRestaurantByUserID.Command>, GetRestaurantByUserID.Authorization>();
            services.AddTransient<IAuthorizationRule<PlaceOrder.Command>, PlaceOrder.Authorization>();
            services.AddTransient<IAuthorizationRule<GetOrders.Command>, GetOrders.Authorization>();
            services.AddTransient<IAuthorizationRule<GetOrdersByUserID.Command>, GetOrdersByUserID.Authorization>();
            services.AddTransient<IAuthorizationRule<GetOrderDetails.Command>, GetOrderDetails.Authorization>();
            services.AddTransient<IAuthorizationRule<GetOrdersByUserID.Command>, GetOrdersByUserID.Authorization>();
            services.AddTransient<IAuthorizationRule<RiderList.Command>, RiderList.Authorization>();
            services.AddTransient<IAuthorizationRule<RiderOrderById.Command>, RiderOrderById.Authorization>();
            services.AddTransient<IAuthorizationRule<OrderUpdate.Command>, OrderUpdate.Authorization>();
            services.AddTransient<IAuthorizationRule<OrderPlace.Command>, OrderPlace.Authorization>();

            services.AddTransient<IAuthorizationRule<FetchAddress.Command>, FetchAddress.Authorization>();
            services.AddTransient<IAuthorizationRule<AddressUpdate.Command>, AddressUpdate.Authorization>();
            services.AddTransient<IAuthorizationRule<FetchCartDetail.Command>, FetchCartDetail.Authorization>();
            services.AddTransient<IAuthorizationRule<OrderHistory.Command>, OrderHistory.Authorization>();
            services.AddTransient<IAuthorizationRule<FetchAddress.Command>, FetchAddress.Authorization>();
            services.AddTransient<IAuthorizationRule<AddressUpdate.Command>, AddressUpdate.Authorization>();
            services.AddTransient<IAuthorizationRule<UpdateAddress.Command>, UpdateAddress.Authorization>();
            services.AddTransient<IAuthorizationRule<DeleteAddress.Command>, DeleteAddress.Authorization>();
            services.AddTransient<IAuthorizationRule<FetchCartDetail.Command>, FetchCartDetail.Authorization>();
            services.AddTransient<IAuthorizationRule<AddToCart.Command>, AddToCart.Authorization>();
            services.AddTransient<IAuthorizationRule<Cart.Command>, Cart.Authorization>();
            services.AddTransient<IAuthorizationRule<CreateMenuCategory.Command>, CreateMenuCategory.Authorization>();
            services.AddTransient<IAuthorizationRule<UpdateMenuCategory.Command>, UpdateMenuCategory.Authorization>();
            services.AddTransient<IAuthorizationRule<FetchAllMenuCategory.Command>, FetchAllMenuCategory.Authorization>();
            services.AddTransient<IAuthorizationRule<getOrderByRestaurantID.Command>, getOrderByRestaurantID.Authorization>();
            services.AddTransient<IAuthorizationRule<SetOrderStatus.Command>, SetOrderStatus.Authorization>();
            services.AddTransient<IAuthorizationRule<RiderDetailsById.Command>, RiderDetailsById.Authorization>();
            services.AddTransient<IAuthorizationRule<RiderSetStatus.Command>, RiderSetStatus.Authorization>();
            services.AddTransient<IAuthorizationRule<GetOrderDetailsById.Command>, GetOrderDetailsById.Authorization>();
            services.AddTransient<IAuthorizationRule<FindOrder.Command>, FindOrder.Authorization>();
            services.AddTransient<IAuthorizationRule<Cart.Command>, Cart.Authorization>();
            services.AddTransient<IAuthorizationRule<AssignRiderOrder.Command>, AssignRiderOrder.Authorization>();
            services.AddTransient<IAuthorizationRule<RiderStatus.Command>, RiderStatus.Authorization>();
            services.AddTransient<IAuthorizationRule<SendOrderRequest.Command>, SendOrderRequest.Authorization>();
            services.AddTransient<IAuthorizationRule<checkRiderOrderDetails.Command>, checkRiderOrderDetails.Authorization>();
            services.AddTransient<IAuthorizationRule<RiderSignup.Command>, RiderSignup.Authorization>();
            services.AddTransient<IAuthorizationRule<CheckUserMobile.Command>, CheckUserMobile.Authorization>();
            services.AddTransient<IAuthorizationRule<OTPAuthenticate.Command>, OTPAuthenticate.Authorization>();
            services.AddTransient<IAuthorizationRule<MatchOTP.Command>, MatchOTP.Authorization>();
            services.AddTransient<IAuthorizationRule<RiderLogin.Command>, RiderLogin.Authorization>();
            services.AddTransient<IAuthorizationRule<SignupUser.Command>, SignupUser.Authorization>();
            services.AddTransient<IAuthorizationRule<LoginUser.Command>, LoginUser.Authorization>();
            services.AddTransient<IAuthorizationRule<GetUserByUserName.Command>, GetUserByUserName.Authorization>();
            services.AddTransient<IAuthorizationRule<GetRestaurantCategory.Command>, GetRestaurantCategory.Authorization>();
            services.AddTransient<IAuthorizationRule<RestaurantSignup.Command>, RestaurantSignup.Authorization>();
            services.AddTransient<IAuthorizationRule<RestaurantDetailsLogin.Command>, RestaurantDetailsLogin.Authorization>();
            services.AddTransient<IAuthorizationRule<GetRestaurantByEmail.Command>, GetRestaurantByEmail.Authorization>();
            return services;
        }
    }
}
