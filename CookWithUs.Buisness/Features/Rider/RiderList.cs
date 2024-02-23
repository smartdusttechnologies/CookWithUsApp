using CookWithUs.Buisness.Models;
using CookWithUs.Buisness.Repository.Interface;
using MediatR;
using Microsoft.AspNetCore.Http;
using ServcieBooking.Buisness.Interface;
using ServiceBooking.Buisness.Repository.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CookWithUs.Buisness.Features.Rider
{
    public class RiderList
    {

        public class Command : IRequest<RiderListModel>
        {
            public double latitude { get; set; }
            public double longitude { get; set; }
            public Command(double lat, double lon)
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
        public class Handler : IRequestHandler<Command, RiderListModel>
        {
            private readonly IRiderRepository _riders;

            public Handler(IRiderRepository riders)
            {
                _riders = riders;
            }

            public Task<RiderListModel> Handle(Command request, CancellationToken cancellationToken)
            {
                var userLatitude = request.latitude;
                var userLongitude = request.longitude;
                var maxDistance = 10; // Adjust based on your preference

                var allRiders = _riders.GetRiderList();

                var nearbyRider = allRiders
                    .Select(rider =>
                    {
                        rider.Distance = CalculateDistance(userLatitude, userLongitude, rider.Latitude, rider.Longitude);
                        return rider;
                    })
                    .Where(rider => rider.Distance < maxDistance)
                    .OrderBy(rider => rider.Distance)
                    .FirstOrDefault();

                return Task.FromResult(nearbyRider);
            }

            private decimal CalculateDistance(double lat1, double lon1, double lat2, double lon2)
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


