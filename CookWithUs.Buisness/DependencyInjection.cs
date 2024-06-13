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

            services.AddTransient<IAuthorizationRule<Cart.Command>, Cart.Authorization>();
            return services;

        }
    }
}
