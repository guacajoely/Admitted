using Admitted.Models;

namespace Admitted.Repositories
{
    public interface IPeopleRepo
    {
        List<People> GetAll();
        List<People> GetAllByAdmissionId(int admissionId);
        People GetPersonById(int id);
        void Add(People person);
        void Update(People person);
        void Delete(int id);
    }
}
