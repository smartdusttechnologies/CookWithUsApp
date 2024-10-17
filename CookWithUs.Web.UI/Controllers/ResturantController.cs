using AutoMapper;
using CookWithUs.Buisness.Features.Resturant.Queries;
using CookWithUs.Buisness.Models;
using CookWithUs.Web.UI.Models;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ServcieBooking.Buisness.Features.Resturant;
using ServiceBooking.Buisness.Repository.Interface;

namespace ServiceBooking.Web.UI.Controllers
{
    [Authorize]
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

        [Route("GetByUserID/{userId}")]
        [HttpGet]
        public IActionResult GetByUserID(int userId)
        {
            var response = _mediator.Send(new GetRestaurantByUserID.Command(userId)).Result;
            return Ok(response);
        }
        
        [Route("SetOrderStatus")]
        [HttpPost]
        public IActionResult SetOrderStatus(SetOrderStatusDTO details)
        {
            var detailsModel = _mapper.Map<SetOrderStatusDTO, SetOrderStatusModel>(details);
            var response = _mediator.Send(new SetOrderStatus.Command(detailsModel)).Result;
            return Ok(response);
        }


        [Route("AddMenuCategory")]
        [HttpPost]
        public IActionResult AddMenuCategory(MenuCategoryDTO MenuCategoryDTO)
        {
            var menuCategoryDetails = _mapper.Map<MenuCategoryDTO, MenuCategory>(MenuCategoryDTO);
            var response = _mediator.Send(new CreateMenuCategory.Command(menuCategoryDetails)).Result;
            return Ok(response);
        }
        [Route("UpdateMenuCategory")]
        [HttpPost]
        public IActionResult UpdateMenuCategory(MenuCategoryDTO MenuCategoryDTO)
        {
            var menuCategoryDetails = _mapper.Map<MenuCategoryDTO, MenuCategory>(MenuCategoryDTO);
            var response = _mediator.Send(new UpdateMenuCategory.Command(menuCategoryDetails)).Result;
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
        public IActionResult UpdateMenu(MenuDTO menuDTO)
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

        public IActionResult PlaceOrder(OrderDTO requestBody)
        {
            var orderModel = _mapper.Map<OrderDTO, OrderModel>(requestBody);
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
        [Route("getOrderByRestaurantID/{restaurantId}")]
        [HttpGet]
        public IActionResult getOrderByRestaurantID(int restaurantId)
        {
            var response = _mediator.Send(new getOrderByRestaurantID.Command(restaurantId)).Result;
            return Ok(response);
        }
        [Route("GetOrderDetails/{orderId}")]
        [HttpGet]
        public IActionResult GetOrderDetails(int orderId)
        {
            var response = _mediator.Send(new GetOrderDetails.Command(orderId)).Result;
            return Ok(response);
        }

        [Route("GetRestaurantByEmail/{email}")]
        [HttpGet]
        public IActionResult GetRestaurantByEmail(string email)
        {
            var response = _mediator.Send(new GetRestaurantByEmail.Command(email)).Result;
            return Ok(response);
        }


    }
}
