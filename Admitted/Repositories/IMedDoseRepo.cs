using Admitted.Models;

namespace Admitted.Repositories
{
    public interface IMedDoseRepo
    {
        List<MedicationDose> GetAll();
        List<MedicationDose> GetAllByMedId(int medId);
        void Add(MedicationDose dose);
        void Update(MedicationDose dose);   
        void Delete(int id);
    }
}
