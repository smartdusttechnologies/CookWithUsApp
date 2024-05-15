namespace CookWithUs.Web.UI.Models
{
    public class VariantOptionDTO
    {
        public int VariantID { get; set; }
        public int MenuId { get; set; }
        public string VariantName { get; set; }
        public string OptionName { get; set; }
        public string OptionType { get; set; }
        public int OptionPrice { get; set; }
    }
}
