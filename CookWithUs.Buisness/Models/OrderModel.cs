using CookWithUs.Buisness.Features.Resturant.Queries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CookWithUs.Buisness.Models
{
    public class OrderModel
    {
        public int ID { get; set; }
        public int UserID { get; set; }
        public string Address { get; set; }
        public int ZipCode { get; set; }
        public int OrderPrice { get; set; }
        public string Phone { get; set; }
        public List<OrdersProduct> Products { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
    }
}
