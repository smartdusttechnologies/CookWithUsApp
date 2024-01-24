using AutoMapper;
using CookWithUs.Buisness.Models;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;
using ServcieBooking.Buisness.Interface;
using ServcieBooking.Buisness.Repository.Interface;
using ServiceBooking.Buisness.Repository.Interface;

namespace ServcieBooking.Buisness.Features.Resturant
{
    public static class GetByIdResturant
    {
        public class Command : IRequest<RestaurantDetails>
        {
            public int resturantId { get; set; }

            public Command(int id)
            {
                resturantId = id;
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
        public class Handler : IRequestHandler<Command, RestaurantDetails>
        {
            private readonly IResturantRepository _restaurant;

            public Handler(IResturantRepository resturant)
            {
                _restaurant = resturant;
            }

            Task<RestaurantDetails> IRequestHandler<Command, RestaurantDetails>.Handle(Command request, CancellationToken cancellationToken)
            {
                return Task.FromResult(_restaurant.Get(request.resturantId));
            }
        }
    }

}
