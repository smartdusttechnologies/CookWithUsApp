using CookWithUs.Web.UI.Models;

namespace CookWithUs.Web.UI.Services
{
    public interface IEmailService
    {
        void SendEmail(Message message);
    }
}
