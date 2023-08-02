using System.ComponentModel.DataAnnotations;

namespace Admitted.Models
{
    public class Medication
    {
        public int Id { get; set; }
        [Required]
        public string MedicationName { get; set; }
        public string? Purpose { get; set; }
        public int? FrequencyHours { get; set; }
        public DateTime PrescribeDateTime { get; set; }
        public int AdmissionId { get; set; }
    }
}