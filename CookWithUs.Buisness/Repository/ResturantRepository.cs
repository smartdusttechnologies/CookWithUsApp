using Dapper;
using System.Data;
using ServcieBooking.Buisness.Models;
using ServcieBooking.Buisness.Infrastructure;
using ServcieBooking.Buisness.Repository.Interface;
using Newtonsoft.Json;
using ServiceBooking.Buisness.Repository.Interface;
using Microsoft.AspNetCore.Hosting;
using CookWithUs.Buisness.Models;

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
                SELECT ID, Name, Address, CONVERT(VARCHAR(5), OpeningTime, 108) AS OpeningTime
                FROM Restaurant";

            return db.Query<Restaurant>(query).ToList();

        }
        public object Get(string resturantId)
        {
            try
            {
                // Specify the path to the JSON file in wwwroot
                var filePath = Path.Combine(_hostingEnvironment.WebRootPath, "resturantDetails.json");

                // Read the JSON file
                var jsonContent = System.IO.File.ReadAllText(filePath);

                // Deserialize JSON to C# object
                var myObject = JsonConvert.DeserializeObject<object>(jsonContent);

                // Use 'myObject' as needed
                return myObject;
            }
            catch (Exception ex)
            {
                // Handle exceptions
                return "Error";
            }
        }
    }
}
