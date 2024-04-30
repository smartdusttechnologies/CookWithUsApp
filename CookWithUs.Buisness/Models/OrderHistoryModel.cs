using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CookWithUs.Buisness.Models
{
    public class OrderHistoryModel
    {
        public int OrderID { get; set; }
        public int UserID { get; set; }
        public DateTime OrderDate { get; set; }
        public string DeliveryAddress { get; set; }
        public string PaymentMethod { get; set; }
        public decimal TotalAmount { get; set; }
        public string OrderStatus { get; set; }
        public int RiderId { get; set; }
        public int RestaurantId { get; set; }
        public List<CartModel> FoodList { get; set; }
    }
}
