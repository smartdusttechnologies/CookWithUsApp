namespace CookWithUs.Web.UI.Models
{
    public class CartDto
    {
     
        public int Id { get; set; }
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
