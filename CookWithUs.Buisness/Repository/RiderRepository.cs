using System.Data;
using Dapper;
using CookWithUs.Buisness.Models;
using ServcieBooking.Buisness.Infrastructure;
using Microsoft.AspNetCore.Hosting;
using CookWithUs.Buisness.Repository.Interface;
using System.Data.SqlClient;
using CookWithUs.Business.Common;
using CookWithUs.Buisness.Features.Resturant.Queries;

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

        public RiderListModel GetRiderDetailsById(int ID)
        {
            using IDbConnection db = _connectionFactory.GetConnection;

            var query = @"
        SELECT  [ID]
              ,[Name]
              ,[Age]
              ,[MobileNo]
              ,[Pincode]
              ,[Latitude]
              ,[Longitude]
              ,[RiderIsActive]
              ,[RiderLastWeekIncome]
              ,[RiderThisWeekIncome]
              ,[RiderOrderAssign]
              ,[IsDeleted]
            FROM [CookWithUs].[dbo].[DeliveryBoys]
            WHERE [ID] = @ID
    ";

            var parameters = new { ID = ID };
            var result = db.QuerySingleOrDefault<RiderListModel>(query, parameters);
            return result;
        }
        public RequestResult<bool> SetRiderStatus(SetOrderStatusModel details)
        {
            using IDbConnection db = _connectionFactory.GetConnection;

            var query = "UPDATE [CookWithUs].[dbo].[DeliveryBoys] SET [RiderIsActive] = @RiderIsActive WHERE [ID] = @ID";

            var parameters = new { 
                ID = details.OrderId,
                RiderIsActive = int.TryParse(details.Status, out int status) ? status : 0
            };
            int rowsAffected = db.Execute(query, parameters);
            if (rowsAffected > 0)
            {
                return new RequestResult<bool>(true);
            }
            else
            {
                return new RequestResult<bool>(false, new List<ValidationMessage> { new ValidationMessage { Reason = "Somthing went wrong", Severity = ValidationSeverity.Error } });
            }
        }

        public bool OrderDetail(OrderHistoryModel orderHistory)
        {
            using IDbConnection db = _connectionFactory.GetConnection;
            var query = @" INSERT INTO Orders (RiderId, OrderDateTime, Latitude, Longitude, OrderStatus)
            VALUES (@RiderId,  @OrderDateTime, @Latitude, @Longitude, @OrderStatus)";

            var parameters = new
            {
                RiderId = orderHistory.RiderId,
                //OrderDateTime = orderHistory.OrderDateTime,
                //Latitude = orderHistory.Latitude,
                //Longitude = orderHistory.Longitude,
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
        public FindOrderModel FindOrder(int Id)
        {
            using IDbConnection db = _connectionFactory.GetConnection;

            var query = @"SELECT TOP (1000) [ID],[RiderID],[OrderID],[Price],[OrderStatus] FROM [CookWithUs].[dbo].[RiderOrderDetails] WHERE [RiderID] = @ID";

            var parameters = new { ID = Id };
            var result = db.QuerySingleOrDefault<FindOrderModel>(query, parameters);
            return result;
        }
        public List<OrderHistoryModel> GetOrderDetailsById(int id)
        {
            using IDbConnection db = _connectionFactory.GetConnection;

            var query = @"
            SELECT 
            OD.OrderID,
            OD.UserID,
            OD.OrderDate,
            OD.DeliveryAddress,
            OD.PaymentMethod,
            OD.TotalAmount,
            OD.OrderStatus,
            OD.RiderId,
            OD.RestaurantId,
            OI.Id,
            OI.UserId,
            OI.OrderId,
            OI.Name,
            OI.ItemId,
            OI.Quantity,
            OI.RestaurantId,
            OI.Price,
            OI.DiscountedPrice,
            OI.Time,
            OI.RestaurantLocation,
            OI.RestaurantName,
            OI.VariantId
        FROM 
            CookWithUs.dbo.OrderDetails OD
        LEFT JOIN 
            CookWithUs.dbo.OrderItems OI 
        ON 
            OD.OrderID = OI.OrderId 
        WHERE 
            OD.OrderID = @id";

            var parameters = new {id= id };

            var orderDictionary = new Dictionary<int, OrderHistoryModel>();

            db.Query<OrderHistoryModel, CartModel, OrderHistoryModel>(query,
                (order, product) =>
                {
                    if (!orderDictionary.TryGetValue(order.OrderID, out var orderEntry))
                    {
                        orderEntry = order;
                        orderEntry.FoodList = new List<CartModel>();
                        orderDictionary.Add(order.OrderID, orderEntry);
                    }

                    orderEntry.FoodList.Add(product);
                    return orderEntry;
                },
                parameters,
                splitOn: "Id"
            );

            return orderDictionary.Values.ToList();
        }

    }
}
