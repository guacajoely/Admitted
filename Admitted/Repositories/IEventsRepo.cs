using Admitted.Models;

namespace Admitted.Repositories
{
    public interface IEventsRepo
    {
        List<Events> GetAll();
        List<Events> GetAllByAdmissionId(int admissionId);
        void Add(Events events);
        void Update(Events events); 
        void Delete(int id); 
    }
}
