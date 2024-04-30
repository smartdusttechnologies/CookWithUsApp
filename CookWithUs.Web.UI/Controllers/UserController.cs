using Microsoft.AspNetCore.Mvc;
using CookWithUs.Web.UI.Models;
using AutoMapper;
using MediatR;
using CookWithUs.Buisness.Features.User;
using CookWithUs.Buisness.Models;
using AutoMapper.Configuration.Conventions;

namespace CookWithUs.Web.UI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
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
        public IActionResult AddressUpdate( AddressDTO Details)
        {
            var orderValue = _mapper.Map<AddressDTO, AddressModel>(Details);
            var response = _mediator.Send(new AddressUpdate.Command(orderValue)).Result;
            return Ok(response);
        }
        [Route("UpdateAddress")]
        [HttpPost]
        public IActionResult UpdateAddress(AddressDTO Details)
        {
            var orderValue = _mapper.Map<AddressDTO, AddressModel>(Details);
            var response = _mediator.Send(new UpdateAddress.Command(orderValue)).Result;
            return Ok(response);
        }

        [Route("FetchAddress/{UserId}")]
        [HttpGet]
        public IActionResult FetchAddress( int UserId) {
            var response = _mediator.Send(new FetchAddress.Command(UserId)).Result;
            return Ok(response);
        }
        [Route("DeleteAddress/{Id}")]
        [HttpGet]
        public IActionResult DeleteAddress(int Id)
        {
            var response = _mediator.Send(new DeleteAddress.Command(Id)).Result;
            return Ok(response);
        }

        [Route("AddItemToCart")]
        [HttpPost]
        public  IActionResult AddItemToCart(CartDto Details)
        {
            var orderValue = _mapper.Map<CartDto, CartModel>(Details);
            var response =  _mediator.Send(new AddToCart.Command(orderValue)).Result;
            return Ok(response);
        }

        [Route("CartUpdate")]
        [HttpPost]
        public IActionResult CartUpdate(int  Id, int Quantity)
        {
            
            var response = _mediator.Send(new Cart.Command(Id,Quantity)).Result;
            return Ok(response);
        }

        [Route("CartDetails/{UserID}")]
        [HttpGet]
        public IActionResult CartDetails(int  UserId)
        {
            var response = _mediator.Send(new FetchCartDetail.Command(UserId)).Result;
            return Ok(response);
        }
    }
}
