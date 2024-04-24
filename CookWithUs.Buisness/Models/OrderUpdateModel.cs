using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CookWithUs.Buisness.Models
{
    public class OrderUpdateModel
    {
        public List<CartModel> FoodList { get; set; }
        public AddressModel Address { get; set; }
    }
}
