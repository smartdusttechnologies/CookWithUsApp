using AutoMapper;
using CookWithUs.Buisness.Features.Resturant.Queries;
using CookWithUs.Buisness.Features.Rider;
using CookWithUs.Buisness.Features.User;
using CookWithUs.Buisness.Models;
using CookWithUs.Web.UI.Models;
using CookWithUs.Web.UI.Services;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CookWithUs.Web.UI.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IMediator _mediator;

        private readonly IMapper _mapper;
        private readonly IEmailService _emailService;

        public AuthController(IMediator mediator, IMapper mapper, IEmailService emailService)
        {
            _mediator = mediator;

            _mapper = mapper;
            _emailService = emailService;
        }        
        [Route("RiderLogin")]
        [HttpPost]
        public IActionResult RiderLogin(LoginSequrityDetailsDTO loginDetails)
        {
            var details = _mapper.Map<LoginSequrityDetailsDTO, LoginSequrityDetailsModel>(loginDetails);

            var response = _mediator.Send(new RiderLogin.Command(details)).Result;
            return Ok(response);
        }

        [Route("RiderSignup")]
        [HttpPost]
        public IActionResult RiderSignup(RiderDetailsDTO details)
        {
            var riderDetails = _mapper.Map<RiderDetailsDTO, RiderDetailsModel>(details);
            var response = _mediator.Send(new RiderSignup.Command(riderDetails)).Result;
            return Ok(response);
        }
        [Route("OTPAuthenticate")]
        [HttpPost]
        public IActionResult OTPAuthenticate(ManageOtpDTO otpDetails)
        {
            var details = _mapper.Map<ManageOtpDTO, ManageOtpModel>(otpDetails);

            //Generate OTP
            Random random = new Random();
            string otp = "";
            for (int i = 0; i < 6; i++)
            {
                otp += random.Next(0, 10).ToString();
            }
            details.OTP = otp;
            var sendMessage = new Message(new string[] { details.Details }, "Cook With Us", "Your OTP is :" + otp);
            _emailService.SendEmail(sendMessage);
            var response = _mediator.Send(new OTPAuthenticate.Command(details)).Result;
            return Ok(response);
        }
        [Route("MatchOTP")]
        [HttpPost]
        public IActionResult MatchOTP(ManageOtpDTO otpDetails)
        {
            var details = _mapper.Map<ManageOtpDTO, ManageOtpModel>(otpDetails);

            var response = _mediator.Send(new MatchOTP.Command(details)).Result;
            return Ok(response);
        }
        [Route("SendOTPEmail")]
        [HttpPost]
        public IActionResult SendOTPEmail(SendEmailDTO message)
        {
            var sendMessage = new Message(new string[] { message.Email }, message.Subject, message.Body);
            _emailService.SendEmail(sendMessage);
            return StatusCode(StatusCodes.Status200OK,
                new Response { Status = "Sucess", Message = "Email Sent Sucessfully" }
                );
        }

        //Restaurent Authentication Methods
        [Route("RestaurantResgister")]
        [HttpPost]
        public IActionResult RestaurantRegister(RegisterRestaurantDTO restaurantDetails)
        {
            var restaurantModel = _mapper.Map<RegisterRestaurantDTO, RegisterRestaurantModel>(restaurantDetails);
            var response = _mediator.Send(new RegisterRestaurant.Command(restaurantModel)).Result;
            return Ok(response);
        }

        //User Authentication Methods
        [Route("CheckUserMobile/{MobileNumber}")]
        [HttpGet]
        public async Task<IActionResult> CheckUserMobile(string MobileNumber)
        {
            var response = await _mediator.Send(new CheckUserMobile.Command(MobileNumber));
            return Ok(response);
        }

        [Route("SignupUser")]
        [HttpPost]
        public IActionResult SignupUser(UserDetailsDTO details)
        {
            var userDetails = _mapper.Map<UserDetailsDTO, UserDetailsModel>(details);
            var response = _mediator.Send(new SignupUser.Command(userDetails)).Result;
            return Ok(response);
        }
        [Route("LoginUser")]
        [HttpPost]
        public IActionResult LoginUser(LoginSequrityDetailsDTO loginDetails)
        {
            var details = _mapper.Map<LoginSequrityDetailsDTO, LoginSequrityDetailsModel>(loginDetails);

            var response = _mediator.Send(new LoginUser.Command(details)).Result;
            return Ok(response);
        }
        [Route("GetRestaurantCategory")]
        [HttpGet]
        public IActionResult GetRestaurantCategory()
        {
            var responce = _mediator.Send(new GetRestaurantCategory.Command()).Result;
            return Ok(responce);
        }
        
        [Route("RestaurantSignup")]
        [HttpPost]
        public IActionResult RestaurantSignup(RestaurantDetailsDTO details)
        {
            var signupDetails = _mapper.Map<RestaurantDetailsDTO, RestaurantDetailsModel>(details);
            var responce = _mediator.Send(new RestaurantSignup.Command(signupDetails)).Result;
            return Ok(responce);
        }
        [Route("RestaurantDetailsLogin")]
        [HttpPost]
        public IActionResult RestaurantDetailsLogin(LoginSequrityDetailsDTO loginDetails)
        {
            var details = _mapper.Map<LoginSequrityDetailsDTO, LoginSequrityDetailsModel>(loginDetails);
            var response = _mediator.Send(new RestaurantDetailsLogin.Command(details)).Result;
            return Ok(response);
        }
    }
    
}
