using CookWithUs.Buisness.Models;
using CookWithUs.Buisness.Repository.Interface;
using CookWithUs.Business.Common;
using MediatR;
using Microsoft.AspNetCore.Http;
using ServcieBooking.Buisness.Interface;
using ServiceBooking.Buisness.Repository.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CookWithUs.Buisness.Features.Resturant.Queries
{
    public static class UpdateMenuCategory
    {
        public class Command : IRequest<RequestResult<bool>>
        {
            public MenuCategory menuCategory { get; set; }

            public Command(MenuCategory menuCategoryDetails)
            {
                menuCategory = menuCategoryDetails;
            }
        }
        public class Authorization : IAuthorizationRule<Command>
        {
            private readonly IHttpContextAccessor _httpContextAccessor;

            public Authorization(IHttpContextAccessor httpContextAccessor)
            {
                _httpContextAccessor = httpContextAccessor;
            }
            public Task Authorize(Command request, CancellationToken cancellationToken, IHttpContextAccessor contex)
            {
                var httpContext = _httpContextAccessor.HttpContext;
                if (httpContext == null || !httpContext.User.Identity.IsAuthenticated)
                {
                    httpContext.Response.StatusCode = 401; // Return 401 for unauthenticated users
                    return Task.CompletedTask;
                }
                var claimType = httpContext.User.Claims.FirstOrDefault(c => c.Type == "Role");

                if (claimType != null)
                {
                    // Replace with your actual authorization logic
                    if (claimType.Value == Role.Restaurant.ToString())
                    {
                        return Task.CompletedTask;
                    }
                }
                // If the role doesn't match, set the status code to 403 and throw an exception
                httpContext.Response.StatusCode = 403; // Forbidden
                return Task.FromException(new UnauthorizedAccessException("You are unauthorized to access this resource."));

            }
        }
        public class Handler : IRequestHandler<Command, RequestResult<bool>>
        {
            private readonly IResturantRepository _restaurant;

            public Handler(IResturantRepository resturant)
            {
                _restaurant = resturant;
            }

            Task<RequestResult<bool>> IRequestHandler<Command, RequestResult<bool>>.Handle(Command request, CancellationToken cancellationToken)
            {
                return Task.FromResult(_restaurant.UpdateMenuCategory(request.menuCategory));
            }
        }
    }
}
