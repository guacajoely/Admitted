using Admitted.Models;

namespace Admitted.Repositories
{
    public interface IEventsRepo
    {
        List<Events> GetAll();
        List<Events> GetAllByAdmissionId(int admissionId);
        Events GetEventById(int id);
        void Add(Events events);
        void Update(Events events); 
        void Delete(int id); 
    }
}
