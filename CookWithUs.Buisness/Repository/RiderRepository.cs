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

        public RiderDetailsModel GetRiderDetailsById(int ID)
        {
            using IDbConnection db = _connectionFactory.GetConnection;

            var query = @"
            SELECT  *
            FROM [RiderDetails]
            WHERE [Id] = @ID
            ";

            var parameters = new { ID = ID };
            var result = db.QuerySingleOrDefault<RiderDetailsModel>(query, parameters);
            return result;
        }
        public RequestResult<bool> SetRiderStatus(SetOrderStatusModel details)
        {
            using IDbConnection db = _connectionFactory.GetConnection;

            var query = "UPDATE [DeliveryBoys] SET [RiderIsActive] = @RiderIsActive WHERE [ID] = @ID";

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
        public RequestResult<bool> SendRequestOfRider(SendOrderRequestModel allRiderDetails)
        {
            using IDbConnection db = _connectionFactory.GetConnection;

            // Construct the query with an IN clause
            var query = "UPDATE [DeliveryBoys] SET [RiderOrderAssign] = @OrderId WHERE [ID] IN @RiderIds";

            // Create the parameters object
            var parameters = new
            {
                OrderId = allRiderDetails.OrderId,
                RiderIds = allRiderDetails.RiderIds // Dapper supports passing a list for IN clauses
            };

            // Execute the query
            int rowsAffected = db.Execute(query, parameters);

            // Return the result
            if (rowsAffected > 0)
            {
                return new RequestResult<bool>(true);
            }
            else
            {
                return new RequestResult<bool>(false, new List<ValidationMessage>
        {
            new ValidationMessage { Reason = "Something went wrong", Severity = ValidationSeverity.Error }
        });
            }
        }


        public RequestResult<bool> AssignRider(FindOrderModel assignDetails)
        {
            using IDbConnection db = _connectionFactory.GetConnection;

            var query = "INSERT INTO [RiderOrderDetails] ([RiderID], [OrderID], [Price], [OrderStatus]) VALUES (@RiderID, @OrderID, @Price, @OrderStatus)";

            var parameters = new
            {
                RiderID = assignDetails.RiderID,
                OrderID = assignDetails.OrderID,
                Price = assignDetails.Price,
                OrderStatus = assignDetails.OrderStatus
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

        public RequestResult<bool> RiderStatus(FindOrderModel assignDetails)
        {
            using IDbConnection db = _connectionFactory.GetConnection;

            var query = "UPDATE [RiderOrderDetails] SET [OrderStatus] = @OrderStatus WHERE [ID] =@ID";

            var parameters = new
            {
                ID = assignDetails.ID,
                OrderStatus = assignDetails.OrderStatus
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
        public FindOrderModel FindOrder(int orderId)
        {
            using IDbConnection db = _connectionFactory.GetConnection;

            var query = @"SELECT TOP (1000) [ID],[RiderID],[OrderID],[Price],[OrderStatus] FROM [RiderOrderDetails] WHERE [RiderID] = @ID";

            var parameters = new { ID = orderId };
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
            OrderDetails OD
        LEFT JOIN 
            OrderItems OI 
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
        public RequestResult<bool> RiderSignup(RiderDetailsModel riderAllDetails, PasswordLogin passwordLogin)
        {
            using IDbConnection db = _connectionFactory.GetConnection;

            // Step 1: Insert into RiderDetails and retrieve the generated RiderId
            var insertRiderQuery = @"
    INSERT INTO [RiderDetails] (
        [Mobile],
        [Area],
        [VechicleType],
        [Shift],
        [FirstName],
        [LastName],
        [DoorNo],
        [Street],
        [City],
        [Pincode],
        [LandMark],
        [Gender],
        [BankName],
        [AccountNumber],
        [IfscCode],
        [PanCard],
        [DrivingLicenceFront],
        [DrivingLicenceBack],
        [Image],
        [isDeleted]
    ) VALUES (
        @Mobile,
        @Area,
        @VechicleType,
        @Shift,
        @FirstName,
        @LastName,
        @DoorNo,
        @Street,
        @City,
        @Pincode,
        @LandMark,
        @Gender,
        @BankName,
        @AccountNumber,
        @IfscCode,
        @PanCard,
        @DrivingLicenceFront,
        @DrivingLicenceBack,
        @Image,
        @isDeleted
    );
    SELECT CAST(SCOPE_IDENTITY() AS INT);";  // Retrieve the generated RiderId

            var parameters = new
            {
                Mobile = riderAllDetails.Mobile,
                Area = riderAllDetails.Area,
                VechicleType = riderAllDetails.VechicleType,
                Shift = riderAllDetails.Shift,
                FirstName = riderAllDetails.FirstName,
                LastName = riderAllDetails.LastName,
                DoorNo = riderAllDetails.DoorNo,
                Street = riderAllDetails.Street,
                City = riderAllDetails.City,
                Pincode = riderAllDetails.Pincode,
                LandMark = riderAllDetails.LandMark,
                Gender = riderAllDetails.Gender,
                BankName = riderAllDetails.BankName,
                AccountNumber = riderAllDetails.AccountNumber,
                IfscCode = riderAllDetails.IfscCode,
                PanCard = riderAllDetails.PanCard,
                DrivingLicenceFront = riderAllDetails.DrivingLicenceFront,
                DrivingLicenceBack = riderAllDetails.DrivingLicenceBack,
                Image = riderAllDetails.Image,
                isDeleted = riderAllDetails.IsDeleted
            };

            // Execute the insert query and get the generated RiderId
            var riderId = db.QuerySingle<int>(insertRiderQuery, parameters);

            // Step 2: Insert into PasswordLogin using the retrieved RiderId
            var insertPasswordQuery = @"
    INSERT INTO [PasswordLogin] (
        [PasswordHash],
        [PasswordSalt],
        [RiderId],
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
                return new RequestResult<bool>(false, new List<ValidationMessage> { new ValidationMessage { Reason = "Something went wrong with PasswordLogin insertion", Severity = ValidationSeverity.Error } });
            }
        }

        public RequestResult<bool> CheckMobileNumber(string mobileNumber)
        {
            using IDbConnection db = _connectionFactory.GetConnection;

            var query = @"SELECT COUNT(1) FROM [RiderDetails] WHERE [Mobile] = @riderMobile";

            var parameters = new
            {
                riderMobile = mobileNumber
            };

            int count = db.ExecuteScalar<int>(query, parameters);
            if (count > 0)
            {
                return new RequestResult<bool>(false, new List<ValidationMessage>
        {
            new ValidationMessage { Reason = "Mobile number already exists", Severity = ValidationSeverity.Error }
        });
            }
            else
            {
                return new RequestResult<bool>(true);
            }
        }
        public RequestResult<bool> DeleteAllOTP(string otpDetails)
        {
            try
            {
                using IDbConnection db = _connectionFactory.GetConnection;

                var query = @"DELETE FROM [ManageOTP] WHERE [Details] = @riderMobile";

                var parameters = new
                {
                    riderMobile = otpDetails
                };

                int rowsAffected = db.Execute(query, parameters);
                return new RequestResult<bool>(true);
            }
            catch (Exception ex)
            {
                // Log the exception if needed
                return new RequestResult<bool>(false, new List<ValidationMessage> { new ValidationMessage { Reason = ex.Message, Severity = ValidationSeverity.Error } });
            }
        }

        public RequestResult<bool> AddOTP(ManageOtpModel details)
        {
            using IDbConnection db = _connectionFactory.GetConnection;

            var query = @"INSERT INTO [ManageOTP] ([Type], [Details], [OTP], [DateTime], [Role]) VALUES (@Type, @Details, @OTP, @DateTime, @Role);";

            var parameters = new
            {
               Type =details.Type,
                Details=details.Details,
                OTP=details.OTP,
                DateTime=details.DateTime,
                Role=details.Role
            };

            int rowsAffected = db.Execute(query, parameters);
            if (rowsAffected > 0)
            {
                return new RequestResult<bool>(true);
            }
            else
            {
               return new RequestResult<bool>(false, new List<ValidationMessage> { new ValidationMessage { Reason = "Something went wrong", Severity = ValidationSeverity.Error } });
            }
        }
        public ManageOtpModel MatchOTP(string otpDetails)
        {
            using IDbConnection db = _connectionFactory.GetConnection;

            var query = @"SELECT * FROM [ManageOTP] WHERE [Details] = @riderMobile";

            var parameters = new
            {
                riderMobile = otpDetails
            };

            // QuerySingleOrDefault will return a single result or default (null) if no rows are found.
            ManageOtpModel otpModel = db.QuerySingleOrDefault<ManageOtpModel>(query, parameters);

            return otpModel;
        }
        public RiderDetailsModel GetRiderLoginDetailsByUserName(string username)
        {
            using IDbConnection db = _connectionFactory.GetConnection;

            var query = @"SELECT * FROM [RiderDetails] WHERE [Mobile] = @riderUserName";

            var parameters = new
            {
                riderUserName = username
            };

            // QuerySingleOrDefault will return a single result or default (null) if no rows are found.
            RiderDetailsModel rider = db.QuerySingleOrDefault<RiderDetailsModel>(query, parameters);

            return rider;
        }
        public PasswordLogin GetRiderPassworByUserId(int userId)
        {
            using IDbConnection db = _connectionFactory.GetConnection;

            var query = @"SELECT * FROM [PasswordLogin] WHERE [RiderId] = @riderUserId";

            var parameters = new
            {
                riderUserId = userId
            };

            // QuerySingleOrDefault will return a single result or default (null) if no rows are found.
            PasswordLogin password = db.QuerySingleOrDefault<PasswordLogin>(query, parameters);

            return password;
        }


    }
}
