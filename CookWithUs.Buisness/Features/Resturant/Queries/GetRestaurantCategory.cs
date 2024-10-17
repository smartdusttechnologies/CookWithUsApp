using CookWithUs.Buisness.Models;
using MediatR;
using Microsoft.AspNetCore.Http;
using ServcieBooking.Buisness.Interface;
using ServiceBooking.Buisness.Repository.Interface;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;


namespace CookWithUs.Buisness.Features.Resturant.Queries
{
    public static class GetRestaurantCategory
    {
        // Command for fetching restaurant categories
        public class Command : IRequest<List<RestaurantCategory>>
        {
            public Command() { } // No parameters required
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

        // Handler to fetch the restaurant categories from the repository
        public class Handler : IRequestHandler<Command, List<RestaurantCategory>>
        {
            private readonly IResturantRepository _categoryRepository;

            public Handler(IResturantRepository categoryRepository)
            {
                _categoryRepository = categoryRepository;
            }
            public  Task<List<RestaurantCategory>> Handle(Command request, CancellationToken cancellationToken)
            {
                var allCategories =  _categoryRepository.GetRestaurantCategory().ToList();
                return Task.FromResult(allCategories);
            }
        }
    }

}
