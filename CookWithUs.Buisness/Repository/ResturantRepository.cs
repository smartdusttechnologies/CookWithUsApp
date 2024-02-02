﻿using Dapper;
using System.Data;
using ServcieBooking.Buisness.Models;
using ServcieBooking.Buisness.Infrastructure;
using ServcieBooking.Buisness.Repository.Interface;
using ServiceBooking.Buisness.Repository.Interface;
using Microsoft.AspNetCore.Hosting;
using CookWithUs.Buisness.Models;
using CookWithUs.Business.Common;

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
                    string restaurantIDAttachedFilesInsertQuery = "INSERT INTO restaurantIDAttachedFile (RestaurantID, DocumentID) VALUES (@RestaurantID, @DocumentID)";
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
    }
}
