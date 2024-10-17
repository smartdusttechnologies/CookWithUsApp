using CookWithUs.Buisness.Models;
using CookWithUs.Buisness.Models.LocationService;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CookWithUs.Buisness.Hubs
{
    public class LocationHub : Hub
    {
        private static ConcurrentDictionary<string, string> _riders = new ConcurrentDictionary<string, string>();
        private static ConcurrentDictionary<string, List<(string connectionId, string userType, int orderId)>> _roomUsers = new ConcurrentDictionary<string, List<(string connectionId, string userType, int orderId)>>();

        // When a rider connects, store their connection ID
        public override async Task OnConnectedAsync()
        {
            try
            {
                var riderId = Context.GetHttpContext().Request.Query["riderId"];
                _riders[riderId] = Context.ConnectionId;
                await base.OnConnectedAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in OnConnectedAsync: {ex.Message}");
            }
        }

        // When a rider disconnects, remove their connection ID
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            try
            {
                var riderId = _riders.FirstOrDefault(x => x.Value == Context.ConnectionId).Key;
                _riders.TryRemove(riderId, out _);
                foreach (var room in _roomUsers.Values)
                {
                    room.RemoveAll(user => user.connectionId == Context.ConnectionId);
                }
                await base.OnDisconnectedAsync(exception);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in OnDisconnectedAsync: {ex.Message}");
            }
        }

        // Add a rider to a specific group (room)
        public async Task JoinRoom(int orderId, string userType, int userId)
        {
            try
            {
                string roomName = $"OrderRoom_{orderId}";
                await Groups.AddToGroupAsync(Context.ConnectionId, roomName);

                if (!_roomUsers.ContainsKey(roomName))
                {
                    _roomUsers[roomName] = new List<(string connectionId, string userType, int orderId)>();
                }
                _roomUsers[roomName].Add((Context.ConnectionId, userType, orderId));
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in JoinRoom: {ex.Message}");
            }
        }
        public async Task JoinRiderRoom(int orderId, string userType, int userId)
        {
            try
            {
                string roomName = $"OrderRiderRoom_{orderId}";
                await Groups.AddToGroupAsync(Context.ConnectionId, roomName);

                if (!_roomUsers.ContainsKey(roomName))
                {
                    _roomUsers[roomName] = new List<(string connectionId, string userType, int orderId)>();
                }
                _roomUsers[roomName].Add((Context.ConnectionId, userType, orderId));
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in JoinRiderRoom: {ex.Message}");
            }
        }
        public List<(string connectionId, string userType, int orderId)> GetUsersInRiderRoom(int orderId)
        {
            try
            {
                string roomName = $"OrderRiderRoom_{orderId}";
                if (_roomUsers.ContainsKey(roomName))
                {
                    return _roomUsers[roomName];
                }
                else
                {
                    return new List<(string connectionId, string userType, int orderId)>();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in GetUsersInRiderRoom: {ex.Message}");
                return new List<(string connectionId, string userType, int orderId)>();
            }
        }

        // Remove a rider from a specific group
        public async Task RemoveRiderFromGroup(string groupId)
        {
            try
            {
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupId);

                if (_roomUsers.ContainsKey(groupId))
                {
                    _roomUsers[groupId].RemoveAll(user => user.connectionId == Context.ConnectionId);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in RemoveRiderFromGroup: {ex.Message}");
            }
        }

        // Send an order notification to a specific group
        public async Task SendOrderNotificationToGroup(int orderId, string message)
        {
            try
            {
                string groupId = $"OrderRiderRoom_{orderId}";
                await Clients.Group(groupId).SendAsync("ReceiveOrderNotification", message);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in SendOrderNotificationToGroup: {ex.Message}");
            }
        }

        // Notify all riders that an order has been accepted
        public async Task OrderAccepted(string orderId)
        {
            try
            {
                await Clients.All.SendAsync("OrderAccepted", orderId);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in OrderAccepted: {ex.Message}");
            }
        }

        // Subscribe to orders for a specific restaurant
        public async Task SubscribeToOrders(int restaurantId)
        {
            try
            {
                await Groups.AddToGroupAsync(Context.ConnectionId, restaurantId.ToString());
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in SubscribeToOrders: {ex.Message}");
            }
        }

        // Notify a specific restaurant about a new order
        public async Task NotifySpecificRestaurantForNewOrder(int orderId, int restaurantId)
        {
            try
            {
                string restaurantRoomName = $"OrderRoom_Restaurant_{restaurantId}";
                await Clients.Group(restaurantRoomName).SendAsync("NewOrderNotification", orderId);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in NotifySpecificRestaurantForNewOrder: {ex.Message}");
            }
        }

        // Get the list of users in a specific room
        public List<(string connectionId, string userType, int orderId)> GetUsersInRoom(int orderId)
        {
            try
            {
                string roomName = $"OrderRoom_{orderId}";
                if (_roomUsers.ContainsKey(roomName))
                {
                    return _roomUsers[roomName];
                }
                else
                {
                    return new List<(string connectionId, string userType, int orderId)>();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in GetUsersInRoom: {ex.Message}");
                return new List<(string connectionId, string userType, int orderId)>();
            }
        }
    }
}
