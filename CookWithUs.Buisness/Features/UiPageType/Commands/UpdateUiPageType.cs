﻿//using AutoMapper;
//using FluentValidation;
//using MediatR;
//using Microsoft.AspNetCore.Http;
//using ServcieBooking.Buisness.Interface;
//using ServcieBooking.Buisness.Repository.Interface;

//namespace ServcieBooking.Buisness.Features.UiPageType.Commands
//{
//    public static class UpdateUiPageType
//    {
//        public class Command : IRequest<ServcieBooking.Buisness.Models.UiPageType>
//        {
//            public string Name { get; set; }
//            public int Id { get; set; }
//            public Command(int id,string name)
//            {
//                Id = id;
//                Name = name;
//            }
//        }
//        public class Validator : AbstractValidator<Command>
//        {
//            public Validator()
//            {
//                RuleFor(x => x.Name).NotNull().MinimumLength(3).WithMessage("Name Cannot be Null");
//                RuleFor(x => x.Id).IsInEnum().WithMessage("Id Cannot be Null");
//            }
//        }
//        public class Authorization : IAuthorizationRule<Command>
//        {

//            public Task Authorize(Command request, CancellationToken cancellationToken, IHttpContextAccessor contex)
//            {
//                //Check If This Rquest Is Accessable To User Or Not
//                var user = new { UserId = 10, UserName = "Rajgupta" };
//                var userClaim = new { UserId = 10, ClaimType = "application", Claim = "UpdateUiPageType" };
//                if (userClaim.Claim == "UpdatedUiPageType" && user.UserId == userClaim.UserId)
//                {
//                    return Task.CompletedTask;
//                }
//                return Task.FromException(new UnauthorizedAccessException("You are Unauthorized"));
//            }
//        }
//        public class Handler : IRequestHandler<Command, ServcieBooking.Buisness.Models.UiPageType>
//        {
//            private readonly IUiPageTypeRepository _uiPageTypeRepository;
//            private readonly IMapper _mapper;

//            public Handler(IUiPageTypeRepository uiPageTypeRepository, IMapper mapper)
//            {
//                _uiPageTypeRepository = uiPageTypeRepository;
//                _mapper = mapper;
//            }

//            Task<Models.UiPageType> IRequestHandler<Command, Models.UiPageType>.Handle(Command request, CancellationToken cancellationToken)
//            {
//                var product = _mapper.Map<Models.UiPageType>(request);
//                return Task.FromResult(_uiPageTypeRepository.Create(product));
//            }
//        }
//    }
    
//}
