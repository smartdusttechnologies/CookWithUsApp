using CookWithUs.Buisness.Models.LocationService;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace CookWithUs.Buisness.Hubs
{
    public class LocationHub : Hub
    {
        private readonly IDictionary<string, UserConnection> _connections;

        public LocationHub(IDictionary<string, UserConnection> connections)
        {
            _connections = connections;
        }

        public async Task JoinRoom(UserConnection userConnection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.Room);

            _connections[Context.ConnectionId] = userConnection;

            await Clients.Group(userConnection.Room).SendAsync("GetLocation", "BotUser",
                 new Location { Latitude = 25.5908, Longitude = 85.1348 });
        }
        public async Task SetLocation(Location location)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                await Clients.Group(userConnection.Room).SendAsync("GetLocation", userConnection.User, location);
            }
        }

    }
}
