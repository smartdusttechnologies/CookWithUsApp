namespace CookWithUs.Web.UI.Models
{
    public class OrderHistoryDTO
    {

        
        public int ID { get; set; }
        public int UserId { get; set; }
        public string OrderName { get; set; }
        public DateTime OrderDateTime { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string OrderStatus { get; set; }

    }
}
