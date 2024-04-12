using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CookWithUs.Buisness.Models
{
    public class Restaurant
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public DateTime OpeningTime { get; set; }
        public string ImageUrl { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public string Offer { get; set; }
        public string CookingTime { get; set; }
        public float Ratting { get; set; }
        public string Service { get; set; }
    }
}
