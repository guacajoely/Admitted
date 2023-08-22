using Admitted.Models;
using Admitted.Utils;
using Microsoft.Data.SqlClient;

namespace Admitted.Repositories
{
    public class MedDoseRepo : BaseRepo, IMedDoseRepo
    {
        public MedDoseRepo(IConfiguration configuration) : base(configuration) { }


        private MedicationDose NewDoseFromReader(SqlDataReader reader)
        {
            return new MedicationDose()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                DoseDateTime = DbUtils.GetDateTime(reader, "DoseDateTime"),
                MedicationId = DbUtils.GetInt(reader, "MedicationId")
            };
        }


        public List<MedicationDose> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, DoseDateTime, MedicationId
                         FROM MedicationDose
                         ORDER BY DoseDateTime";

                    var listOfDoses = new List<MedicationDose>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        listOfDoses.Add(NewDoseFromReader(reader));
                    }
                    reader.Close();

                    return listOfDoses;
                }
            }
        }

        public List<MedicationDose> GetAllByMedId(int medId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, DoseDateTime, MedicationId
                         FROM MedicationDose
                         WHERE MedicationId = @MedicationId
                         ORDER BY DoseDateTime";

                    DbUtils.AddParameter(cmd, "@MedicationId", medId);

                    var listOfDoses = new List<MedicationDose>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        listOfDoses.Add(NewDoseFromReader(reader));
                    }
                    reader.Close();

                    return listOfDoses;
                }
            }
        }


        public void Add(MedicationDose dose)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO MedicationDose (
                            DoseDateTime, MedicationId )
                        OUTPUT INSERTED.ID
                        VALUES (
                            @DoseDateTime, @MedicationId )";
                    cmd.Parameters.AddWithValue("@DoseDateTime", dose.DoseDateTime);
                    cmd.Parameters.AddWithValue("@MedicationId", dose.MedicationId);

                    dose.Id = (int)cmd.ExecuteScalar();
                }
            }
        }


        public void Update(MedicationDose dose)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE MedicationDose
                        SET
                            [DoseDateTime] = @DoseDateTime,
                            [MedicationId] = @MedicationId
                        WHERE Id = @Id
                        ";
                    cmd.Parameters.AddWithValue("@Id", dose.Id);
                    cmd.Parameters.AddWithValue("@DoseDateTime", dose.DoseDateTime);
                    cmd.Parameters.AddWithValue("@MedicationId", dose.MedicationId);

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
                        @"DELETE FROM MedicationDose
                            WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }


        public MedicationDose GetDoseById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, DoseDateTime, MedicationId
                         FROM MedicationDose
                         WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    MedicationDose dose = null;

                    if (reader.Read())
                    {
                        dose = NewDoseFromReader(reader);
                    }

                    reader.Close();

                    return dose;
                }
            }
        }



    }
}
