using CookWithUs.Buisness.Models;
using Dapper;

using Microsoft.AspNetCore.Hosting;
using System.Data;
using CookWithUs.Buisness.Repository.Interface;
using ServcieBooking.Buisness.Infrastructure;
using CookWithUs.Buisness.Features.User;



namespace CookWithUs.Buisness.Repository
{
    public class UserRepository: IUserRepository
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly IConnectionFactory _connectionFactory;

        public UserRepository(IHostingEnvironment hostingEnvironment, IConnectionFactory connectionFactory)
        {
            _hostingEnvironment = hostingEnvironment;
            _connectionFactory = connectionFactory;
        }
        public bool AddressUpdate(AddressModel address)
        {
            using IDbConnection db = _connectionFactory.GetConnection;

            var query = @"
            INSERT INTO UserAddress (UserId,Address, LocationType, LandMark, Building)
            VALUES (@UserId, @Address, @LocationType, @LandMark, @Building)";

            var parameters = new
            {
                address.UserId,
                address.Address,
                address.LocationType,
                address.LandMark,
                address.Building
            };
             
        int rowsAffected = db.Execute(query, parameters);
            return rowsAffected > 0;
        }
        public bool UpdateAddress(AddressModel address)
        {
            using IDbConnection db = _connectionFactory.GetConnection;

            var query = @"UPDATE UserAddress SET UserId = @UserId, Address = @Address, LocationType = @LocationType, LandMark = @LandMark, Building = @Building WHERE Id = @Id";

            var parameters = new
            {
                address.Id,
                address.UserId,
                address.Address,
                address.LocationType,
                address.LandMark,
                address.Building
            };

            int rowsAffected = db.Execute(query, parameters);
            return rowsAffected > 0;
        }
        public bool AddToCart(CartModel details)
        {
            using IDbConnection db = _connectionFactory.GetConnection;

            var query = @"
            INSERT INTO UserCartTable (UserId,ItemId, Quantity, Time, RestaurantName,RestaurantLocation,RestaurantId,Price,Name,DiscountedPrice)
            VALUES (@UserId,@ItemId,@Quantity,@Time,@RestaurantName,@RestaurantLocation,@RestaurantId,@Price,@Name,@DiscountedPrice)";

            var parameters = new
            {
                details.UserId,
                details.ItemId,
                details.Quantity,
                details.Time,
                details.RestaurantName,
                details.RestaurantLocation,
                details.RestaurantId,
                details.Price,
                details.Name,
                details.DiscountedPrice
            };

            int rowsAffected = db.Execute(query, parameters);
            return rowsAffected > 0;
        }
        public List<AddressModel> FetchAddress(int UserId) {
            using IDbConnection db = _connectionFactory.GetConnection;

            string query = "SELECT * FROM UserAddress WHERE UserId = @UserId AND IsDeleted =0;";

            var parameters = new { UserId = UserId };

            return db.Query<AddressModel>(query, parameters).ToList();

            
        }
        public bool DeleteAddress(int AddressId) {
            using IDbConnection db = _connectionFactory.GetConnection;
            string query = "UPDATE UserAddress SET IsDeleted = 1 WHERE Id = @Id";
            int rowsAffected = db.Execute(query, new {  Id = AddressId });
            if (rowsAffected > 0)
            {

                return true;
            }
            else
            {
                return false;
            }
        }

        public bool CartUpdate(CartModel cart)
        {
            using IDbConnection db = _connectionFactory.GetConnection;


            string query = "UPDATE UserCartTable SET quantity = @Quantity WHERE Id = @Id";

            
            int rowsAffected = db.Execute(query, new { Quantity = cart.Quantity, Id = cart.Id });

            
            if (rowsAffected > 0)
            {
                
                return true;
            }
            else
            {
                return false;
            }
        }
        public List<CartModel> CartDetails(int UserId)
        {
            using IDbConnection db = _connectionFactory.GetConnection;

            string query = "SELECT * FROM UserCartTable WHERE UserId = @UserId AND Quantity > 0";
            var parameters = new { UserId = UserId };

            return db.Query<CartModel>(query, parameters).ToList();
        }

        public int OrderUpdate(OrderHistoryModel orderdetail)
        {
            using IDbConnection db = _connectionFactory.GetConnection;

            string insertQuery = @"
                INSERT INTO [OrderDetails] (UserID, OrderDate, DeliveryAddress, PaymentMethod, TotalAmount, OrderStatus, RiderId, RestaurantId)
                VALUES (@UserID, @OrderDate, @DeliveryAddress, @PaymentMethod, @TotalAmount, @OrderStatus, @RiderId, @RestaurantId);
                SELECT CAST(SCOPE_IDENTITY() AS int);"; // Get the last inserted ID

            // Execute the insert query and get the last inserted ID
            int generatedOrderId = db.QuerySingle<int>(insertQuery, orderdetail);
            foreach (var cartItem in orderdetail.FoodList)
            {  
                cartItem.OrderId = generatedOrderId;
                // Define the SQL insert query
                string query = @"
                INSERT INTO OrderItems (UserId, Name, ItemId,OrderId, Quantity, RestaurantId, Price, DiscountedPrice, Time, RestaurantLocation, RestaurantName)
                VALUES (@UserId, @Name, @ItemId,@OrderId, @Quantity, @RestaurantId, @Price, @DiscountedPrice, @Time, @RestaurantLocation, @RestaurantName);";

                int rowsAffected = db.Execute(query, cartItem);

            }
            return generatedOrderId;
           
        }

    }
}
