using Domain.Entities;
using System.Collections.Generic;

namespace Domain.Interfaces
{
    public interface IUserService
    {
        User GetTimereportUserById(int id);
        IEnumerable<User> GetAll();
    }
}
