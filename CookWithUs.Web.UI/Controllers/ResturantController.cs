﻿using AutoMapper;
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
        private readonly IResturantRepository _restaurant;
        private readonly IMapper _mapper;


        public ResturantController(IMediator mediator,IResturantRepository restaurant, IMapper mapper)
        {
            _mediator = mediator;
            _restaurant = restaurant;
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
    }
}
