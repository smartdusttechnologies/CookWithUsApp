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
    public class MatchOTP
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
                ManageOtpModel result = _rider.MatchOTP(otpDetails);

                // If the first method returns true, call the second method
                if (result.OTP.Replace(" ", "") != request.details.OTP.Replace(" ", ""))
                {
                    return Task.FromResult(new RequestResult<bool>(false, new List<ValidationMessage> { new ValidationMessage { Reason = "Please Enter Correct OTP", Severity = ValidationSeverity.Error } }));
                }

                DateTime dateTime1 = DateTime.Parse(result.DateTime);
                DateTime dateTime2 = DateTime.Parse(request.details.DateTime);

                // Calculate the time difference
                TimeSpan timeDifference = dateTime2 - dateTime1;

                // Check if the difference is less than 15 minutes
                if (timeDifference.TotalMinutes > 15)
                {
                    return Task.FromResult(new RequestResult<bool>(false, new List<ValidationMessage> { new ValidationMessage { Reason = "ooh! Your OTP is Expire", Severity = ValidationSeverity.Error } }));
                }

                if (result.Type.Replace(" ", "") != request.details.Type.Replace(" ", ""))
                {
                    return Task.FromResult(new RequestResult<bool>(false, new List<ValidationMessage> { new ValidationMessage { Reason = "sorry! Your Type Is not matched. we are fixed as soon as possible", Severity = ValidationSeverity.Error } }));
                }

                if (result.Role.Replace(" ", "") != request.details.Role.Replace(" ", ""))
                {
                    return Task.FromResult(new RequestResult<bool>(false, new List<ValidationMessage> { new ValidationMessage { Reason = "sorry! Your Role Is not matched. we are fixed as soon as possible", Severity = ValidationSeverity.Error } }));
                }

                // Return success result
                return Task.FromResult(new RequestResult<bool>(true));
            }

        }
    }
}
