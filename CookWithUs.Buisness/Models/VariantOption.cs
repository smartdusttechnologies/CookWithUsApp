using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CookWithUs.Buisness.Models
{
    public  class VariantOption
    {
        public int VariantID { get; set; }
        public int MenuId {  get; set; }
        public string VariantName { get; set; }
        public string OptionName { get; set; }
        public string OptionType { get; set; }
        public int OptionPrice { get; set; }
    }
}
