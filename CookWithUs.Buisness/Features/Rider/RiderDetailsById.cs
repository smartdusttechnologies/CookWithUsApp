using CookWithUs.Buisness.Models;
using CookWithUs.Buisness.Repository.Interface;
using MediatR;
using Microsoft.AspNetCore.Http;
using ServcieBooking.Buisness.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CookWithUs.Buisness.Features.Rider
{
    public class RiderDetailsById
    {
        public class Command : IRequest<RiderListModel>
        {
            public int userId { get; set; }
            public Command(int UserId)
            {
                userId = UserId;
            }
        }
        public class Authorization : IAuthorizationRule<Command>
        {

            public Task Authorize(Command request, CancellationToken cancellationToken, IHttpContextAccessor contex)
            {
                //Check If This Rquest Is Accessable To User Or Not
                var user = new { UserId = 10, UserName = "Yashraj" };
                var userClaim = new { UserId = 10, ClaimType = "application", Claim = "GetUiPageType" };
                if (userClaim.Claim == "GetUiPageType" && user.UserId == userClaim.UserId)
                {
                    return Task.CompletedTask;
                }
                return Task.FromException(new UnauthorizedAccessException("You are Unauthorized"));
            }
        }
        public class Handler : IRequestHandler<Command, RiderListModel>
        {
            private readonly IRiderRepository _rider;

            public Handler(IRiderRepository rider)
            {
                _rider = rider;
            }

            Task<RiderListModel> IRequestHandler<Command, RiderListModel>.Handle(Command request, CancellationToken cancellationToken)
            {
                return Task.FromResult(_rider.GetRiderDetailsById(request.userId));
            }
        }
    }
}
