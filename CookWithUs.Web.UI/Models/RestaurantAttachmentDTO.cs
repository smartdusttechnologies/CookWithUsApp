namespace CookWithUs.Web.UI.Models
{
    public class RestaurantAttachmentDTO
    {
        // Identifier for the leave request to which files are attached.
        public int RestaurantID { get; set; }

        // Identifier for the attached document/file.
        public int DocumentID { get; set; }
    }
}
