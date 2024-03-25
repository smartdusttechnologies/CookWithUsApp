using Microsoft.AspNetCore.Mvc;
using CookWithUs.Web.UI.Models;
using AutoMapper;
using MediatR;
using CookWithUs.Buisness.Features.User;
using CookWithUs.Buisness.Models;

namespace CookWithUs.Web.UI.Controllers
{
    public class UserController : Controller
    {

        private readonly IMediator _mediator;

        private readonly IMapper _mapper;


        public UserController(IMediator mediator, IMapper mapper)
        {
            _mediator = mediator;

            _mapper = mapper;
        }
        [Route("AddressUpdate")]
        [HttpPost]
        public IActionResult AddressUpdate( AddressDTO Detail)
        {
            var orderValue = _mapper.Map<AddressDTO, AddressModel>(Detail);
            var response = _mediator.Send(new AddressUpdate.Command(orderValue)).Result;
            return View();
        }

        [Route("FetchAddress")]
        [HttpGet]
        public IActionResult FetchAddress( int UserId) {
            var response = _mediator.Send(new FetchAddress.Command(UserId)).Result;
            return View(response);
        }
    }
}
