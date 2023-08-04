using Admitted.Models;

namespace Admitted.Repositories
{
    public interface IAdmissionRepo
    {
        List<Admission> GetAll();
        Admission GetByUserId(int userId);
        void Add(Admission admission);
        void Update(Admission admission);
        void Delete(int id);
    }
}
