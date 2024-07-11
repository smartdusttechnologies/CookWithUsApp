using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CookWithUs.Buisness.Models
{
    public class FindOrderModel
    {
        public int ID { get; set; }
        public int OrderID { get; set; }
        public int RiderID {  get; set; }
        public int Price { get; set; }
        public string OrderStatus { get; set; }
    }
}
