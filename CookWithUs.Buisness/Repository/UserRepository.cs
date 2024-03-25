using CookWithUs.Buisness.Models;
using Dapper;

using Microsoft.AspNetCore.Hosting;
using System.Data;
using CookWithUs.Buisness.Repository.Interface;
using ServcieBooking.Buisness.Infrastructure;



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
            INSERT INTO UserDetails (UserId,Name, Country, StreetAddress, StreetAddress2, City, State, Pincode, MobileNo)
            VALUES (@Name, @Country, @StreetAddress, @StreetAddress2, @City, @State, @Pincode, @MobileNo)";

            var parameters = new
            {
                address.UserId,
                address.name,
                address.country,
                address.streetAddress,
                address.streetAddress2,
                address.city,
                address.state,
                address.pincode,
                address.mobileNo
            };

            int rowsAffected = db.Execute(query, parameters);
            return rowsAffected > 0;
        }
        public List<AddressModel> FetchAddress(int UserId) {
            using IDbConnection db = _connectionFactory.GetConnection;

            string query = "SELECT * FROM Addresses WHERE UserId = @UserId";

            var parameters = new { UserId = UserId };

            return db.Query<AddressModel>(query, parameters).ToList();

            
        }
    }
}
