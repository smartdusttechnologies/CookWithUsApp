using Microsoft.AspNetCore.Mvc;
using CookWithUs.Business.Common;
using MediatR;
using CookWithUs.Buisness.Features.Document.Queries;
using CookWithUs.Business.Core.Model;

namespace CookWithUs.Web.UI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DocumentController : ControllerBase
    {
        private readonly IMediator _mediator;

        public DocumentController(IMediator mediator)
        {
            _mediator = mediator;
        }

        /// <summary>
        /// Method To Upload Document 
        /// </summary>
        [HttpPost]
        [Route("FileUpload")]
        public IActionResult FileUpload()
        {
            var uploadedFileIds = _mediator.Send(new UploadFiles.Command(Request.Form.Files)).Result;
            return Ok(uploadedFileIds);
        }

        /// <summary>
        /// Method To download Document 
        /// </summary>
        [HttpGet]
        [Route("DownloadDocument/{documentID}")]
        public IActionResult DownloadDocument(int documentID)
        {
            DocumentModel attachment = _mediator.Send(new DownloadFile.Command(documentID)).Result;

            if (attachment != null)
            {
                return File(new MemoryStream(attachment.DataFiles), Helpers.GetMimeTypes()[attachment.FileType], attachment.Name);
            }
            return Ok("Can't find the Document");
        }
    }
}
