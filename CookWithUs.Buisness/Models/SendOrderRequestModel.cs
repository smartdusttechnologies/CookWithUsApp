using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CookWithUs.Buisness.Models
{
    public class SendOrderRequestModel
    {
        public int OrderId { get; set; }
        public List<int> RiderIds { get; set; }
    }
}
