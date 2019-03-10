using Data.DataContext;
using Domain.Entities;
using Domain.Services;
using System.Collections.Generic;
using System.Linq;

namespace Data.Repositories
{
    public class DeviationRepository : IDeviationRepository
    {
        private readonly TimeTrackingContext _context;
        public DeviationRepository(TimeTrackingContext context)
        {
            _context = context;
        }
        public void Add(Deviation deviation)
        {
            _context.Add(deviation);
            _context.SaveChanges();
        }

        public IEnumerable<Deviation> GetAll()
        {
            return _context.Deviations.ToList();
        }

        public IEnumerable<Deviation> GetDeviationsByReportId(int id)
        {
            var deviations = _context.Deviations.Where(x => x.ReportId == id);
            return deviations;
        }

        public void Update(Deviation deviation)
        {
            _context.Update(deviation);
            _context.SaveChanges();
        }
    }
}
