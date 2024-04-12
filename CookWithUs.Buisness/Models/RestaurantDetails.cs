using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CookWithUs.Buisness.Models
{
    public class RestaurantDetails
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public DateTime OpeningTime { get; set; }
        public string CookingTime { get; set; }
        public List<RestaurantMenu> restaurantMenus { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
    }
}
