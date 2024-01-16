using AutoMapper;
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
        public class Command : IRequest<object>
        {
            public string resturantId { get; set; }
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
        public class Handler : IRequestHandler<Command, object>
        {
            private readonly IResturantRepository _returant;

            public Handler(IResturantRepository resturant)
            {
                _returant = resturant;
            }

            Task<object> IRequestHandler<Command, object>.Handle(Command request, CancellationToken cancellationToken)
            {
                return Task.FromResult(_returant.Get(request.resturantId));
            }
        }
    }

}
