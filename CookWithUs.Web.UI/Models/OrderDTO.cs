using CookWithUs.Buisness.Features.Resturant.Queries;

namespace CookWithUs.Web.UI.Models
{
    public class OrderDTO
    {
        public int UserID { get; set; }
        public string Address { get; set; }
        public int Zipcode { get; set; }
        public int OrderPrice { get; set; }
        public string Phone { get; set; }
        public List<OrdersProduct> Products { get; set; }
    }
}
