using System.Data;
using Dapper;
using CookWithUs.Buisness.Models;
using ServcieBooking.Buisness.Infrastructure;
using Microsoft.AspNetCore.Hosting;
using CookWithUs.Buisness.Repository.Interface;
using System.Data.SqlClient;

namespace CookWithUs.Buisness.Repository
{
    public class RiderRepository : IRiderRepository
    {

        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly IConnectionFactory _connectionFactory;

        public RiderRepository(IHostingEnvironment hostingEnvironment, IConnectionFactory connectionFactory)
        {
            _hostingEnvironment = hostingEnvironment;
            _connectionFactory = connectionFactory;
        }
        public bool RiderRegister(RiderModel rider)
        {
            return true;
        }

        public List<RiderListModel> GetRiderList()
        {
            using IDbConnection db = _connectionFactory.GetConnection;

            var query = @" SELECT * FROM DeliveryBoys";

            return db.Query<RiderListModel>(query).ToList();
        }
        public bool OrderDetail(OrderHistoryModel orderHistory)
        {
            using IDbConnection db = _connectionFactory.GetConnection;
            var query = @" INSERT INTO Orders (RiderId, OrderDateTime, Latitude, Longitude, OrderStatus)
            VALUES (@RiderId,  @OrderDateTime, @Latitude, @Longitude, @OrderStatus)";

            var parameters = new
            {
                RiderId = orderHistory.RiderId,
                OrderDateTime = orderHistory.OrderDateTime,
                Latitude = orderHistory.Latitude,
                Longitude = orderHistory.Longitude,
                OrderStatus = orderHistory.OrderStatus
            };

            db.Execute(query, parameters);
            return true;

        }

        public List<RIderOrderModel> OrderListById(int Id)
        {
            using IDbConnection db = _connectionFactory.GetConnection;

            var query = @"  SELECT *  FROM Orders WHERE RiderId = @Id";

            return db.Query<RIderOrderModel>(query, new { Id }).ToList();

        }

        public bool OrderUpdate(int orderDetailId)
        {
            using IDbConnection db = _connectionFactory.GetConnection;
            var query = @"UPDATE Orders SET OrderStatus = 'Delivered' WHERE Id = @Id";
            int affectedRows = db.Execute(query, new { Id = orderDetailId });

            return affectedRows > 0;


        }
    }
}
