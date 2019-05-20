using Domain.Entities;
using Domain.Services;
using TimeTrackingApi.Viewmodels;

namespace TimeTrackingApi.Services
{
    public class PasswordCheck
    {
        public bool CheckPassword(User user, UserViewmodel userViewmodel, HashPassword _hashPassword)
        {
            if (_hashPassword.Verify(userViewmodel.Password, user.Password))
            {
                return true;
            }
            return false;
        }
    }
}
