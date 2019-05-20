using Domain.Entities;
using TimeTrackingApi.Viewmodels;

namespace TimeTrackingApi.Services
{
    public class MailAdressCheck
    {
        public bool MailAdressExist(User[] users, UserViewmodel userViewmodel)
        {
            for (int i = 0; i < users.Length; i++)
            {
                if (users[i].Login.ToLower() == userViewmodel.Login.ToLower())
                {
                    return true;
                }
            }
            return false;
        }
        public bool MailAdressMatches(User user, UserViewmodel userViewmodel)
        {
            if (user.Login.ToLower() == userViewmodel.Login.ToLower())
            {
                return true;
            }
            return false;
        }
    }
}
