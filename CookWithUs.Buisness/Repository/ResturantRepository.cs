using Dapper;
using System.Data;
using ServcieBooking.Buisness.Models;
using ServcieBooking.Buisness.Infrastructure;
using ServcieBooking.Buisness.Repository.Interface;
using ServiceBooking.Buisness.Repository.Interface;
using Microsoft.AspNetCore.Hosting;
using CookWithUs.Buisness.Models;
using CookWithUs.Business.Common;
using System.Transactions;
using CookWithUs.Buisness.Features.Resturant.Queries;

namespace ServcieBooking.Buisness.Repository
{
    public class ResturantRepository : IResturantRepository
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly IConnectionFactory _connectionFactory;

        public ResturantRepository(IHostingEnvironment hostingEnvironment, IConnectionFactory connectionFactory)
        {
            _hostingEnvironment = hostingEnvironment;
            _connectionFactory = connectionFactory;
        }
        public List<Restaurant> Get()
        {
            using IDbConnection db = _connectionFactory.GetConnection;

            var query = @"
                SELECT R.ID, R.Name, R.Address, R.Latitude, R.Longitude, CONVERT(VARCHAR(5), R.OpeningTime, 108) AS OpeningTime, D.DocUrl AS ImageUrl
                FROM Restaurant R
                LEFT JOIN Document D ON R.ImageID = D.ID";

            return db.Query<Restaurant>(query).ToList();

        }
        public RestaurantDetails Get(int restaurantId)
        {
            using IDbConnection db = _connectionFactory.GetConnection;

            var query = @"
                SELECT R.ID, R.Name, R.Address, R.Latitude, R.Longitude, CONVERT(VARCHAR(5), R.OpeningTime, 108) AS OpeningTime,
                       M.ID, M.Name, M.Type, M.Price, M.Quantity, D.DocUrl AS ImageUrl
                FROM Restaurant R
                LEFT JOIN Menu M ON R.ID = M.RestaurantID
                LEFT JOIN Document D ON M.ImageID = D.ID
                WHERE R.ID = @restaurantId";

            var parameters = new { restaurantId };

            var restaurantDetailsDictionary = new Dictionary<int, RestaurantDetails>();
            var result = db.Query<RestaurantDetails, RestaurantMenu, RestaurantDetails>(
                query,
                (restaurant, menu) =>
                {
                    if (!restaurantDetailsDictionary.TryGetValue(restaurant.ID, out var restaurantEntry))
                    {
                        restaurantEntry = restaurant;
                        restaurantEntry.restaurantMenus = new List<RestaurantMenu>();
                        restaurantDetailsDictionary.Add(restaurantEntry.ID, restaurantEntry);
                    }

                    if (menu != null)
                    {
                        restaurantEntry.restaurantMenus.Add(menu);
                    }

                    return restaurantEntry;
                },
                parameters,
                splitOn: "ID"
            );

            return result.FirstOrDefault();
        }

        public RestaurantDetails GetByUserID(int userId)
        {
            using IDbConnection db = _connectionFactory.GetConnection;

            var query = @"
                SELECT R.ID, R.Name, R.Address, R.Latitude, R.Longitude, CONVERT(VARCHAR(5), R.OpeningTime, 108) AS OpeningTime,
                       M.ID, M.Name, M.Type, M.Price, M.Quantity, D.DocUrl AS ImageUrl
                FROM Restaurant R
                LEFT JOIN Menu M ON R.ID = M.RestaurantID
                LEFT JOIN Document D ON M.ImageID = D.ID
                LEFT JOIN RestaurantPartner RP ON R.ID = RP.RestaurantID
                WHERE RP.UserID = @userId";

            var parameters = new { userId };

            var restaurantDetailsDictionary = new Dictionary<int, RestaurantDetails>();
            var result = db.Query<RestaurantDetails, RestaurantMenu, RestaurantDetails>(
                query,
                (restaurant, menu) =>
                {
                    if (!restaurantDetailsDictionary.TryGetValue(restaurant.ID, out var restaurantEntry))
                    {
                        restaurantEntry = restaurant;
                        restaurantEntry.restaurantMenus = new List<RestaurantMenu>();
                        restaurantDetailsDictionary.Add(restaurantEntry.ID, restaurantEntry);
                    }

                    if (menu != null)
                    {
                        restaurantEntry.restaurantMenus.Add(menu);
                    }

                    return restaurantEntry;
                },
                parameters,
                splitOn: "ID"
            );

            return result.FirstOrDefault();

        }
        public RequestResult<bool> RegisterRestaurant(RegisterRestaurantModel restaurantDetails)
        {
            using IDbConnection db = _connectionFactory.GetConnection;
            string query = @"
                   INSERT INTO [Restaurant] (Name, Address)
                   VALUES (@Name, @Address);
                   SELECT CAST(SCOPE_IDENTITY() AS INT)";

            var parameters = new
            {
                restaurantDetails.Name,
                restaurantDetails.Address
            };

            // Prepare the parameters for restaurantIDAttachedFiles
            List<RestaurantAttachment> restaurantIDAttachedFilesParameters = null;
            if (restaurantDetails.AttachedFileIDs != null && restaurantDetails.AttachedFileIDs.Any())
            {
                restaurantIDAttachedFilesParameters = restaurantDetails.AttachedFileIDs.Select(DocumentID => new RestaurantAttachment { RestaurantID = 0, DocumentID = DocumentID }).ToList();
            }
            // Transaction to ensure both inserts are executed atomically
            using var transaction = db.BeginTransaction();

            try
            {
                // Insert into the restaurantID table and get the newly inserted RestaurantID
                int restaurantID = db.QuerySingle<int>(query, parameters, transaction);

                if (restaurantIDAttachedFilesParameters != null && restaurantIDAttachedFilesParameters.Any())
                {
                    // Set the restaurantIDID for all attached files
                    restaurantIDAttachedFilesParameters.ForEach(f => f.RestaurantID = restaurantID);

                    // Insert all attached files into the restaurantIDAttachedFiles table in a single batch
                    string restaurantIDAttachedFilesInsertQuery = "INSERT INTO RestaurantAttachment (RestaurantID, DocumentID) VALUES (@RestaurantID, @DocumentID)";
                    db.Execute(restaurantIDAttachedFilesInsertQuery, restaurantIDAttachedFilesParameters, transaction);
                }

                // If all inserts are successful, commit the transaction
                transaction.Commit();
                return new RequestResult<bool>(true);
            }
            catch (Exception ex)
            {
                // If any insert fails, roll back the transaction and return an error
                transaction.Rollback();
                return new RequestResult<bool>(false, new List<ValidationMessage> { new ValidationMessage { Reason = ex.Message, Severity = ValidationSeverity.Error } });
            }
        }

