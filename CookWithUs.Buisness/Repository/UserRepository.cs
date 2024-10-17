using CookWithUs.Buisness.Models;
using Dapper;

using Microsoft.AspNetCore.Hosting;
using System.Data;
using CookWithUs.Buisness.Repository.Interface;
using ServcieBooking.Buisness.Infrastructure;
using CookWithUs.Buisness.Features.User;
using CookWithUs.Business.Common;



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
            INSERT INTO UserCartTable (UserId,ItemId, Quantity, Time, RestaurantName,RestaurantLocation,RestaurantId,Price,Name,DiscountedPrice,VariantId)
            VALUES (@UserId,@ItemId,@Quantity,@Time,@RestaurantName,@RestaurantLocation,@RestaurantId,@Price,@Name,@DiscountedPrice,@variantId)";

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
                details.DiscountedPrice,
                details.variantID
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
                INSERT INTO OrderItems (UserId, Name, ItemId,OrderId, Quantity, RestaurantId, Price, DiscountedPrice, Time, RestaurantLocation, RestaurantName,VariantId)
                VALUES (@UserId, @Name, @ItemId,@OrderId, @Quantity, @RestaurantId, @Price, @DiscountedPrice, @Time, @RestaurantLocation, @RestaurantName,@VariantId);";

                int rowsAffected = db.Execute(query, cartItem);

            }
            return generatedOrderId;
           
        }
        public RequestResult<bool> CheckUserMobileNumber(string MobileNumber)
        {
            using IDbConnection db = _connectionFactory.GetConnection;
            string query = "SELECT COUNT(1) FROM Users WHERE UserName = @MobileNumber AND IsDeleted = 0";
            var parameters = new { MobileNumber = MobileNumber };

            int count = db.ExecuteScalar<int>(query, parameters);
            if (count > 0)
            {
                return new RequestResult<bool>(false);              
            }
            else
            {
                return new RequestResult<bool>(true);
            }
        }
        public RequestResult<bool> SignupUser(UserDetailsModel riderAllDetails, PasswordLogin passwordLogin)
        {
            try
            {
                using IDbConnection db = _connectionFactory.GetConnection;

                // Step 1: Insert into Users and retrieve the generated UserId
                var insertRiderQuery = @"
            INSERT INTO [Users] (
                [Name],
                [UserName],
                [isDeleted]
            ) VALUES (
                @Name,
                @UserName,
                @isDeleted
            );
            SELECT CAST(SCOPE_IDENTITY() AS INT);";  // Retrieve the generated UserId

                var parameters = new
                {
                    Name = riderAllDetails.Name,
                    UserName = riderAllDetails.UserName,
                    isDeleted = riderAllDetails.IsDeleted
                };

                // Execute the insert query and get the generated UserId
                var riderId = db.QuerySingle<int>(insertRiderQuery, parameters);

                // Step 2: Insert into UserPasswordLogin using the retrieved UserId
                var insertPasswordQuery = @"
            INSERT INTO [UserPasswordLogin] (
                [PasswordHash],
                [PasswordSalt],
                [UserId],
                [ChangeDate]
            ) VALUES (
                @PasswordHash,
                @PasswordSalt,
                @RiderId,
                @ChangeDate
            )";

                var passwordParameters = new
                {
                    PasswordHash = passwordLogin.PasswordHash,
                    PasswordSalt = passwordLogin.PasswordSalt,
                    RiderId = riderId,  // Use the retrieved RiderId here
                    ChangeDate = DateTime.Now
                };

                int passwordRowsAffected = db.Execute(insertPasswordQuery, passwordParameters);

                // Check if both operations were successful
                if (passwordRowsAffected > 0)
                {
                    return new RequestResult<bool>(true);
                }
                else
                {
                    return new RequestResult<bool>(false, new List<ValidationMessage>
            {
                new ValidationMessage
                {
                    Reason = "Something went wrong with PasswordLogin insertion",
                    Severity = ValidationSeverity.Error
                }
            });
                }
            }
            catch (Exception ex)
            {
                // Log the error (you can replace this with your logging logic)
                Console.WriteLine("Error occurred: " + ex.Message);

                return new RequestResult<bool>(false, new List<ValidationMessage>
        {
            new ValidationMessage

            {
                Reason = $"Exception: {ex.Message}",
                Severity = ValidationSeverity.Error
            }
        });
            }
        }
        public UserDetailsModel GetUserLoginDetailsByUserName(string username)
        {
            using IDbConnection db = _connectionFactory.GetConnection;

            var query = @"SELECT * FROM [Users] WHERE [UserName] = @usersUserName";

            var parameters = new
            {
                usersUserName = username
            };

            // QuerySingleOrDefault will return a single result or default (null) if no rows are found.
            UserDetailsModel user = db.QuerySingleOrDefault<UserDetailsModel>(query, parameters);

            return user;
        }
        public PasswordLogin GetUserPassworByUserId(int userId)
        {
            using IDbConnection db = _connectionFactory.GetConnection;

            var query = @"SELECT * FROM [UserPasswordLogin] WHERE [UserId] = @UsersUserId";

            var parameters = new
            {
                UsersUserId = userId
            };

            // QuerySingleOrDefault will return a single result or default (null) if no rows are found.
            PasswordLogin password = db.QuerySingleOrDefault<PasswordLogin>(query, parameters);

            return password;
        }



    }
}
