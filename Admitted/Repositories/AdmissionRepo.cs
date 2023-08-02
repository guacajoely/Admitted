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
                RoomNum = DbUtils.GetInt(reader, "RoomNum"),
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



        public void Add(Admission admission)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Admission (
                            Reason, HospitalName, RoomNum, RoomPhoneNum, NurseChangeTime, DoctorMeetTime, EstimatedStayDays, StartDateTime, EndDateTime, UserId )
                        OUTPUT INSERTED.ID
                        VALUES (
                            @Reason, @HospitalName, @RoomNum, @RoomPhoneNum, @NurseChangeTime,
                            @DoctorMeetTime, @EstimatedStayDays, @StartDateTime, @EndDateTime, @UserId )";
                    cmd.Parameters.AddWithValue("@Reason", admission.Reason);
                    cmd.Parameters.AddWithValue("@HospitalName", admission.HospitalName);
                    cmd.Parameters.AddWithValue("@RoomNum", admission.RoomNum);
                    cmd.Parameters.AddWithValue("@RoomPhoneNum", DbUtils.ValueOrDBNull(admission.RoomPhoneNum));
                    cmd.Parameters.AddWithValue("@NurseChangeTime", DbUtils.ValueOrDBNull(admission.NurseChangeTime));
                    cmd.Parameters.AddWithValue("@DoctorMeetTime", DbUtils.ValueOrDBNull(admission.DoctorMeetTime));
                    cmd.Parameters.AddWithValue("@EstimatedStayDays", DbUtils.ValueOrDBNull(admission.EstimatedStayDays));
                    cmd.Parameters.AddWithValue("@StartDateTime", admission.StartDateTime);
                    cmd.Parameters.AddWithValue("@EndDateTime", DbUtils.ValueOrDBNull(admission.EndDateTime));
                    cmd.Parameters.AddWithValue("@UserId", admission.UserId);

                    admission.Id = (int)cmd.ExecuteScalar();
                }
            }
        }





    }
}