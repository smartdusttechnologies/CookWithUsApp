using CookWithUs.Buisness.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using ServcieBooking.Buisness.Features.Resturant;
using ServiceBooking.Buisness.Repository.Interface;

namespace ServiceBooking.Web.UI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ResturantController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IResturantRepository _restaurant;


        public ResturantController(IMediator mediator, IResturantRepository restaurant)
        {
            _mediator = mediator;
            _restaurant = restaurant;
        }
        [Route("Get")]
        [HttpGet]
        public Task<List<Restaurant>> Get()
        {
            var response = _mediator.Send(new GetResturant.Command());
            return response;
        }

        [Route("GetById/{resturantId}")]
        [HttpGet]
        public Task<RestaurantDetails> Get(int resturantId)
        {
            //return _mediator.Send(new GetByIdResturant.Command().resturantId = resturantId);
            var response = Task.FromResult(_restaurant.Get(resturantId));
            return response;
        }
    }
}
