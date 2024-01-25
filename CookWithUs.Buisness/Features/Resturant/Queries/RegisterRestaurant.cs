using CookWithUs.Buisness.Models;
using MediatR;
using Microsoft.AspNetCore.Http;
using ServcieBooking.Buisness.Interface;
using ServiceBooking.Buisness.Repository.Interface;
using SmartdustApp.Business.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CookWithUs.Buisness.Features.Resturant.Queries
{
    public static class RegisterRestaurant
    {
        public class Command : IRequest<RequestResult<bool>>
        {
            public int resturantId { get; set; }
            public RegisterRestaurantModel restaurantDetails { get; set; }

            public Command(RegisterRestaurantModel registerRestaurantModel)
            {
                restaurantDetails = registerRestaurantModel;
            }
        }
        public class Authorization : IAuthorizationRule<Command>
        {

            public Task Authorize(Command request, CancellationToken cancellationToken, IHttpContextAccessor contex)
            {
                //Check If This Rquest Is Accessable To User Or Not
                var user = new { UserId = 10, UserName = "Rajgupta" };
                var userClaim = new { UserId = 10, ClaimType = "application", Claim = "GetUiPageType" };
                if (userClaim.Claim == "GetUiPageType" && user.UserId == userClaim.UserId)
                {
                    return Task.CompletedTask;
                }
                return Task.FromException(new UnauthorizedAccessException("You are Unauthorized"));
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
                return Task.FromResult(_restaurant.RegisterRestaurant(request.restaurantDetails));
            }
        }
    }
}
