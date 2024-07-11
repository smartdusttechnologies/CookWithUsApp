namespace CookWithUs.Web.UI.Models
{
    public class SetOrderStatusDTO
    {
        public int OrderId { get; set; }
        public string Status { get; set; }
        public int? PrepareTime { get; set; }
        public string? AcceptOrderTime { get; set; }
    }
}
