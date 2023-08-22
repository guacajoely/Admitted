using System.ComponentModel.DataAnnotations;

namespace Admitted.Models
{
    public class Events
    {
        public int Id { get; set; }

        [Required]  
        public DateTime EventDateTime { get; set; }

        [Required]
        public string EventName { get; set; }
        public string? EventType { get; set; }
        public int AdmissionId { get; set; }
    }
}