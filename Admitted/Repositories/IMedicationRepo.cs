using Admitted.Models;

namespace Admitted.Repositories
{
    public interface IMedicationRepo
    {
        List<Medication> GetAllByAdmissionId(int admissionId);
        void Add(Medication medication);
        void Update(Medication medication); 
        void Delete(int id);
    }
}
