using AutoMapper;
using CookWithUs.Buisness.Features.Resturant.Queries;
using CookWithUs.Buisness.Models;
using CookWithUs.Web.UI.Models;
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
        private readonly IMapper _mapper;


        public ResturantController(IMediator mediator, IMapper mapper)
        {
            _mediator = mediator;
            _mapper = mapper;
        }
        [Route("Get")]
        [HttpGet]
        public IActionResult Get(decimal latitude, decimal longitude)
        {
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

        [Route("GetByUserID/{userId}")]
        [HttpGet]
        public IActionResult GetByUserID(int userId)
        {
            var response = _mediator.Send(new GetRestaurantByUserID.Command(userId)).Result;
            return Ok(response);
        }

        [Route("RestaurantResgister")]
        [HttpPost]
        public IActionResult RestaurantRegister (RegisterRestaurantDTO restaurantDetails)
        {
            var restaurantModel = _mapper.Map<RegisterRestaurantDTO, RegisterRestaurantModel>(restaurantDetails);

            var response = _mediator.Send(new RegisterRestaurant.Command(restaurantModel)).Result;
            return Ok(response);
        }

        [Route("CreateMenu")]
        [HttpPost]
        public IActionResult CreateMenu (MenuDTO menuDTO)
        {
            var menuModel = _mapper.Map<MenuDTO, RestaurantMenu>(menuDTO);

            var response = _mediator.Send(new CreateMenu.Command(menuModel)).Result;
            return Ok(response);
        }

        [Route("UpdateMenu")]
        [HttpPost]
        public IActionResult UpdateMenu (MenuDTO menuDTO)
        {
            var menuModel = _mapper.Map<MenuDTO, RestaurantMenu>(menuDTO);

            var response = _mediator.Send(new UpdateMenu.Command(menuModel)).Result;
            return Ok(response);
        }

        [Route("DeleteMenu/{menuId}")]
        [HttpPost]
        public IActionResult DeleteMenu(int menuId)
        {
            var response = _mediator.Send(new DeleteMenu.Command(menuId)).Result;
            return Ok(response);
        }

        [Route("PlaceOrder")]
        [HttpPost]
        public IActionResult PlaceOrder(OrderDTO orderDTO)
        {
            var orderModel = _mapper.Map<OrderDTO, OrderModel>(orderDTO);

            var response = _mediator.Send(new PlaceOrder.Command(orderModel)).Result;
            return Ok(response);
        }

        [Route("GetOrders")]
        [HttpGet]
        public IActionResult GetOrders()
        {
            var response = _mediator.Send(new GetOrders.Command()).Result;
            return Ok(response);
        }

        [Route("GetOrdersByUserID/{userId}")]
        [HttpGet]
        public IActionResult GetOrdersByUserID(int userId)
        {
            var response = _mediator.Send(new GetOrdersByUserID.Command(userId)).Result;
            return Ok(response);
        }

        [Route("GetOrderDetails/{orderId}")]
        [HttpGet]
        public IActionResult GetOrderDetails(int orderId)
        {
            var response = _mediator.Send(new GetOrderDetails.Command(orderId)).Result;
            return Ok(response);
        }
    }
}
