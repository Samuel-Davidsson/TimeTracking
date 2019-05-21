using Domain.Entities;
using System.Collections.Generic;

namespace Domain.Interfaces
{
    public interface IUserService
    {
        IEnumerable<User> GetAll();
        User GetUserById(int id);
        User GetUserByLogin(string login);
        void Add(User user);
        void Update(User user);
    }
}
