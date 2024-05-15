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
using System.Data.SqlClient;
using System.Data.Common;
using System.Diagnostics.Metrics;

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
                SELECT R.ID, R.Name, R.Address, R.Latitude, R.Longitude,R.isActive, R.CookingTime, CONVERT(VARCHAR(5), R.OpeningTime, 108) AS OpeningTime,
                       M.ID, M.Name, M.Type, M.Price, M.Quantity,M.rating,M.customer,M.info, D.DocUrl AS ImageUrl
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
            //string imageInsertQuery = @"
            //       INSERT INTO [Document] (DocUrl)
            //       VALUES (@ImageUrl);
            //       SELECT CAST(SCOPE_IDENTITY() AS INT)";

            //var parameters = new
            //{
            //    menu.ImageUrl
            //};

            //int imageId = db.QuerySingle<int>(imageInsertQuery , parameters);

                string menuInsertQuery = @"
                INSERT INTO [Menu] (RestaurantID, Name, Type, Price, Quantity, ImageID, info, CategoryID, InStock, PackingPrice, GstPrice)
                VALUES (@RestaurantID, @Name, @Type, @Price, @Quantity, @ImageID, @Info, @CategoryID, @InStock, @PackingPrice, @GstPrice)";

            var menuParameters = new
            {
                RestaurantID = menu.RestaurantID,
                Name = menu.Name,
                Type = menu.Type,
                Price = menu.Price,
                Quantity = menu.Quantity,
                ImageID = menu.ImageUrl,
                Info = menu.Info,
                CategoryID = menu.CategoryID,
                InStock = menu.InStock,
                PackingPrice = menu.PackingPrice,
                GstPrice = menu.GstPrice
            };

            int result = db.Execute(menuInsertQuery, menuParameters);
            string getLastInsertIdQuery = "SELECT MAX(Id) FROM [Menu];";
            int newMenuId = db.QuerySingle<int>(getLastInsertIdQuery);
            if (result > 0)
            {
                
                string variantOptionInsertQuery = @"
                INSERT INTO [VariantOption] (VariantName, OptionName, OptionType, OptionPrice, IsDeleted, MenuId)
                VALUES (@VariantName, @OptionName, @OptionType, @OptionPrice, @IsDeleted, @MenuId)
                ";
                foreach (var variantOption in menu.Variants)
                {
                    var variantOptionParameters = new
                    {
                        VariantName = variantOption.VariantName,
                        OptionName = variantOption.OptionName,
                        OptionType = variantOption.OptionType,
                        OptionPrice = variantOption.OptionPrice,
                        IsDeleted = 0,
                        MenuId = newMenuId
                    };

                    int variantResult = db.Execute(variantOptionInsertQuery, variantOptionParameters);
                }

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
            using IDbConnection db = _connectionFactory.GetConnection;
            string menuInsertQuery = @"UPDATE [Menu]
        SET RestaurantID = @RestaurantID,
            Name = @Name,
            Type = @Type,
            Price = @Price,
            Quantity = @Quantity,
            ImageID = @ImageID,
            info = @Info,
            CategoryID = @CategoryID,
            InStock = @InStock,
            PackingPrice = @PackingPrice,
            GstPrice = @GstPrice
        WHERE ID = @ID;";

            var menuParameters = new
            {
                RestaurantID = menu.RestaurantID,
                Name = menu.Name,
                Type = menu.Type,
                Price = menu.Price,
                Quantity = menu.Quantity,
                ImageID = menu.ImageUrl,
                Info = menu.Info,
                CategoryID = menu.CategoryID,
                InStock = menu.InStock,
                PackingPrice = menu.PackingPrice,
                GstPrice = menu.GstPrice,
                ID = menu.ID
            };

            int result = db.Execute(menuInsertQuery, menuParameters);

            if (result > 0)
            {
                int newMenuId = menu.ID; // Set newMenuId after successful update
                string selectQuery = @"SELECT COUNT(*) FROM [VariantOption] WHERE MenuId = @MenuId";
                int count = db.ExecuteScalar<int>(selectQuery, new { MenuId = newMenuId });

                if (count > 0)
                {
                    string deleteOlderVariantQuery = @"DELETE FROM [VariantOption] WHERE MenuId = @MenuId";
                    var deletedParameter = new
                    {
                        MenuId = newMenuId
                    };
                    int deletedResult = db.Execute(deleteOlderVariantQuery, deletedParameter);
                }

                //string deleteOlderVariantQuery = @"DELETE FROM [VariantOption] WHERE MenuId = @MenuId";
                //var deletedParameter = new
                //{
                //    MenuId = newMenuId
                //};
                //int deletedResult = db.Execute(deleteOlderVariantQuery, deletedParameter);


                string variantOptionInsertQuery = @"INSERT INTO [VariantOption] (VariantName, OptionName, OptionType, OptionPrice, IsDeleted, MenuId)
                VALUES (@VariantName, @OptionName, @OptionType, @OptionPrice, @IsDeleted, @MenuId)";

                    foreach (var variantOption in menu.Variants)
                    {
                        var variantOptionParameters = new
                        {
                            VariantName = variantOption.VariantName,
                            OptionName = variantOption.OptionName,
                            OptionType = variantOption.OptionType,
                            OptionPrice = variantOption.OptionPrice,
                            IsDeleted = 0,
                            MenuId = newMenuId
                        };

                        int variantResult = db.Execute(variantOptionInsertQuery, variantOptionParameters);
                    }

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


        public List<RestaurantMenu> GetMenuItemByCategoryID(int categoryId)
        {
            using IDbConnection db = _connectionFactory.GetConnection;

            var query = @"SELECT 
		   M.[ID]
          ,M.[RestaurantID]
          ,M.[Name]
          ,M.[Type]
          ,M.[Price]
          ,M.[Quantity]
          ,M.[ImageID]
          ,M.[rating]
          ,M.[customer]
          ,M.[info]
          ,M.[CategoryID]
          ,M.[InStock]
          ,M.[NextStockTime]
          ,M.[PackingPrice]
          ,M.[GstPrice]
          ,M.[ItemCookingTime]
          ,M.[IsDeleted]
            ,V.[Id] as VariantID
          ,V.[VariantName] 
          ,V.[OptionName] 
          ,V.[OptionType] 
          ,V.[OptionPrice] 
          ,V.[IsDeleted]
          ,V.[MenuId]
          
          FROM [CookWithUs].[dbo].[Menu] M
          LEFT JOIN [CookWithUs].[dbo].[VariantOption]V ON M.ID =V.MenuId 
          WHERE M.IsDeleted = 0 AND M.CategoryID = @CategoryId";

            var statesDictionary = new Dictionary<int, RestaurantMenu>();
            db.Query<RestaurantMenu, VariantOption, RestaurantMenu>(
                query,
                (restaurantMenu, variantOption) =>
                {
                    if (!statesDictionary.TryGetValue(restaurantMenu.ID, out var stateEntry))
                    {
                        stateEntry = restaurantMenu;
                        stateEntry.Variants = new List<VariantOption>();
                        statesDictionary.Add(stateEntry.ID, stateEntry);
                    }
                    stateEntry.Variants.Add(variantOption);
                    return stateEntry;
                },
                new { CategoryId = categoryId },
        splitOn: "VariantID"
    );

            return statesDictionary.Values.ToList();
        }


        public RequestResult<bool> DeleteMenu(int menuId)
        {
            using IDbConnection db = _connectionFactory.GetConnection;
            string query = @"UPDATE [Menu] SET IsDeleted = 1  where ID=@ID";

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
        public RequestResult<bool> AddMenuCategory(MenuCategory menuCategory)
        {
            using IDbConnection db = _connectionFactory.GetConnection;

            string menuCategoryInsertQuery = @"
    INSERT INTO [MenuCategory] (RestaurantId, CategoryName, InStock, NextStockTime)
    VALUES (@RestaurantId, @CategoryName, @InStock, @NextStockTime)";

            var menuCategoryParameters = new
            {
                RestaurantId = menuCategory.RestaurantId,
                CategoryName = menuCategory.CategoryName,
                InStock = menuCategory.InStock,
                NextStockTime = menuCategory.NextStockTime,
            };

            int result = db.Execute(menuCategoryInsertQuery, menuCategoryParameters);
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
        public RequestResult<bool> UpdateMenuCategory(MenuCategory menuCategory) {
            using IDbConnection db = _connectionFactory.GetConnection;

            string menuCategoryInsertQuery = @"
    UPDATE [MenuCategory] SET  CategoryName
    = @CategoryName WHERE Id = @Id";

            var menuCategoryParameters = new
            {
                Id = menuCategory.ID,
                CategoryName = menuCategory.CategoryName
            };

            int result = db.Execute(menuCategoryInsertQuery, menuCategoryParameters);
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
                SELECT O.ID, O.UserID, O.Address, O.Phone, O.OrderPrice, O.ZipCode,, O.OrderStatus,
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
                SELECT O.ID, O.UserID, O.Address, O.Phone, O.OrderPrice, O.ZipCode, O.OrderStatus,
                       OP.ProductID, OP.Quantity, M.Name, M.Type, M.Price, D.DocUrl AS ImageUrl
                FROM Orders O
                INNER JOIN OrdersProduct OP ON O.ID = OP.OrderID
                INNER JOIN Menu M ON M.ID = OP.ProductID
                LEFT JOIN Document D ON D.ID = M.ImageID
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
        public List<OrderModel> getOrderByRestaurantID(int restaurantId)
        {
            using IDbConnection db = _connectionFactory.GetConnection;

            var query = @"
                
           SELECT 
	       OD. [OrderID] AS ID
          ,OD.[UserID]
          ,OD.[OrderDate]
          ,OD.[DeliveryAddress] AS Address
          ,OD.[PaymentMethod]
          ,OD.[TotalAmount] as OrderPrice
          ,OD.[OrderStatus]
           ,OI.[Id]
          ,OI.[UserId]
          ,OI.[OrderId]
          ,OI.[Name]
          ,OI.[ItemId]
          ,OI.[Quantity]
          ,OI.[RestaurantId]
          ,OI.[Price]
          ,OI.[DiscountedPrice]
          ,OI.[Time]
          
          FROM [CookWithUs].[dbo].[OrderDetails] OD
          LEFT JOIN [CookWithUs].[dbo].[OrderItems] OI ON OD.OrderID =OI.OrderId
          WHERE  OD.RestaurantId = @restaurantId";

            var parameters = new { restaurantId };

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
                splitOn: "Id"
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
        public List<MenuCategory> FetchAllMenuCategory(int resturantId)
        {
            using IDbConnection db = _connectionFactory.GetConnection;

            var query = @"SELECT TOP (1000) 
      [CategoryName]
      ,[InStock]
      ,[NextStockTime]
      ,[IsDeleted]
      ,[Id]
  FROM [CookWithUs].[dbo].[MenuCategory] WHERE [RestaurantId] = @resturantId AND [IsDeleted] = 0";

            var parameters = new { resturantId };

            var menuCategories = db.Query<MenuCategory>(query, parameters).ToList();

            return menuCategories;
        }
    }
}
