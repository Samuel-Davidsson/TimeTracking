using Domain.Entities;
using System.Collections.Generic;

namespace Domain.Interfaces
{
    public interface IUserRepository
    {
        IEnumerable<User> GetAll();
        User GetUserById(int id);
        void Add(User user);
        void Update(User user);
    }
}