using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CookWithUs.Buisness.Models
{
    public class RiderModel
    {
        public String name { get; set; }
        public String userName { get; set; }
        public String email { get; set; }
        public String phoneNumber { get; set; }
        public String address { get; set; }
        public String vehicleNo { get; set; }
        public String license { get; set; }
        public String aadharNo { get; set; }
        public String panNo { get; set; }
        public String vehicleType { get; set; }
        public List<int> AttachedFileIDs { get; set; }

    }
}
