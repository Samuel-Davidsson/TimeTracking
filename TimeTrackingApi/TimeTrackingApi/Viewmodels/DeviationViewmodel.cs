using System;

namespace TimeTrackingApi.Viewmodels
{
    public class DeviationViewmodel
    {
        public int Id { get; set; }
        public int ReportId { get; set; }
        public DateTime AbsenceDate { get; set; }
        public decimal Hours { get; set; }
        public string Description { get; set; }
        public bool Attest { get; set; }
    }
}
