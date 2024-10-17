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
    public class RiderOrderById
    {
        public class Command : IRequest<List<RIderOrderModel>>
        {
            public int userId { get; set; }
            public Command(int UserId)
            {
                userId = UserId;
            }
        }
        public class Authorization : IAuthorizationRule<Command>
        {
            private readonly IHttpContextAccessor _httpContextAccessor;

            public Authorization(IHttpContextAccessor httpContextAccessor)
            {
                _httpContextAccessor = httpContextAccessor;
            }

            public Task Authorize(Command request, CancellationToken cancellationToken, IHttpContextAccessor contex)
            {
                var httpContext = _httpContextAccessor.HttpContext;
                if (httpContext == null || !httpContext.User.Identity.IsAuthenticated)
                {
                    httpContext.Response.StatusCode = 401; // Return 401 for unauthenticated users
                    return Task.CompletedTask;
                }
                var claimType = httpContext.User.Claims.FirstOrDefault(c => c.Type == "Role");

                if (claimType != null)
                {
                    // Replace with your actual authorization logic
                    if (claimType.Value == Role.Rider.ToString())
                    {
                        return Task.CompletedTask;
                    }
                }
                // If the role doesn't match, set the status code to 403 and throw an exception
                httpContext.Response.StatusCode = 403; // Forbidden
                return Task.FromException(new UnauthorizedAccessException("You are unauthorized to access this resource."));

            }
        }
        public class Handler : IRequestHandler<Command, List<RIderOrderModel>>
        {
            private readonly IRiderRepository _rider;

            public Handler(IRiderRepository rider)
            {
                _rider = rider;
            }

            Task<List<RIderOrderModel>> IRequestHandler<Command, List<RIderOrderModel>>.Handle(Command request, CancellationToken cancellationToken)
            {
                return Task.FromResult(_rider.OrderListById(request.userId));
            }
        }
    }
}
