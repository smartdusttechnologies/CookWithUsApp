namespace CookWithUs.Web.UI.Models
{
    public class RegisterRestaurantDTO
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }

        // List of file IDs attached to the Registration request.
        public List<int> AttachedFileIDs { get; set; }
    }
}
