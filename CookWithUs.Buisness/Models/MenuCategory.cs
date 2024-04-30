using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CookWithUs.Buisness.Models
{
    public class MenuCategory
    {
        public int ID { get; set; }
        public string CategoryName { get; set; }
        public int RestaurantId { get; set; }
        public int InStock { get; set; }
        public string NextStockTime { get; set; }
    }
}
