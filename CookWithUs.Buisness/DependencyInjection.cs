using MediatR;
using Microsoft.Extensions.DependencyInjection;
using ServcieBooking.Buisness.Interface;
using ServcieBooking.Buisness.PipelineBehaviors;
using ServcieBooking.Buisness.Features.Resturant;
using CookWithUs.Buisness.Features.Resturant.Queries;
using CookWithUs.Buisness.Features.Document.Queries;

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
            return services;

        }
    }
}
