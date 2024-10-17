using AutoMapper;
using CookWithUs.Web.UI.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using CookWithUs.Buisness.Features.Rider;
using CookWithUs.Buisness.Models;
using Microsoft.AspNetCore.Identity;
using CookWithUs.Web.UI.Services;
using Microsoft.AspNetCore.Authorization;

namespace CookWithUs.Web.UI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class RIderController : ControllerBase
    {
        private readonly IMediator _mediator;
      
        private readonly IMapper _mapper;
        private readonly IEmailService _emailService;

        public RIderController(IMediator mediator, IMapper mapper, IEmailService emailService)
        {
            _mediator = mediator;
            
            _mapper = mapper;
            _emailService = emailService;
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
            var  lats = (double)lat;
            var  lons = (double)lon;
            var response = _mediator.Send(new RiderList.Command(lats, lons)).Result;
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
        [Route("checkRiderOrderDetails/{riderId}")]
        [HttpGet]
        public IActionResult checkRiderOrderDetails(int riderId)
        {
            var response = _mediator.Send(new checkRiderOrderDetails.Command(riderId)).Result;
            return Ok(response);
        }
        [Route("FindOrder/{orderId}")]
        [HttpGet]
        public IActionResult FindOrder(int orderId)
        {
            var response = _mediator.Send(new FindOrder.Command(orderId)).Result;
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
        [Route("AssignRiderOrder")]
        [HttpPost]
        public IActionResult AssignRiderOrder(FindOrderDTO details)
        {
            var assignDetails = _mapper.Map<FindOrderDTO, FindOrderModel>(details);
            var response = _mediator.Send(new AssignRiderOrder.Command(assignDetails)).Result;
            return Ok(response);
        }
        [Route("SendOrderRequest")]
        [HttpPost]
        public IActionResult SendOrderRequest(SendOrderRequestDTO details)
        {
            var riderDetails = _mapper.Map<SendOrderRequestDTO, SendOrderRequestModel>(details);
            var response = _mediator.Send(new SendOrderRequest.Command(riderDetails)).Result;
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

        [Route("RiderStatus")]
        [HttpPost]
        public IActionResult RiderStatus(FindOrderDTO details)
        {
            var orderValue = _mapper.Map<FindOrderDTO, FindOrderModel>(details);
            var response = _mediator.Send(new RiderStatus.Command(orderValue)).Result;
            return Ok(response);
        }
    }
}
