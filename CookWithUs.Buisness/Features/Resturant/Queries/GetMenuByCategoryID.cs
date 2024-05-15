using CookWithUs.Buisness.Models;
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
    public class GetMenuByCategoryID
    {
        public class Command : IRequest<List<RestaurantMenu>>
        {
            public int CategoryId { get; set; }

            public Command(int id)
            {
                CategoryId = id;
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
        public class Handler : IRequestHandler<Command, List<RestaurantMenu>>
        {
            private readonly IResturantRepository _restaurant;

            public Handler(IResturantRepository resturant)
            {
                _restaurant = resturant;
            }

            Task<List<RestaurantMenu>> IRequestHandler<Command, List<RestaurantMenu>>.Handle(Command request, CancellationToken cancellationToken)
            {
                return Task.FromResult(_restaurant.GetMenuItemByCategoryID(request.CategoryId));
            }
        }
    }
}
