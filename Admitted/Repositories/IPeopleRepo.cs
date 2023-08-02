using Admitted.Models;

namespace Admitted.Repositories
{
    public interface IPeopleRepo
    {
        List<People> GetAllByAdmissionId(int admissionId);
        void Add(People person);
        void Update(People person);
        void Delete(int id);
    }
}
