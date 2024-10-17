using CookWithUs.Buisness.Models;
using CookWithUs.Buisness.Repository.Interface;
using CookWithUs.Buisness.Security.SecurityInterface;
using CookWithUs.Business.Common;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;

namespace CookWithUs.Buisness.Security
{
    public class SecurityAuthentication : ISecurityAuthentication
    {
        private readonly IConfiguration _configuration;
        private readonly IRiderRepository _riderRepository;
        private readonly ILogger<SecurityAuthentication> _logger;

        public SecurityAuthentication(IConfiguration configuration, IRiderRepository riderRepository, ILogger<SecurityAuthentication> logger)
        {
            _configuration = configuration;
            _riderRepository = riderRepository;
            _logger = logger;
        }

        public RequestResult<bool> CheckRiderDetails(RiderDetailsModel details)
        {
            try
            {
                var validationResult = ValidateNewUserRegistration(details);
                if (validationResult.IsSuccessful)
                {
                    return new RequestResult<bool>(true);
                }
                return new RequestResult<bool>(false, validationResult.Message);
            }
            catch (Exception ex)
            {
                // Log the exception
                _logger.LogError(ex, "An error occurred while checking rider details.");

                // Return a failure result with an error message
                return new RequestResult<bool>(false, new List<ValidationMessage>
                {
                    new ValidationMessage { Reason = "An unexpected error occurred.", Severity = ValidationSeverity.Error }
                });
            }
        }

        private RequestResult<bool> ValidateNewUserRegistration(RiderDetailsModel details)
        {
            List<ValidationMessage> validationMessages = new List<ValidationMessage>();
            RequestResult<bool> existingUser = _riderRepository.CheckMobileNumber(details.Mobile);

            if (existingUser.IsSuccessful)
            {
                return new RequestResult<bool>(true);
            }
            var error = new ValidationMessage
            {
                Reason = "The Mobile Number already exists",
                Severity = ValidationSeverity.Error
            };
            validationMessages.Add(error);
            return new RequestResult<bool>(false, validationMessages);
            
        }
    }
}
