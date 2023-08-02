using Admitted.Models;
using Admitted.Utils;
using Microsoft.Data.SqlClient;

namespace Admitted.Repositories
{
    public class PeopleRepo : BaseRepo, IPeopleRepo
    {
        public PeopleRepo(IConfiguration configuration) : base(configuration) { }


        private People NewPersonFromReader(SqlDataReader reader)
        {
            return new People()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                StaffName = DbUtils.GetString(reader, "StaffName"),
                StaffTitle = DbUtils.GetNullableString(reader, "StaffTitle"),
                MeetDateTime = DbUtils.GetDateTime(reader, "MeetDateTime"),
                AdmissionId = DbUtils.GetInt(reader, "AdmissionId")
            };
        }


        public List<People> GetAllByAdmissionId(int admissionId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, StaffName, StaffTitle, MeetDateTime, AdmissionId
                         FROM People
                         WHERE AdmissionId = @admissionId";

                    DbUtils.AddParameter(cmd, "@admissionId", admissionId);

                    var listOfPeople = new List<People>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        listOfPeople.Add(NewPersonFromReader(reader));
                    }
                    reader.Close();

                    return listOfPeople;
                }
            }
        }


        public void Add(People person)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO People (
                            StaffName, StaffTitle, MeetDateTime, AdmissionId )
                        OUTPUT INSERTED.ID
                        VALUES (
                            @StaffName, @StaffTitle, @MeetDateTime, @AdmissionId )";
                    cmd.Parameters.AddWithValue("@StaffName", person.StaffName);
                    cmd.Parameters.AddWithValue("@StaffTitle", DbUtils.ValueOrDBNull(person.StaffTitle));
                    cmd.Parameters.AddWithValue("@MeetDateTime", person.MeetDateTime);
                    cmd.Parameters.AddWithValue("@AdmissionId", person.AdmissionId);

                    person.Id = (int)cmd.ExecuteScalar();
                }
            }
        }


        public void Update(People person)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE People
                        SET
                            [StaffName] = @StaffName,
                            [StaffTitle] = @StaffTitle
                        WHERE Id = @Id
                        ";
                    cmd.Parameters.AddWithValue("@Id", person.Id);
                    cmd.Parameters.AddWithValue("@StaffName", person.StaffName);
                    cmd.Parameters.AddWithValue("@StaffTitle", DbUtils.ValueOrDBNull(person.StaffTitle));

                    cmd.ExecuteNonQuery();
                }
            }
        }


        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText =
                        @"DELETE FROM People
                            WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }



    }
}
