using Dapper;
using System.Data;
using ServcieBooking.Buisness.Models;
using ServcieBooking.Buisness.Infrastructure;
using ServcieBooking.Buisness.Repository.Interface;
using Newtonsoft.Json;
using ServiceBooking.Buisness.Repository.Interface;
using Microsoft.AspNetCore.Hosting;

namespace ServcieBooking.Buisness.Repository
{
    public class ResturantRepository : IResturantRepository
    {
        private readonly IHostingEnvironment _hostingEnvironment;

        public ResturantRepository(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }
        public object Get()
        {
            try
            {
                // Specify the path to the JSON file in wwwroot
                var filePath = Path.Combine(_hostingEnvironment.WebRootPath, "resturant.json");

                // Read the JSON file
                var jsonContent = System.IO.File.ReadAllText(filePath);

                // Deserialize JSON to C# object
                return JsonConvert.DeserializeObject<object>(jsonContent);

                // Use 'myObject' as needed
                //return myObject;
            }
            catch (Exception ex)
            {
                // Handle exceptions
                return "Error";
            }
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
