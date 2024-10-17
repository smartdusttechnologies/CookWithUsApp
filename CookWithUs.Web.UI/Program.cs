using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using CookWithUs.Buisness.Hubs;
using CookWithUs.Buisness.Repository;
using CookWithUs.Buisness.Repository.Interface;
using CookWithUs.Buisness.Security;
using CookWithUs.Buisness.Security.SecurityInterface;
using CookWithUs.Web.UI.Services;
using CookWithUs.Web.UI.Models;
using ServcieBooking.Buisness.Infrastructure;
using ServcieBooking.Buisness.Repository;
using ServiceBooking.Buisness.Repository.Interface;
using CookWithUs.Buisness.Models.LocationService;
using ServcieBooking.Buisness;
using CookWithUs.Web.UI.Middleware;

namespace ServcieBooking.Web.UI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            try
            {
                CreateHostBuilder(args).Build().Run();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }

    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            // Add Email Configuration
            var emailConfig = Configuration.GetSection("EmailConfiguration").Get<EmailConfiguration>();
            services.AddSingleton(emailConfig);

            // Add AutoMapper
            services.AddAutoMapper(typeof(Startup));

            // Add MVC services
            services.AddControllersWithViews();

            // Add HTTP Context Accessor
            services.AddHttpContextAccessor();

            // Add Scoped Services
            services.AddScoped<IResturantRepository, ResturantRepository>();
            services.AddScoped<IConnectionFactory, ConnectionFactory>();
            services.AddScoped<IDocumentRepository, DocumentRepository>();
            services.AddScoped<IRiderRepository, RiderRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<ISecurityAuthentication, SecurityAuthentication>();
            services.AddScoped<IEmailService, EmailService>();

            // Add Application Services
            services.AddApplication();
            services.AddSignalR();

            // Add CORS Policy
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", builder =>
                {
                    builder.AllowAnyOrigin()
                           .AllowAnyMethod()
                           .AllowAnyHeader();
                });
            });

            // Add JWT Authentication
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = Configuration["Jwt:ValidIssuer"],
                        ValidAudience = Configuration["Jwt:ValidAudience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Secret"]))
                    };
                });

            // Add Authorization
            services.AddAuthorization(options =>
            {
                options.AddPolicy("AllowAnonymous", policy =>
                {
                    policy.RequireAssertion(context => true);
                });
            });

            // Add Singleton for User Connections
            services.AddSingleton<IDictionary<string, UserConnection>>(opts => new Dictionary<string, UserConnection>());

            // Configure SPA Static Files
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts(); // Enforce HTTPS in production
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            // Use CORS
            app.UseCors("AllowAll");

            app.UseMiddleware<GlobalExceptionHandlerMiddleware>();
            // Authentication and Authorization Middleware
            app.UseAuthentication();
            app.UseRouting();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                // Map default routes
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");

                // Explicitly allow anonymous access for the login route
                endpoints.MapControllerRoute(
                     name: "AuthRoutes",
                     pattern: "Auth/{action=Index}/{id?}",
                     defaults: new { controller = "Auth" }
                 ).AllowAnonymous();
                endpoints.MapControllerRoute(
                     name: "PublicdetailsRoutes",
                     pattern: "Publicdetails/{action=Index}/{id?}",
                     defaults: new { controller = "Publicdetails" }
                 ).AllowAnonymous();
                // Protect all other controllers by default
                endpoints.MapControllers().RequireAuthorization();

                // SignalR hub routes
                endpoints.MapHub<LocationHub>("/location");

                // Serve index.html as a fallback (for SPA routing)
                endpoints.MapFallbackToFile("index.html");
            });

            // SPA setup
            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
