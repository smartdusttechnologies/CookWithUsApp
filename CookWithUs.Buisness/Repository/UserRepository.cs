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
        public List<AddressModel> FetchAddress(int UserId) {
            using IDbConnection db = _connectionFactory.GetConnection;

            string query = "SELECT * FROM UserAddress WHERE UserId = @UserId";

            var parameters = new { UserId = UserId };

            return db.Query<AddressModel>(query, parameters).ToList();

            
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

    }
}
