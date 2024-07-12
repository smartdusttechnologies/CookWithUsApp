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
        [Route("RiderGetById/{userId}")]
        [HttpGet]
        public IActionResult RiderGetById(int UserId)
        {
            var response = _mediator.Send(new RiderDetailsById.Command(UserId)).Result;
            return Ok(response);
        }
        [Route("FindOrder/{Id}")]
        [HttpGet]
        public IActionResult FindOrder(int Id)
        {
            var response = _mediator.Send(new FindOrder.Command(Id)).Result;
            return Ok(response);
        }
        [Route("GetOrderDetailsById/{Id}")]
        [HttpGet]
        public IActionResult GetOrderDetailsById(int id)
        {
            var response = _mediator.Send(new GetOrderDetailsById.Command(id)).Result;
            return Ok(response);
        }
        [Route("OrderUpdate")]
        [HttpPost]
        public IActionResult OrderUpdate([FromBody] int orderId)
        {
            var response = _mediator.Send(new OrderUpdate.Command(orderId)).Result;
            return Ok(response);
        }
        [Route("RiderSetStatus")]
        [HttpPost]
        public IActionResult RiderSetStatus(SetOrderStatusDTO details)
        {
            var orderValue = _mapper.Map<SetOrderStatusDTO, SetOrderStatusModel>(details);
            var response = _mediator.Send(new RiderSetStatus.Command(orderValue)).Result;
            return Ok(response);
        }
    }
}
