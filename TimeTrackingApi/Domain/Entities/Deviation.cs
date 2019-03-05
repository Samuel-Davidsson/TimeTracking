using System;

namespace Domain.Entities
{
    public class Deviation
    {
        public int ReportId { get; set; }
        Report Report { get; set; }
        public int Id { get; set; }
        public decimal Hours { get; set; }
        public DateTime AbsenceDate { get; set; }
        public string Description { get; set; }
    }
}
