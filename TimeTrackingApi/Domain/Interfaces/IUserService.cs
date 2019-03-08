using Domain.Entities;
using System.Collections.Generic;

namespace Domain.Interfaces
{
    public interface IUserService
    {
        IEnumerable<User> GetAll();
        void Add(User user);
        void Update(User user);
    }
}
