using CookWithUs.Business.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CookWithUs.Buisness.Repository.Interface
{
    public interface IDocumentRepository
    {
        /// <summary>
        /// Method To Upload Document 
        /// </summary>
        int FileUpload(DocumentModel File);

        /// <summary>
        /// Method To download Document 
        /// </summary>
        DocumentModel DownloadDocument(int documentID);
    }
}
