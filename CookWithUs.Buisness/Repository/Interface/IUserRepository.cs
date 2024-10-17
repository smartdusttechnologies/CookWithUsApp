using CookWithUs.Buisness.Models;
using CookWithUs.Business.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CookWithUs.Buisness.Repository.Interface
{
    public interface IUserRepository
    {

       public  bool AddressUpdate(AddressModel address) ;
        public bool UpdateAddress(AddressModel address) ;
        public bool AddToCart(CartModel details);
        public List<AddressModel> FetchAddress(int UserId) ;
        public bool DeleteAddress(int AddressId);
        public bool CartUpdate (CartModel cart) ;
        public List<CartModel> CartDetails(int  UserId) ;

        public int OrderUpdate(OrderHistoryModel orderDetail);
        public RequestResult<bool> SignupUser(UserDetailsModel riderAllDetails, PasswordLogin passwordLogin);
        public RequestResult<bool> CheckUserMobileNumber(string MobileNumber);
        public UserDetailsModel GetUserLoginDetailsByUserName(string username);
        public PasswordLogin GetUserPassworByUserId(int userId);
    }
}
