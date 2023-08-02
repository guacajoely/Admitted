namespace Admitted.Models
{
    public class MedicationDose
    {
        public int Id { get; set; }
        public DateTime DoseDateTime { get; set; }
        public int MedicationId { get; set; }
    }
}
