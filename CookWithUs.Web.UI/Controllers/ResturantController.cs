using MediatR;
using Microsoft.AspNetCore.Mvc;
using ServcieBooking.Buisness.Features.Resturant;

namespace ServiceBooking.Web.UI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ResturantController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ResturantController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [Route("Get")]
        [HttpGet]
        public object Get()
        {
            var resp = _mediator.Send(new GetResturant.Command());
            return resp;
        }
        [Route("GetById")]
        [HttpGet]
        public object Get(string resturantId)
        {
            return _mediator.Send(new GetByIdResturant.Command().resturantId = resturantId);
        }
    }
}
