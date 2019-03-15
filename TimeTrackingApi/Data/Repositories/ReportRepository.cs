using Data.DataContext;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Data.Repositories
{
    public class ReportRepository : IReportRepository
    {
        private readonly TimeTrackingContext _context;
        public ReportRepository(TimeTrackingContext context)
        {
            _context = context;
        }

        public void Add(Report report)
        {
            _context.Add(report);
            _context.SaveChanges();
        }

        public IEnumerable<Report> GetAll()
        {
            return _context.Reports.ToList();
        }

        public Report GetReportById(int id)
        {
            var report = _context.Reports.SingleOrDefault(r => r.Id == id);
            return report;
        }

        public IEnumerable<Report> GetReportsByUserId(int id)
        {
            var reports = _context.Reports.Where(x => x.UserId == id);
            return reports;
        }

        public void Update(Report report)
        {
            _context.Update(report);
            _context.SaveChanges();
        }
    }
}
