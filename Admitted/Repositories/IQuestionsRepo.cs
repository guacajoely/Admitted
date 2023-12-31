﻿using Admitted.Models;

namespace Admitted.Repositories
{
    public interface IQuestionsRepo
    {
        List<Questions> GetAll();
        List<Questions> GetAllByAdmissionId(int admissionId);
        Questions GetQuestionById(int id);
        void Add(Questions question);   
        void Update(Questions question);
        void Delete(int id);
    }
}
