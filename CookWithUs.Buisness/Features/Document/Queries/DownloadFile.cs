using CookWithUs.Buisness.Models;
using CookWithUs.Buisness.Repository;
using CookWithUs.Buisness.Repository.Interface;
using CookWithUs.Business.Core.Model;
using MediatR;
using Microsoft.AspNetCore.Http;
using ServcieBooking.Buisness.Interface;
using ServiceBooking.Buisness.Repository.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CookWithUs.Buisness.Features.Document.Queries
{
    public static class DownloadFile
    {
        public class Command : IRequest<DocumentModel>
        {
            public int documentId { get; set; }

            public Command(int id)
            {
                documentId = id;
            }
        }
        public class Authorization : IAuthorizationRule<Command>
        {

            public Task Authorize(Command request, CancellationToken cancellationToken, IHttpContextAccessor contex)
            {
                //Check If This Rquest Is Accessable To User Or Not
                var user = new { UserId = 10, UserName = "Rajgupta" };
                var userClaim = new { UserId = 10, ClaimType = "application", Claim = "GetUiPageType" };
                if (userClaim.Claim == "GetUiPageType" && user.UserId == userClaim.UserId)
                {
                    return Task.CompletedTask;
                }
                return Task.FromException(new UnauthorizedAccessException("You are Unauthorized"));
            }
        }
        public class Handler : IRequestHandler<Command, DocumentModel>
        {
            private readonly IDocumentRepository _documentRepository;

            public Handler(IDocumentRepository documentRepository)
            {
                _documentRepository = documentRepository;
            }

            Task<DocumentModel> IRequestHandler<Command, DocumentModel>.Handle(Command request, CancellationToken cancellationToken)
            {
                return Task.FromResult(_documentRepository.DownloadDocument(request.documentId));
            }
        }
    }
}
