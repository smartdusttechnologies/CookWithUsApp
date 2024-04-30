namespace CookWithUs.Web.UI.Models
{
    public class AddToCartDTO
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ItemId { get; set; }
        public int Quantity { get; set; }
        public string Time { get; set;}
        public string ResturentName {  get; set; }
        public string ResturentLocation { get; set; }
        public int ResturentId { get; set; }
        public int Price {  get; set; }
        public string Name { get; set; }
        public int DiscountedPrice { get; set; }
    }
}
