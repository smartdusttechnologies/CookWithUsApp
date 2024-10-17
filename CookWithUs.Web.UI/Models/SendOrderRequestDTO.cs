namespace CookWithUs.Web.UI.Models
{
    public class SendOrderRequestDTO
    {
        public int OrderId { get; set; }
        public List<int> RiderIds { get; set; }
    }
}
