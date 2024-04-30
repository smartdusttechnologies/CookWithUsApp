using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CookWithUs.Buisness.Models
{
    public class AddToCartModel
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ItemId { get; set; }
        public int Quantity { get; set; }
        public string Time { get; set; }
        public string ResturentName { get; set; }
        public string ResturentLocation { get; set; }
        public int ResturentId { get; set; }
        public int Price { get; set; }
        public string Name { get; set; }
        public int DiscountedPrice { get; set; }
    }
}
