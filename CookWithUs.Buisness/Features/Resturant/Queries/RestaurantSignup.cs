using CookWithUs.Buisness.Common;
using CookWithUs.Buisness.Models;
using CookWithUs.Buisness.Models.Enums;
using CookWithUs.Business.Common;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ServcieBooking.Buisness.Interface;
using ServiceBooking.Buisness.Repository.Interface;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace CookWithUs.Buisness.Features.Resturant.Queries
{
    public class RestaurantSignup
    {
        public class Command : IRequest<RequestResult<LoginToken>>
        {
            public RestaurantDetailsModel restaurantDetails { get; set; }
            public Command(RestaurantDetailsModel signupDetails)
            {
                restaurantDetails = signupDetails;
            }
        }
        public class Authorization : IAuthorizationRule<Command>
        {

            public Task Authorize(Command request, CancellationToken cancellationToken, IHttpContextAccessor contex)
            {
                //Check If This Rquest Is Accessable To User Or Not
                var user = new { UserId = 10, UserName = "Yashraj" };
                var userClaim = new { UserId = 10, ClaimType = "application", Claim = "GetUiPageType" };
                if (userClaim.Claim == "GetUiPageType" && user.UserId == userClaim.UserId)
                {
                    return Task.CompletedTask;
                }
                return Task.FromException(new UnauthorizedAccessException("You are Unauthorized"));
            }
        }
        public class Handler : IRequestHandler<Command, RequestResult<LoginToken>>
        {
            private readonly IResturantRepository _restaurant;
            readonly IConfiguration _configuration;

            public Handler(IResturantRepository resturant, IConfiguration configuration)
            {
                _restaurant = resturant;
                _configuration = configuration;
            }

            Task<RequestResult<LoginToken>> IRequestHandler<Command, RequestResult<LoginToken>>.Handle(Command request, CancellationToken cancellationToken)
            {
                List<ValidationMessage> validationMessages = new List<ValidationMessage>();
                try
                {
                    var validationResult = _restaurant.CheckRestaurantEmail(request.restaurantDetails.Email);
                    if (validationResult.IsSuccessful)
                    {
                        PasswordLogin passwordLogin = Hasher.HashPassword(request.restaurantDetails.Password);
                        RequestResult<bool> requestResult = _restaurant.RestaurantSignup(request.restaurantDetails, passwordLogin);
                        string otpDetails = request.restaurantDetails.Email;
                        RestaurantDetailsModel user = _restaurant.GetRestaurantByEmail(otpDetails);
                        int userId = user.Id;
                        // Return success result

                        try
                        {
                            LoginToken token = new LoginToken();
                            token = GenerateTokens(request.restaurantDetails.Email);
                            token.UserId = userId;
                            // return Task.FromResult(requestResult);
                            return Task.FromResult(new RequestResult<LoginToken>(token, validationMessages));
                        }
                        catch (Exception ex)
                        {
                            validationMessages.Add(new ValidationMessage { Reason = ex.Message, Severity = ValidationSeverity.Error, Description = ex.StackTrace });
                            //return Task.FromResult(requestResult);
                            return Task.FromResult(new RequestResult<LoginToken>(validationMessages));
                        }

                    }
                    return Task.FromResult(new RequestResult<LoginToken>(new List<ValidationMessage> { new ValidationMessage { Reason = "Something went Wrong!", Severity = ValidationSeverity.Error } }));
                }
                catch (Exception ex)
                {
                    validationMessages.Add(new ValidationMessage { Reason = ex.Message, Severity = ValidationSeverity.Error, Description = ex.StackTrace });
                    return Task.FromResult(new RequestResult<LoginToken>(validationMessages));
                }

            }
            private LoginToken GenerateTokens(string userName)
            {
                var authSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["JWT:Secret"]));

                DateTime now = DateTime.Now;
                var claims = GetTokenClaims(userName, now);

                var accessJwt = new JwtSecurityToken(
                    issuer: _configuration["JWT:ValidIssuer"],
                    audience: _configuration["JWT:ValidAudience"],
                    claims: claims,
                    notBefore: now,
                    expires: now.AddDays(1),
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256Signature)
                );

                var encodedAccessJwt = new JwtSecurityTokenHandler().WriteToken(accessJwt);

                var refreshJwt = new JwtSecurityToken(
                    issuer: _configuration["JWT:ValidIssuer"],
                    audience: _configuration["JWT:ValidAudience"],
                    claims: claims,
                    notBefore: now,
                    expires: now.AddDays(30),
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256Signature)
                );
                var encodedRefreshJwt = new JwtSecurityTokenHandler().WriteToken(refreshJwt);

                var loginToken = new LoginToken
                {
                    UserName = userName,
                    AccessToken = encodedAccessJwt,
                    AccessTokenExpiry = DateTime.Now.AddDays(1),
                    RefreshToken = encodedRefreshJwt,
                    RefreshTokenExpiry = DateTime.Now.AddDays(30),
                };
                //_authenticationRepository.SaveLoginToken(loginToken);
                //TODO: this should be a async operation and can be made more cross-cutting design feature rather than calling inside the actual feature.
                //_loggerRepository.LoginTokenLog(loginToken);
                return loginToken;
            }
            /// <summary>
            ///Method to Get Token Cliams
            /// </summary>
            private List<Claim> GetTokenClaims(string sub, DateTime dateTime)
            {
                // Get user model based on the email provided (subject).
                var userModel = _restaurant.GetRestaurantByEmail(sub);

                // Retrieve the restaurant ID.
                var restaurantId = userModel.Id;

                // Create a list of claims, including standard claims like sub, jti, and iat.
                var claims = new List<Claim>
                    {
                        new Claim(JwtRegisteredClaimNames.Sub, sub),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, Helpers.ToUnixEpochDate(dateTime).ToString(), ClaimValueTypes.Integer64),
                        new Claim(CustomClaimType.UserId.ToString(), userModel.Id.ToString()),
                        new Claim(CustomClaimType.Role.ToString(), "Restaurant"),
                        new Claim("restaurant_id", restaurantId.ToString()) // Add the restaurant ID claim here
                    };

                // If the user is a sysadmin, add additional role claim.
                if (sub.ToLower() == "sysadmin")
                {
                    claims.Add(new Claim(CustomClaimType.Role.ToString(), "Admin"));
                }

                // Return the list of claims.
                return claims;
            }

        }
    }
}
