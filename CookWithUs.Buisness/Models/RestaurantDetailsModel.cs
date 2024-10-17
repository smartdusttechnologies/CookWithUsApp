namespace CookWithUs.Buisness.Models
{
    public class RestaurantDetailsModel
    {
        public int Id { get; set; }
        public string OwnerFullName { get; set; }
        public string RestaurantName { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public string Whatsapp { get; set; }
        public string WorkingDays { get; set; }
        public string OpeningTime { get; set; }
        public string ClosingTime { get; set; }
        public string Category { get; set; }
        public string OwnerPan { get; set; }
        public string GstIn { get; set; }
        public string IfscCode { get; set; }
        public string AccountNumber { get; set; }
        public string FssaiNumber { get; set; }
        public string Menu { get; set; }
        public string Password { get; set; }
        public bool IsDeleted { get; set; }
    }

}