namespace CookWithUs.Web.UI.Models
{
    public class CartDetailDto
    {
        public string RestaurantName { get; set; }
        public List<CartDto> CartDetails { get; set; }
    }
}
