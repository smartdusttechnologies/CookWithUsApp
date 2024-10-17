using CookWithUs.Buisness.Common;
using CookWithUs.Buisness.Models;
using CookWithUs.Buisness.Models.Enums;
using CookWithUs.Buisness.Repository.Interface;
using CookWithUs.Business.Common;
using MediatR;
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

namespace CookWithUs.Buisness.Features.Rider
{
    public class RiderLogin
    {       
        public class Command : IRequest<RequestResult<LoginToken>>
        {
            public LoginSequrityDetailsModel LoginDetails { get; set; }
            public Command(LoginSequrityDetailsModel details)
            {
                LoginDetails = details;
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
            private readonly IRiderRepository _rider;
            private readonly IConfiguration _configuration;

            public Handler(IRiderRepository resturant, IConfiguration configuration)
            {
                _rider = resturant;
                _configuration = configuration;
            }

            Task<RequestResult<LoginToken>> IRequestHandler<Command, RequestResult<LoginToken>>.Handle(Command request, CancellationToken cancellationToken)
            {
                // Call the first method
                string otpDetails = request.LoginDetails.UserName;
                RiderDetailsModel rider = _rider.GetRiderLoginDetailsByUserName(otpDetails);
                int riderId = rider.Id;
                PasswordLogin password = _rider.GetRiderPassworByUserId(riderId);
                bool passwordMatch = Hasher.ValidateHash(request.LoginDetails.Password, password.PasswordSalt, password.PasswordHash, out string valueHash);
                if (!passwordMatch)
                {
                    return Task.FromResult(new RequestResult<LoginToken>(new List<ValidationMessage> { new ValidationMessage { Reason = "Your Password is Incorrect", Severity = ValidationSeverity.Error } }));
                }
                // Return success result
                List<ValidationMessage> validationMessages = new List<ValidationMessage>();
                try
                {
                    LoginToken token = new LoginToken();
                    token = GenerateTokens(request.LoginDetails.UserName);
                    token.RoleId = riderId;
                    return Task.FromResult(new RequestResult<LoginToken>(token, validationMessages));
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

                var userModel = _rider.GetRiderLoginDetailsByUserName(sub);
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
                claims.Add(new Claim(CustomClaimType.Role.ToString(), "Rider"));

                if (sub.ToLower() == "sysadmin")
                    claims.Add(new Claim(CustomClaimType.Role.ToString(), "Rider"));
                //else

                //claims.Add(new Claim(CustomClaimType.OrganizationId.ToString(), userModel.OrgId.ToString()));

                return claims;
            }

        }
    }
}

