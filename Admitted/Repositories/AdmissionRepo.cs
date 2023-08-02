using Admitted.Models;
using Admitted.Utils;

namespace Admitted.Repositories
{
    public class AdmissionRepo : BaseRepo, IAdmissionRepo
    {
        public AdmissionRepo(IConfiguration configuration) : base(configuration) { }





        public Admission GetByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, Reason, HospitalName, RoomNum, RoomPhoneNum, NurseChangeTime, DoctorMeetTime, EstimatedStayDays, StartDateTime, EndDateTime, UserId
                          FROM Admission
                         WHERE UserId = @userId";

                    DbUtils.AddParameter(cmd, "@userId", userId);

                    Admission admission = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        admission = new Admission()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Reason = DbUtils.GetString(reader, "Reason"),
                            HospitalName = DbUtils.GetString(reader, "HospitalName"),
                            RoomNum = DbUtils.GetInt(reader, "RoomNum"),
                            RoomPhoneNum = DbUtils.GetString(reader, "RoomPhoneNum"),
                            NurseChangeTime = DbUtils.GetInt(reader, "NurseChangeTime"),
                            DoctorMeetTime = DbUtils.GetInt(reader, "DoctorMeetTime"),
                            EstimatedStayDays = DbUtils.GetInt(reader, "EstimatedStayDays"),
                            StartDateTime = DbUtils.GetDateTime(reader, "StartDateTime"),
                            EndDateTime = DbUtils.GetDateTime(reader, "EndDateTime"),
                            UserId = DbUtils.GetInt(reader, "UserId")
                        };
                    }
                    reader.Close();

                    return admission;
                }
            }
        }






    }
}