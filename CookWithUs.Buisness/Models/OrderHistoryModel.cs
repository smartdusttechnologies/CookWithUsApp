using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CookWithUs.Buisness.Models
{
    public class OrderHistoryModel
    {
        public int Id { get; set; }
        public int RiderId { get; set; }
        public int OrderPrice { get; set; }
        
        public DateTime OrderDateTime { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string OrderStatus { get; set; }
    }
}
