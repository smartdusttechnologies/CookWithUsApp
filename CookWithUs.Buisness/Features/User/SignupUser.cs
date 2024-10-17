using CookWithUs.Buisness.Common;
using CookWithUs.Buisness.Models;
using CookWithUs.Buisness.Models.Enums;
using CookWithUs.Buisness.Repository.Interface;
using CookWithUs.Buisness.Security.SecurityInterface;
using CookWithUs.Business.Common;
using MediatR;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ServcieBooking.Buisness.Interface;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace CookWithUs.Buisness.Features.User
{
    public class SignupUser
    {
        public class Command : IRequest<RequestResult<LoginToken>>
        {
            public UserDetailsModel user { get; set; }
            public Command(UserDetailsModel userDetails)
            {
                user = userDetails;
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
            private readonly IUserRepository _user;
            private readonly ISecurityAuthentication _securityAuthentication;
            private readonly IConfiguration _configuration;


            public Handler(IUserRepository user, ISecurityAuthentication securityAuthentication, IConfiguration configuration)
            {
                _user = user;
                _securityAuthentication = securityAuthentication;
                _configuration = configuration;

            }

            Task<RequestResult<LoginToken>> IRequestHandler<Command, RequestResult<LoginToken>>.Handle(Command request, CancellationToken cancellationToken)
            {
                List<ValidationMessage> validationMessages = new List<ValidationMessage>();
                try
                {
                    var validationResult = _user.CheckUserMobileNumber(request.user.UserName);
                    if (validationResult.IsSuccessful)
                    {
                        PasswordLogin passwordLogin = Hasher.HashPassword(request.user.Password);
                        RequestResult<bool> requestResult = _user.SignupUser(request.user, passwordLogin);
                        string otpDetails = request.user.UserName;
                        UserDetailsModel user = _user.GetUserLoginDetailsByUserName(otpDetails);
                        int userId = user.Id;
                        // Return success result
                        
                        try
                        {
                            LoginToken token = new LoginToken();
                            token = GenerateTokens(request.user.UserName);
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
            /// <summary>
            /// Method to Generate Token
            /// </summary>
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
                // Specifically add the jti (random nonce), iat (issued timestamp), and sub (subject/user) claims.
                // You can add other claims here, if you want:

                var userModel = _user.GetUserLoginDetailsByUserName(sub);
                //var roleClaims = roleByOrganizationWithClaims.Select(x => new Claim(ClaimTypes.Role, x.RoleName));
                //var userRoleClaim = roleByOrganizationWithClaims.Select(x => new Claim(CustomClaimTypes.Permission, x.ClaimName));

                var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, sub),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, Helpers.ToUnixEpochDate(dateTime).ToString(), ClaimValueTypes.Integer64)
            };
                //.Union(roleClaims).Union(userRoleClaim).ToList(); 

                //var roles = _roleRepository.GetRoleWithOrg(sub);
                //foreach (var role in roles)
                //{
                //    claims.Add(new Claim(ClaimTypes.Role, role.Item2));
                //}

                claims.Add(new Claim(CustomClaimType.UserId.ToString(), userModel.Id.ToString()));
                claims.Add(new Claim(CustomClaimType.Role.ToString(), "User"));

                if (sub.ToLower() == "sysadmin")
                    claims.Add(new Claim(CustomClaimType.Role.ToString(), "User"));
                //else

                //claims.Add(new Claim(CustomClaimType.OrganizationId.ToString(), userModel.OrgId.ToString()));

                return claims;
            }

        }
    }
}
