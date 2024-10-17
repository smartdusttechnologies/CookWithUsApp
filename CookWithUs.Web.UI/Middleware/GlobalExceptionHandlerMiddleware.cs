using Newtonsoft.Json;
using System.Net;

namespace CookWithUs.Web.UI.Middleware
{
    public class GlobalExceptionHandlerMiddleware
    {
        private readonly RequestDelegate _next;

        public GlobalExceptionHandlerMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                // Pass the request to the next middleware in the pipeline
                await _next(context);
            }
            catch (UnauthorizedAccessException)
            {
                // Catch UnauthorizedAccessException and set status code
                context.Response.StatusCode = StatusCodes.Status403Forbidden;
                await context.Response.WriteAsync("Access denied.");
            }
            catch (Exception ex)
            {
                // Handle exceptions
                await HandleExceptionAsync(context, ex);
            }
        }

        private Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            // Log the exception (you can integrate logging here)

            // Prepare the response details
            var response = new
            {
                StatusCode = context.Response.StatusCode,
                Message = "An unexpected error occurred. Please try again later.",
                Detailed = exception.Message  // You can choose to hide this in production
            };

            // Serialize the response to JSON
            var jsonResponse = JsonConvert.SerializeObject(response);
             
            // Write the response
            return context.Response.WriteAsync(jsonResponse);
        }
    }
}
