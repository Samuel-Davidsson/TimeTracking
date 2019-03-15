using System;

namespace TimeTrackingApi.Viewmodels
{
    public class UserViewmodel
    {
        public int Id { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Department { get; set; }
        public bool Attest { get; set; }
        public bool IsAdmin { get; set; }
        public string Token { get; set; }
        public DateTime ExpirationTime { get; set; }
    }
}
