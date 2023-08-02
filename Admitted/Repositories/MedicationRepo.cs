using Admitted.Models;
using Admitted.Utils;
using Microsoft.Data.SqlClient;

namespace Admitted.Repositories
{
    public class MedicationRepo : BaseRepo, IMedicationRepo
    {
        public MedicationRepo(IConfiguration configuration) : base(configuration) { }


        private Medication NewMedFromReader(SqlDataReader reader)
        {
            return new Medication()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                MedicationName = DbUtils.GetString(reader, "MedicationName"),
                Purpose = DbUtils.GetNullableString(reader, "Purpose"),
                FrequencyHours = DbUtils.GetNullableInt(reader, "FrequencyHours"),
                PrescribeDateTime = DbUtils.GetDateTime(reader, "PrescribeDateTime"),
                AdmissionId = DbUtils.GetInt(reader, "AdmissionId")
            };
        }


        public List<Medication> GetAllByAdmissionId(int admissionId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, MedicationName, Purpose, FrequencyHours, PrescribeDateTime, AdmissionId
                         FROM Medication
                         WHERE AdmissionId = @admissionId";

                    DbUtils.AddParameter(cmd, "@admissionId", admissionId);

                    var listOfMeds = new List<Medication>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        listOfMeds.Add(NewMedFromReader(reader));
                    }
                    reader.Close();

                    return listOfMeds;
                }
            }
        }


        public void Add(Medication medication)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Medication (
                            MedicationName, Purpose, FrequencyHours, PrescribeDateTime, AdmissionId )
                        OUTPUT INSERTED.ID
                        VALUES (
                            @MedicationName, @Purpose, @FrequencyHours, @PrescribeDateTime, @AdmissionId )";
                    cmd.Parameters.AddWithValue("@MedicationName", medication.MedicationName);
                    cmd.Parameters.AddWithValue("@Purpose", DbUtils.ValueOrDBNull(medication.Purpose));
                    cmd.Parameters.AddWithValue("@FrequencyHours", DbUtils.ValueOrDBNull(medication.FrequencyHours));
                    cmd.Parameters.AddWithValue("@PrescribeDateTime", medication.PrescribeDateTime);
                    cmd.Parameters.AddWithValue("@AdmissionId", medication.AdmissionId);

                    medication.Id = (int)cmd.ExecuteScalar();
                }
            }
        }


        public void Update(Medication medication)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Medication
                        SET
                            [MedicationName] = @MedicationName,
                            [Purpose] = @Purpose,
                            [FrequencyHours] = @FrequencyHours
                        WHERE Id = @Id
                        ";
                    cmd.Parameters.AddWithValue("@Id", medication.Id);
                    cmd.Parameters.AddWithValue("@MedicationName", medication.MedicationName);
                    cmd.Parameters.AddWithValue("@Purpose", DbUtils.ValueOrDBNull(medication.Purpose));
                    cmd.Parameters.AddWithValue("@FrequencyHours", DbUtils.ValueOrDBNull(medication.FrequencyHours));

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
                        @"DELETE FROM Medication
                            WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }



    }
}
