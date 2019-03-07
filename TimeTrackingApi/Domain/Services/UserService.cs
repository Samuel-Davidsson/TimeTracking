using Domain.Entities;
using Domain.Interfaces;
using System.Collections.Generic;


namespace Domain.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public IEnumerable<User> GetAll()
        {
            return _userRepository.GetAll();
        }

        public User GetTimereportUserById(int id)
        {
            throw new System.NotImplementedException();
        }

        public User GetUserById(int id)
        {
            return _userRepository.GetUserById(id);
        }
    }
}
