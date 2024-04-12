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
        public string Address { get; set; }
        public string LocationType { get; set; }
        public string LandMark { get; set; }
        public string Building { get; set; }
    }
}
