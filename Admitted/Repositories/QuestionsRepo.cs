using Admitted.Models;
using Admitted.Utils;
using Microsoft.Data.SqlClient;

namespace Admitted.Repositories
{
    public class QuestionsRepo : BaseRepo, IQuestionsRepo
    {
        public QuestionsRepo(IConfiguration configuration) : base(configuration) { }


        private Questions NewQuestionFromReader(SqlDataReader reader)
        {
            return new Questions()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                QuestionDateTime = DbUtils.GetDateTime(reader, "QuestionDateTime"),
                AnswerDateTime = DbUtils.GetNullableDateTime(reader,"AnswerDateTime"),
                QuestionText = DbUtils.GetString(reader, "QuestionText"),
                AnswerText = DbUtils.GetNullableString(reader, "AnswerText"),
                AdmissionId = DbUtils.GetInt(reader, "AdmissionId")
            };
        }


        public List<Questions> GetAllByAdmissionId(int admissionId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, QuestionDateTime, AnswerDateTime, QuestionText, AnswerText, AdmissionId
                         FROM Questions
                         WHERE AdmissionId = @admissionId";

                    DbUtils.AddParameter(cmd, "@admissionId", admissionId);

                    var listOfQuestions = new List<Questions>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        listOfQuestions.Add(NewQuestionFromReader(reader));
                    }
                    reader.Close();

                    return listOfQuestions;
                }
            }
        }


        public void Add(Questions question)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Questions (
                            QuestionDateTime, AnswerDateTime, QuestionText, AnswerText, AdmissionId )
                        OUTPUT INSERTED.ID
                        VALUES (
                            @QuestionDateTime, @AnswerDateTime, @QuestionText, @AnswerText, @AdmissionId )";
                    cmd.Parameters.AddWithValue("@QuestionDateTime", question.QuestionDateTime);
                    cmd.Parameters.AddWithValue("@AnswerDateTime", DbUtils.ValueOrDBNull(question.AnswerDateTime));
                    cmd.Parameters.AddWithValue("@QuestionText", question.QuestionText);
                    cmd.Parameters.AddWithValue("@AnswerText", DbUtils.ValueOrDBNull(question.AnswerText));
                    cmd.Parameters.AddWithValue("@AdmissionId", question.AdmissionId);

                    question.Id = (int)cmd.ExecuteScalar();
                }
            }
        }


        public void Update(Questions question)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Questions
                        SET
                            [QuestionDateTime] = @QuestionDateTime,
                            [AnswerDateTime] = @AnswerDateTime,
                            [QuestionText] = @QuestionText,
                            [AnswerText] = @AnswerText
                        WHERE Id = @Id
                        ";
                    cmd.Parameters.AddWithValue("@Id", question.Id);
                    cmd.Parameters.AddWithValue("@QuestionDateTime", question.QuestionDateTime);
                    cmd.Parameters.AddWithValue("@AnswerDateTime", DbUtils.ValueOrDBNull(question.AnswerDateTime));
                    cmd.Parameters.AddWithValue("@QuestionText", question.QuestionText);
                    cmd.Parameters.AddWithValue("@AnswerText", DbUtils.ValueOrDBNull(question.AnswerText));

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
                        @"DELETE FROM Questions
                            WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }



    }
}
