using Microsoft.AspNetCore.Mvc;

namespace CookWithUs.Web.UI.Models
{
    public class AddressDTO 
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string name { get; set; }
        public string  country { get; set; }
        public string streetAddress { get; set; }
        public string streetAddress2 { get; set; }
        public string city { get; set; }
        public string state { get; set; }
        public string pincode { get; set; }
        public string mobileNo { get; set; }
    }
}
