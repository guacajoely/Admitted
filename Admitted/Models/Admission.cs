using System.ComponentModel.DataAnnotations;

namespace Admitted.Models
{
    public class Admission
    {
        public int Id { get; set; }

        [Required]
        public string Reason { get; set; }

        [Required]
        public string HospitalName { get; set; }

        [Required]
        public int RoomNum { get; set; }

        public string? RoomPhoneNum { get; set; }
        public string? NurseChangeTime { get; set; }
        public string? DoctorMeetTime { get; set; }
        public int? EstimatedStayDays { get; set; }

        [Required]
        public DateTime StartDateTime { get; set; }
        public DateTime? EndDateTime { get; set; }

        [Required]
        public int UserId { get; set; }
    }
}