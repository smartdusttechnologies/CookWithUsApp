using Microsoft.AspNetCore.Mvc;

namespace CookWithUs.Web.UI.Models
{
    public class AddressDTO 
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Address { get; set; }
        public string LocationType { get; set; }
        public string LandMark { get; set; }
        public string Building { get; set; }
    }
}
