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
            public decimal latitude { get; set; }
            public decimal longitude { get; set; }
            public Command(decimal lat, decimal lon)
            {
                latitude = lat;
                longitude = lon;
            }
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
                var userLatitude = request.latitude;
                var userLongitude = request.longitude;
                var maxDistance = 150; // Adjust based on your preference

                var allRestaurants = _restaurant.Get();

                var nearbyRestaurants = allRestaurants
                    .Where(restaurant =>
                    {
                        var distance = CalculateDistance(
                            userLatitude, userLongitude,
                            restaurant.Latitude, restaurant.Longitude
                        );

                        return distance < maxDistance;
                    })
                    .ToList();

                return Task.FromResult(nearbyRestaurants);
            }
            private decimal CalculateDistance(decimal lat1, decimal lon1, decimal lat2, decimal lon2)
            {
                double R = 6371; // Earth radius in kilometers
                double dLat = ToRadians((double)(lat2 - lat1));
                double dLon = ToRadians((double)(lon2 - lon1));

                double a =
                    Math.Sin(dLat / 2) * Math.Sin(dLat / 2) +
                    Math.Cos(ToRadians((double)lat1)) * Math.Cos(ToRadians((double)lat2)) *
                    Math.Sin(dLon / 2) * Math.Sin(dLon / 2);

                double c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));

                double distance = R * c; // Distance in kilometers
                return (decimal)distance;
            }

            private double ToRadians(double angleInDegrees)
            {
                return Math.PI * angleInDegrees / 180.0;
            }

        }
    }
    
}
