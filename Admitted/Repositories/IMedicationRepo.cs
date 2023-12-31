﻿using Admitted.Models;

namespace Admitted.Repositories
{
    public interface IMedicationRepo
    {
        List<Medication> GetAll();
        List<Medication> GetAllByAdmissionId(int admissionId);
        Medication GetMedById(int id);
        void Add(Medication medication);
        void Update(Medication medication); 
        void Delete(int id);
    }
}
