using CookWithUs.Buisness.Models;
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
        public List<AddressModel> FetchAddress(int UserId) ;
        public bool CartUpdate (CartModel cart) ;
        public List<CartModel> CartDetails(int  UserId) ;

    }
}
