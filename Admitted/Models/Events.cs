namespace Admitted.Models
{
    public class Events
    {
        public int Id { get; set; }
        public DateTime EventDateTime { get; set; }
        public string EventName { get; set; }
        public string EventType { get; set; }
        public int AdmissionId { get; set; }
    }
}