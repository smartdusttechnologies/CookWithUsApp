namespace CookWithUs.Web.UI.Models
{
    public class MenuDTO
    {
        public int ID { get; set; }
        public int RestaurantID { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public int Price { get; set; }
        public int Quantity { get; set; }
        public string ImageUrl { get; set; }
    }
}
