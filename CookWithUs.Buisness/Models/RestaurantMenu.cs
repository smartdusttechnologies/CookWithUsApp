﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CookWithUs.Buisness.Models
{
    public class RestaurantMenu
    {
        public int ID { get; set; }
        public int RestaurantID { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public int Price { get; set; }
        public int Quantity { get; set; }
        public string ImageUrl { get; set; }
        public string Info { get; set; }
        public int CategoryID { get; set; }
        public int InStock { get; set; }
        public int PackingPrice { get; set; }
        public int GstPrice { get; set; }
        public List<VariantOption> Variants { get; set; }
    }
}
