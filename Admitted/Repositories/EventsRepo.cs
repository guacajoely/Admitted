using Admitted.Models;
using Admitted.Utils;
using Microsoft.Data.SqlClient;

namespace Admitted.Repositories
{
    public class EventsRepo : BaseRepo, IEventsRepo
    {
        public EventsRepo(IConfiguration configuration) : base(configuration) { }


        private Events NewEventFromReader(SqlDataReader reader)
        {
            return new Events()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                EventDateTime = DbUtils.GetDateTime(reader, "EventDateTime"),
                EventName = DbUtils.GetString(reader, "EventName"),
                EventType = DbUtils.GetNullableString(reader, "EventType"),
                AdmissionId = DbUtils.GetInt(reader, "AdmissionId")
            };
        }


        public List<Events> GetAllByAdmissionId(int admissionId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, EventDateTime, EventName, EventType, AdmissionId
                         FROM Events
                         WHERE AdmissionId = @admissionId";

                    DbUtils.AddParameter(cmd, "@admissionId", admissionId);

                    var listOfEvents = new List<Events>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        listOfEvents.Add(NewEventFromReader(reader));
                    }
                    reader.Close();

                    return listOfEvents;
                }
            }
        }


        public void Add(Events events)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Events (
                            EventDateTime, EventName, EventType, AdmissionId )
                        OUTPUT INSERTED.ID
                        VALUES (
                            @EventDateTime, @EventName, @EventType, @AdmissionId )";
                    cmd.Parameters.AddWithValue("@EventDateTime", events.EventDateTime);
                    cmd.Parameters.AddWithValue("@EventName", events.EventName);
                    cmd.Parameters.AddWithValue("@EventType", DbUtils.ValueOrDBNull(events.EventType));
                    cmd.Parameters.AddWithValue("@AdmissionId", events.AdmissionId);

                    events.Id = (int)cmd.ExecuteScalar();
                }
            }
        }


        public void Update(Events events)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Events
                        SET
                            [EventDateTime] = @EventDateTime,
                            [EventName] = @EventName,
                            [EventType] = @EventType
                        WHERE Id = @Id
                        ";
                    cmd.Parameters.AddWithValue("@Id", events.Id);
                    cmd.Parameters.AddWithValue("@EventDateTime", events.EventDateTime);
                    cmd.Parameters.AddWithValue("@EventName", events.EventName);
                    cmd.Parameters.AddWithValue("@EventType", DbUtils.ValueOrDBNull(events.EventType));

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
                        @"DELETE FROM Events
                            WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }



    }
}