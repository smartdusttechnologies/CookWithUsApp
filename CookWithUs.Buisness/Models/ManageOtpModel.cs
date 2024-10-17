using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CookWithUs.Buisness.Models
{
    public class ManageOtpModel
    {
        public int ID { get; set; }
        public string Type { get; set; }
        public string Details { get; set; }
        public string OTP { get; set; }
        public string DateTime { get; set; }
        public string Role { get; set; }
    }
}
