using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CookWithUs.Buisness.Models
{
    public class RestaurantAttachment
    {
        // Identifier for the restaurant request to which files are attached.
        public int RestaurantID { get; set; }

        // Identifier for the attached document/file.
        public int DocumentID { get; set; }
    }
}
