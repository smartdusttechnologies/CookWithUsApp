namespace CookWithUs.Web.UI.Models
{
    public class MenuCategoryDTO
    {
        public int ID { get; set; }
        public string CategoryName { get; set; }
        public int RestaurantId { get; set; }
        public int InStock { get; set; }
        public string NextStockTime { get; set;}

    }
}
