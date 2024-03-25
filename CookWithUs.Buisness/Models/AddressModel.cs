using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CookWithUs.Buisness.Models
{
    public class AddressModel
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string name { get; set; }
        public string country { get; set; }
        public string streetAddress { get; set; }
        public string streetAddress2 { get; set; }
        public string city { get; set; }
        public string state { get; set; }
        public string pincode { get; set; }
        public string mobileNo { get; set; }
    }
}
