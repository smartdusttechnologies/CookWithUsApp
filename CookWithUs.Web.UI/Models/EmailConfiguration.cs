namespace CookWithUs.Web.UI.Models
{
    public class EmailConfiguration
    {
        public string From { get; set; } = null!;
        public string SmptServer { get; set; } = null!;
        public int Port { get; set; }
        public string UserName { get; set; } = null!;
        public string Password { get; set; } = null!;
    }
}
