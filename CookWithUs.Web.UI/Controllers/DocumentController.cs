using Microsoft.AspNetCore.Mvc;
using CookWithUs.Business.Common;
using MediatR;

namespace CookWithUs.Web.UI.Controllers
{
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
            //var uploadedFileIds = _documentService.UploadFiles(Request.Form.Files);
            return Ok();
        }

        /// <summary>
        /// Method To download Document 
        /// </summary>
        [HttpGet]
        [Route("DownloadDocument/{documentID}")]
        public IActionResult DownloadDocument(int documentID)
        {

            //DocumentModel attachment = _documentService.DownloadDocument(documentID);

            //if (attachment != null)
            //{
            //    return File(new MemoryStream(attachment.DataFiles), Helpers.GetMimeTypes()[attachment.FileType], attachment.Name);
            //}
            return Ok("Can't find the Document");
        }
    }
}
