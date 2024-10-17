using CookWithUs.Buisness.Models;
using CookWithUs.Buisness.Repository.Interface;
using CookWithUs.Business.Common;
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
    public class OTPAuthenticate
    {
        public class Command : IRequest<RequestResult<bool>>
        {
            public ManageOtpModel details { get; set; }
            public Command(ManageOtpModel Details)
            {
                details = Details;
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
        public class Handler : IRequestHandler<Command, RequestResult<bool>>
        {
            private readonly IRiderRepository _rider;

            public Handler(IRiderRepository resturant)
            {
                _rider = resturant;
            }

            Task<RequestResult<bool>> IRequestHandler<Command, RequestResult<bool>>.Handle(Command request, CancellationToken cancellationToken)
            {
                // Call the first method
                string otpDetails = request.details.Details;
                RequestResult<bool> result1 = _rider.DeleteAllOTP(otpDetails);
                // If the first method returns true, call the second method
                if (result1.IsSuccessful)
                {
                    return Task.FromResult(_rider.AddOTP(request.details));
                }
                // If the first method returns false, return the result of the first method
                return Task.FromResult(new RequestResult<bool>(false));
            }
        }
    }
}
