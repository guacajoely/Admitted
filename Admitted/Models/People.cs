namespace Admitted.Models
{
    public class People
    {
        public int Id { get; set; }
        public string StaffName { get; set; }
        public string StaffTitle { get; set; }
        public DateTime MeetDateTime { get; set; }
        public int AdmissionId { get; set; }
    }
}