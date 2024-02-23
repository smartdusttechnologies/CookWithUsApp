using AutoMapper;
using CookWithUs.Web.UI.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using CookWithUs.Buisness.Features.Rider;
using CookWithUs.Buisness.Models;

namespace CookWithUs.Web.UI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RIderController : ControllerBase
    {
        private readonly IMediator _mediator;
      
        private readonly IMapper _mapper;


        public RIderController(IMediator mediator, IMapper mapper)
        {
            _mediator = mediator;
            
            _mapper = mapper;
        }

        [Route("RiderRegister")]
        [HttpPost]
        public IActionResult RiderRegister(RiderDto details)
        {
            return Ok();
        }

        [Route("RiderDetail")]
        [HttpGet]
        public IActionResult RiderDetail( decimal lat, decimal lon)
        {
            


                var  lats = 25.6094725259607;
            var  lons = 85.13652488421577;
            var response = _mediator.Send(new RiderList.Command(lats, lons)).Result;
            response.userLatitude = lats;
            response.userLongitude = lons;
            return Ok(response);
        }

        [Route("RiderOrder")]
        [HttpPost]
        public IActionResult RiderOrder(OrderHistoryDTO orderdetail)
        {
            var orderValue = _mapper.Map<OrderHistoryDTO, OrderHistoryModel>(orderdetail);
            var response = _mediator.Send(new OrderHistory.Command(orderValue)).Result;
            return Ok(response);
        }

        [Route("RiderOrderList")]
        [HttpGet]
        public IActionResult RiderOrderList(int UserId)
        {
            var response  = _mediator.Send(new RiderOrderById.Command(UserId)).Result;
            return Ok(response);
        }
    }
}
