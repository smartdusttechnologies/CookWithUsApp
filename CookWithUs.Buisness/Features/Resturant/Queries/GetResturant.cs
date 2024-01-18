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
    public static class GetResturant
    {
        public class Command : IRequest<List<Restaurant>>
        {
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
        public class Handler : IRequestHandler<Command, List<Restaurant>>
        {
            private readonly IResturantRepository _restaurant;

            public Handler(IResturantRepository restaurant)
            {
                _restaurant = restaurant;
            }

            Task<List<Restaurant>> IRequestHandler<Command, List<Restaurant>>.Handle(Command request, CancellationToken cancellationToken)
            {
                return Task.FromResult(_restaurant.Get());
            }
        }
    }
    
}
