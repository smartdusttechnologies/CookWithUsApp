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
        //private readonly IDictionary<string, UserConnection> _connections;

        //public LocationHub(IDictionary<string, UserConnection> connections)
        //{
        //    _connections = connections;
        //}

        public async Task JoinRoom(int orderId)
        {
            string roomName = $"OrderRoom_{orderId}";
            await Groups.AddToGroupAsync(Context.ConnectionId, roomName);

            //_connections[Context.ConnectionId] = userConnection;

         
        }
        public async Task NotifySpecificRestaurantForNewOrder(int orderId, int restaurantId)
        {
            string restaurantRoomName = $"OrderRoom_Restaurant_{restaurantId}";
            await Clients.Group(restaurantRoomName).SendAsync("NewOrderNotification", orderId);
        }

    }
}
