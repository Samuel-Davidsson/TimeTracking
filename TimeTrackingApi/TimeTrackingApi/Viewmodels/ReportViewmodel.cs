using Domain.Entities;
using System;
using System.Collections.Generic;

namespace TimeTrackingApi.Viewmodels
{
    public class ReportViewmodel
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int UserId { get; set; }
        public bool Accepted { get; set; }
        public bool Attest { get; set; }
        public DateTime Date { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public string CurrentMonth { get; set; }
        public ICollection<Deviation> DeviationItems { get; set; }
    }
}
