using Admitted.Models;
using Admitted.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Hosting;

namespace Admitted.Repositories
{
    public class AdmissionRepo : BaseRepo, IAdmissionRepo
    {
        public AdmissionRepo(IConfiguration configuration) : base(configuration) { }


        private Admission NewAdmissionFromReader(SqlDataReader reader)
        {
            return new Admission()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Reason = DbUtils.GetString(reader, "Reason"),
                HospitalName = DbUtils.GetString(reader, "HospitalName"),
                RoomNum = DbUtils.GetNullableInt(reader, "RoomNum"),
                RoomPhoneNum = DbUtils.GetString(reader, "RoomPhoneNum"),
                NurseChangeTime = DbUtils.GetNullableInt(reader, "NurseChangeTime"),
                DoctorMeetTime = DbUtils.GetNullableInt(reader, "DoctorMeetTime"),
                EstimatedStayDays = DbUtils.GetNullableInt(reader, "EstimatedStayDays"),
                StartDateTime = DbUtils.GetDateTime(reader, "StartDateTime"),
                EndDateTime = DbUtils.GetNullableDateTime(reader, "EndDateTime"),
                UserId = DbUtils.GetInt(reader, "UserId")
            };
        }


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
                        admission = NewAdmissionFromReader(reader);
                    }

                    reader.Close();

                    return admission;
                }
            }
        }






    }
}