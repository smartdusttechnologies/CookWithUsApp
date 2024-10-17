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
    public class checkRiderOrderDetails
    {
        public class Command : IRequest<RiderDetailsModel>
        {
            public int RiderId { get; set; }
            public Command(int id)
            {
                RiderId = id;
            }
        }
        public class Authorization : IAuthorizationRule<Command>
        {

            public Task Authorize(Command request, CancellationToken cancellationToken, IHttpContextAccessor contex)
            {
                //Check If This Rquest Is Accessable To User Or Not
                var user = new { Userid = 10, UserName = "Yashraj" };
                var userClaim = new { Userid = 10, ClaimType = "application", Claim = "GetUiPageType" };
                if (userClaim.Claim == "GetUiPageType" && user.Userid == userClaim.Userid)
                {
                    return Task.CompletedTask;
                }
                return Task.FromException(new UnauthorizedAccessException("You are Unauthorized"));
            }
        }
        public class Handler : IRequestHandler<Command, RiderDetailsModel>
        {
            private readonly IRiderRepository _rider;

            public Handler(IRiderRepository rider)
            {
                _rider = rider;
            }

            Task<RiderDetailsModel> IRequestHandler<Command, RiderDetailsModel>.Handle(Command request, CancellationToken cancellationToken)
            {
                return Task.FromResult(_rider.GetRiderDetailsById(request.RiderId));
            }
        }
    }
}
