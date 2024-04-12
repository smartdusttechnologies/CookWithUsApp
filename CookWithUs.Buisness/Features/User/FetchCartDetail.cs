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

namespace CookWithUs.Buisness.Features.User
{
    public class FetchCartDetail
    {
        public class Command : IRequest<List<CartModel>>
        {
            public int userId { get; set; }
            public Command(int  UserId)
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

        public class Handler : IRequestHandler<Command, List<CartModel>>
        {
            private readonly IUserRepository _user;

            public Handler(IUserRepository user)
            {
                _user = user;
            }

            Task<List<CartModel>> IRequestHandler<Command, List<CartModel>>.Handle(Command request, CancellationToken cancellationToken)
            {
                List<CartModel>  result = _user.CartDetails(request.userId);      
                return Task.FromResult(result);
            }
        }
    }
}
