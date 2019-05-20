using Domain.Entities;
using TimeTrackingApi.Viewmodels;

namespace TimeTrackingApi.Services
{
    public class MailAddressCheck
    {
        public bool CheckMailAddress(User user, UserViewmodel userViewmodel)
        {
            if (user.Login.ToLower() == userViewmodel.Login.ToLower())
            {
                return true;
            }
            return false;
        }
    }
}
