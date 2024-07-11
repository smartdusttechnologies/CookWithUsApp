﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CookWithUs.Buisness.Models
{
    public class RiderListModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
        public string MobileNo { get; set; }
        public string Pincode { get; set; }
        public Decimal Distance { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public int RiderIsActive { get; set; }
        public int RiderLastWeekIncome { get; set; }
        public int RiderThisWeekIncome { get; set; }
        public int RiderOrderAssign { get; set; }
        public int IsDeleted { get; set; }
        public double userLatitude { get; set;}
        public double userLongitude { get; set;}
    }
}