        public RequestResult<bool> CreateMenu(RestaurantMenu menu)
        {
            using IDbConnection db = _connectionFactory.GetConnection;
            string imageInsertQuery = @"
                   INSERT INTO [Document] (DocUrl)
                   VALUES (@ImageUrl);
                   SELECT CAST(SCOPE_IDENTITY() AS INT)";

            var parameters = new
            {
                menu.ImageUrl
            };

            int imageId = db.QuerySingle<int>(imageInsertQuery , parameters);

            string menuInsertQuery = @"
                   INSERT INTO [Menu] (RestaurantID,Name,Type,Price,Quantity,ImageID)
                   VALUES (@RestaurantID, @Name, @Type, @Price, @Quantity, @imageID)";
            var menuParameters = new
            {
                menu.RestaurantID,
                menu.Name,
                menu.Type,
                menu.Price,
                menu.Quantity,
                imageId
            };
            
            int result = db.Execute(menuInsertQuery, menuParameters);
            if (result > 0)
            {
                return new RequestResult<bool>(true);
            }
            else
            {
                List<ValidationMessage> validationMessages = new List<ValidationMessage>()
                {
                    new ValidationMessage() { Reason = "Unable To take Your Request Right Now.", Severity = ValidationSeverity.Error }
                };
                return new RequestResult<bool>(false, validationMessages);
            }
        }
        public RequestResult<bool> UpdateMenu(RestaurantMenu menu)
        {
            using (IDbConnection db = _connectionFactory.GetConnection)
            {
                using (var transaction = db.BeginTransaction())
                {
                    try
                    {
                        string updateQuery = @"
                               UPDATE [Menu] SET
                                   Name = @Name,
                                   Type = @Type,
                                   Price = @Price,
                                   Quantity = @Quantity
                               WHERE
                                   ID = @ID;";

                        string docQuery = @"UPDATE [Document]
                               SET
                                   [DocUrl] = @ImageUrl
                               WHERE
                                   ID = (SELECT ImageID FROM [Menu] WHERE ID = @ID);";

                        var docParameters = new
                        {
                            menu.ID,
                            menu.ImageUrl
                        };
                        var parameters = new
                        {
                            menu.Name,
                            menu.Type,
                            menu.Price,
                            menu.Quantity,
                            menu.ID,
                        };

                        int menuUpdateResult = db.Execute(updateQuery, parameters, transaction);
                        int docUpdateResult = db.Execute(docQuery, docParameters, transaction);

                        if (menuUpdateResult > 0 && docUpdateResult > 0)
                        {
                            transaction.Commit();
                            return new RequestResult<bool>(true);
                        }
                        else
                        {
                            transaction.Rollback();
                            List<ValidationMessage> validationMessages = new List<ValidationMessage>()
                            {
                                new ValidationMessage() { Reason = "Unable to update records.", Severity = ValidationSeverity.Error }
                            };
                            return new RequestResult<bool>(false, validationMessages);
                        }
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                        // Handle exception, log it, etc.
                        List<ValidationMessage> validationMessages = new List<ValidationMessage>()
                        {
                            new ValidationMessage() { Reason = "An error occurred during the update.", Severity = ValidationSeverity.Error }
                        };
                        return new RequestResult<bool>(false, validationMessages);
                    }
                }
            }
        }

