namespace CookWithUs.Web.UI.Models.Payment
{
    public class PaymentDTO
    {
        public int Id { get; set; }
        public string CustomerName { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public double TotalAmount { get; set; }
    }
}
