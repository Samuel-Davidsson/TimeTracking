using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TimeTrackingApi.Viewmodels
{
    public class UserHistoryViewmodel
    {
        public int Id { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public ICollection<Report> Reports { get; set; }
        public Report report { get; set; }
    }
}