        public RequestResult<bool> DeleteMenu(int menuId)
        {
            using IDbConnection db = _connectionFactory.GetConnection;
            string query = @"delete from [Menu] where ID=@ID";

            int result = db.Execute(query, new { ID = menuId });

            if (result > 0)
            {
                return new RequestResult<bool>(true);
            }
            else
            {
                List<ValidationMessage> validationMessages = new List<ValidationMessage>()
                {
                    new ValidationMessage() { Reason = "Unable To take Your Request Right Now.", Severity = ValidationSeverity.Error }
                };
                return new RequestResult<bool>(false, validationMessages);
            }
        }
        public RequestResult<bool> PlaceOrder(OrderModel order)
        {
            using IDbConnection db = _connectionFactory.GetConnection;
            string query = @"
                   INSERT INTO [Orders] (UserID, Address, ZipCode, OrderPrice, Phone)
                   VALUES (@UserID, @Address, @ZipCode, @OrderPrice, @Phone);
                   SELECT CAST(SCOPE_IDENTITY() AS INT)";

            var parameters = new
            {
                order.UserID,
                order.Address,
                order.ZipCode,
                order.OrderPrice,
                order.Phone,
            };

            // Prepare the parameters for OrdersProduct
            List<OrdersProduct> ordersProducts = null;
            if (order.Products != null && order.Products.Any())
            {
                ordersProducts = order.Products.Select(product => new OrdersProduct { OrderID = 0, ProductID = product.ProductID, Quantity = product.Quantity}).ToList();
            }
            // Transaction to ensure both inserts are executed atomically
            using var transaction = db.BeginTransaction();

            try
            {
                // Insert into the Order table and get the newly inserted orderID
                int orderID = db.QuerySingle<int>(query, parameters, transaction);

                if (ordersProducts != null && ordersProducts.Any())
                {
                    // Set the restaurantIDID for all attached files
                    ordersProducts.ForEach(f => f.OrderID = orderID);

                    // Insert all attached files into the restaurantIDAttachedFiles table in a single batch
                    string OrdersProductInsertQuery = "INSERT INTO OrdersProduct (OrderID, ProductID, Quantity) VALUES (@OrderID, @ProductID, @Quantity)";
                    db.Execute(OrdersProductInsertQuery, ordersProducts, transaction);
                }

                // If all inserts are successful, commit the transaction
                transaction.Commit();
                return new RequestResult<bool>(true);
            }
            catch (Exception ex)
            {
                // If any insert fails, roll back the transaction and return an error
                transaction.Rollback();
                return new RequestResult<bool>(false, new List<ValidationMessage> { new ValidationMessage { Reason = ex.Message, Severity = ValidationSeverity.Error } });
            }
        }
        public List<OrderModel> GetOrders()
        {
            using IDbConnection db = _connectionFactory.GetConnection;

            var query = @"
                SELECT O.ID, O.UserID, O.Address, O.Phone, O.OrderPrice, O.ZipCode,
                       OP.ProductID, OP.Quantity
                FROM Orders O
                INNER JOIN OrdersProduct OP ON O.ID = OP.OrderID";

            var orderDictionary = new Dictionary<int, OrderModel>();

            db.Query<OrderModel, OrdersProduct, OrderModel>(query,
                (order, product) =>
                {
                    if (!orderDictionary.TryGetValue(order.ID, out var orderEntry))
                    {
                        orderEntry = order;
                        orderEntry.Products = new List<OrdersProduct>();
                        orderDictionary.Add(order.ID, orderEntry);
                    }

                    orderEntry.Products.Add(product);
                    return orderEntry;
                },
                splitOn: "ProductID"
            );

            return orderDictionary.Values.ToList();
        }
        public List<OrderModel> GetOrdersByUserID(int userId)
        {
            using IDbConnection db = _connectionFactory.GetConnection;

            var query = @"
                SELECT O.ID, O.UserID, O.Address, O.Phone, O.OrderPrice, O.ZipCode,
                       OP.ProductID, OP.Quantity, M.Name, M.Type, M.Price
                FROM Orders O
                INNER JOIN OrdersProduct OP ON O.ID = OP.OrderID
                INNER JOIN Menu M ON M.ID = OP.ProductID
                WHERE O.UserID = @userId";

            var parameters = new { userId };

            var orderDictionary = new Dictionary<int, OrderModel>();

            db.Query<OrderModel, OrdersProduct, OrderModel>(query,
                (order, product) =>
                {
                    if (!orderDictionary.TryGetValue(order.ID, out var orderEntry))
                    {
                        orderEntry = order;
                        orderEntry.Products = new List<OrdersProduct>();
                        orderDictionary.Add(order.ID, orderEntry);
                    }

                    orderEntry.Products.Add(product);
                    return orderEntry;
                },
                parameters,
                splitOn: "ProductID"
            );

            return orderDictionary.Values.ToList();
        }
        public OrderModel GetOrderDetails(int orderId)
        {
            using IDbConnection db = _connectionFactory.GetConnection;

            var query = @"
                SELECT O.ID, O.UserID, O.Address, O.Phone, O.OrderPrice, O.ZipCode, O.Latitude, O.Longitude
                FROM Orders O
                WHERE O.ID = @orderId";

            var parameters = new { orderId };

            return db.QueryFirstOrDefault<OrderModel>(query, parameters);

        }
    }
}
