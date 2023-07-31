using Admitted.Models;

namespace Admitted.Repositories
{
    public interface IUserRepo
    {
        User GetByEmail(string email);
        void Add(User user);
    }
}
