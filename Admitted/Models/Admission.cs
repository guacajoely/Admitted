using System.ComponentModel.DataAnnotations;

namespace Admitted.Models
{
    public class Admission
    {
        public int Id { get; set; }
        public string Reason { get; set; }
        public string HospitalName { get; set; }
        public int RoomNum { get; set; }
        public string RoomPhoneNum { get; set; }
        public int NurseChangeTime { get; set; }
        public int DoctorMeetTime { get; set; }
        public int EstimatedStayDays { get; set; }
        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
        public int UserId { get; set; }

    }
}
