using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CookWithUs.Buisness.Models
{
    public class RIderOrderModel
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string OrderName { get; set; }
        public int OrderPrice { get; set; }
        public DateTime OrderDateTime { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string OrderStatus { get; set; }
    }
}
