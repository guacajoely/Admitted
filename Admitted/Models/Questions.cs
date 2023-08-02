namespace Admitted.Models
{
    public class Questions
    {
        public int Id { get; set; }
        public DateTime QuestionDateTime { get; set; }
        public DateTime AnswerDateTime { get; set; }
        public string QuestionText { get; set; }
        public string AnswerText { get; set; }
        public int AdmissionId { get; set; }
    }
}
