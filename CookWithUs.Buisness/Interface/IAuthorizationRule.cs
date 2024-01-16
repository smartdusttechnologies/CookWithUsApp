using Microsoft.AspNetCore.Http;

namespace ServcieBooking.Buisness.Interface
{
    public interface IAuthorizationRule<in TRequest>
    {
        Task Authorize(TRequest request,CancellationToken cancellationToken,IHttpContextAccessor contex);
    }
}
