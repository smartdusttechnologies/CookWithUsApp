namespace CookWithUs.Web.UI.Models
{
    public class OrderHistoryDTO
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
        public List<CartDto> FoodList { get; set; }


    }
}
