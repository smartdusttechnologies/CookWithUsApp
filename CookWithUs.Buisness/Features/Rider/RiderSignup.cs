using CookWithUs.Buisness.Common;
using CookWithUs.Buisness.Models;
using CookWithUs.Buisness.Repository.Interface;
using CookWithUs.Buisness.Security.SecurityInterface;
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
    public class RiderSignup
    {
        public class Command : IRequest<RequestResult<bool>>
        {
            public RiderDetailsModel riders { get; set; }
            public Command(RiderDetailsModel riderDetails)
            {
                riders = riderDetails;
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
            private readonly ISecurityAuthentication _securityAuthentication;


            public Handler(IRiderRepository rider, ISecurityAuthentication securityAuthentication)
            {
                _rider = rider;
                _securityAuthentication = securityAuthentication;
            }

            Task<RequestResult<bool>> IRequestHandler<Command, RequestResult<bool>>.Handle(Command request, CancellationToken cancellationToken)
            {
                try
                {
                    var validationResult = _securityAuthentication.CheckRiderDetails(request.riders);
                    if (validationResult.IsSuccessful)
                    {
                        PasswordLogin passwordLogin = Hasher.HashPassword(request.riders.Password);
                        RequestResult<bool> requestResult = _rider.RiderSignup(request.riders, passwordLogin);
                        return Task.FromResult(requestResult);
                    }
                    return Task.FromResult(new RequestResult<bool>(false, validationResult.Message));
                }
                catch (Exception ex)
                {
                    return Task.FromResult(new RequestResult<bool>(false));
                }
                
            }

        }
    }
}
