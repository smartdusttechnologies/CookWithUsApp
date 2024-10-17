using AutoMapper;
using CookWithUs.Buisness.Features.Resturant.Queries;
using CookWithUs.Buisness.Models;
using CookWithUs.Web.UI.Models;
using CookWithUs.Web.UI.Services;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ServcieBooking.Buisness.Features.Resturant;

namespace CookWithUs.Web.UI.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("[controller]")]
    public class PublicdetailsController : ControllerBase
    {
        private readonly IMediator _mediator;

        private readonly IMapper _mapper;
        private readonly IEmailService _emailService;

        public PublicdetailsController(IMediator mediator, IMapper mapper, IEmailService emailService)
        {
            _mediator = mediator;
            _mapper = mapper;
            _emailService = emailService;
        }
        [Route("Get")]
        [HttpGet]
        public IActionResult Get(decimal latitude, decimal longitude)
        {

            latitude = 25.481471440557847M;
            longitude = 84.86240659540002M;
            var response = _mediator.Send(new GetResturant.Command(latitude, longitude)).Result;
            return Ok(response);
        }
        [Route("GetById/{resturantId}")]
        [HttpGet]
        public IActionResult Get(int resturantId)
        {
            var response = _mediator.Send(new GetByIdResturant.Command(resturantId)).Result;
            return Ok(response);
        }
        [Route("GetMenuByCategoryID/{CategoryId}")]
        [HttpPost]
        public IActionResult GetMenuByCategoryID(int CategoryId)
        {
            var response = _mediator.Send(new GetMenuByCategoryID.Command(CategoryId)).Result;
            return Ok(response);
        }

        [Route("FetchMenuCategory/{resturantId}")]
        [HttpGet]
        public IActionResult FetchMenuCategory(int resturantId)
        {
            var response = _mediator.Send(new FetchAllMenuCategory.Command(resturantId)).Result;
            return Ok(response);
        }
    }
}
