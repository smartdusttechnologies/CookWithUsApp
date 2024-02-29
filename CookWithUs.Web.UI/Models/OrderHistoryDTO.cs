namespace CookWithUs.Web.UI.Models
{
    public class OrderHistoryDTO
    {

        
        public int Id { get; set; }
        public int RiderId { get; set; }
        public int OrderPrice { get; set; }
       
        public DateTime OrderDateTime { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string OrderStatus { get; set; }

    }
}
