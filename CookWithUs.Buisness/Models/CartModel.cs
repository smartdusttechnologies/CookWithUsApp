using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CookWithUs.Buisness.Models
{
    public class CartModel
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; }
        public int ItemId { get; set; }
        public int Quantity { get; set; }
        public int RestaurantId { get; set; }
        public float Price { get; set; }
        public float DiscountedPrice { get; set; }
        public DateTime Time { get; set; }

        public string RestaurantLocation { get; set; }
        public string RestaurantName { get; set; }
    }
}
