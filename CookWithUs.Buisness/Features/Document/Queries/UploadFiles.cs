using CookWithUs.Buisness.Models;
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
    public static class UploadFiles
    {
        public class Command : IRequest<List<int>>
        {
            public IFormFileCollection files { get; set; }

            public Command(IFormFileCollection file)
            {
                files = file;
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
        public class Handler : IRequestHandler<Command, List<int>>
        {
            private readonly IDocumentRepository _documentRepository;

            public Handler(IDocumentRepository documentRepository)
            {
                _documentRepository = documentRepository;
            }

            Task<List<int>> IRequestHandler<Command, List<int>>.Handle(Command request, CancellationToken cancellationToken)
            {
                //return Task.FromResult(_restaurant.Get(request.resturantId));

                List<int> uploadedFileIds = new List<int>();

                foreach (var file in request.files)
                {
                    if (file != null && file.Length > 0)
                    {
                        var uploadedFileId = UploadSingleFile(file);
                        uploadedFileIds.Add(uploadedFileId);
                    }
                }

                //return uploadedFileIds;
                return Task.FromResult(uploadedFileIds);
            }
            private int UploadSingleFile(IFormFile file)
            {
                var newFileName = GenerateUniqueFileName(file.FileName);
                var fileModel = new DocumentModel
                {
                    Name = newFileName,
                    FileType = Path.GetExtension(newFileName)
                };
                // Validate file extension
                var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".xlsx", ".pdf" };
                if (!allowedExtensions.Contains(fileModel.FileType.ToLower()))
                {
                    throw new InvalidOperationException("Unsupported file type.");
                }

                // Validate file size
                if (file.Length > 1024 * 1024) // 1 MB
                {
                    throw new InvalidOperationException("File size should not exceed 1MB.");
                }
                using (var memoryStream = new MemoryStream())
                {
                    file.CopyTo(memoryStream);
                    fileModel.DataFiles = memoryStream.ToArray();
                }

                return _documentRepository.FileUpload(fileModel);
            }

            private string GenerateUniqueFileName(string originalFileName)
            {
                var fileExtension = Path.GetExtension(originalFileName);
                return $"{Guid.NewGuid()}{fileExtension}";
            }
        }
    }
}
