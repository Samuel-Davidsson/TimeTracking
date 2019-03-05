using System;
using System.Collections.Generic;

namespace Domain.Entities
{
    public class Report
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public bool Accepted { get; set; }
        public bool Attest { get; set; }
        public DateTime Date { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }

        public ICollection<Deviation> DeviationItems { get; set; }
    }
}
