using Admitted.Models;

namespace Admitted.Repositories
{
    public interface IMedDoseRepo
    {
        List<MedicationDose> GetAll();
        List<MedicationDose> GetAllByMedId(int medId);
        MedicationDose GetDoseById(int id);
        void Add(MedicationDose dose);
        void Update(MedicationDose dose);   
        void Delete(int id);
    }
}
