using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CookWithUs.Buisness.Features.Resturant.Queries
{
    public class OrdersProduct
    {
        public int OrderID { get; set; }
        public int ProductID { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string ImageUrl { get; set; }
        public int Price { get; set; }
        public int Quantity { get; set; }
    }
}
