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


        public ResturantController(IMediator mediator,IResturantRepository restaurant)
        {
            _mediator = mediator;
            _restaurant = restaurant;
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
            //var restaurantDetailsmodel = _mapper.Map<RegisterRestaurantDTO, RegisterRestaurantModel>(restaurantDetails);
            var restaurantModel = new RegisterRestaurantModel();
            var response = _mediator.Send(new RegisterRestaurant.Command(restaurantModel)).Result;
            return Ok(response);
        }
    }
}
