using System;
using System.Collections.Generic;
using System.Text;
using Domain.Entities;
using Domain.Interfaces;

namespace Domain.Services
{
    public class ReportService : IReportService
    {
        private readonly IReportRepository _reportRepository; 
        public ReportService(IReportRepository reportRepository)
        {
            _reportRepository = reportRepository;
        }
        public void Add(Report report)
        {
            _reportRepository.Add(report);
        }

        public IEnumerable<Report> GetAll()
        {
            return _reportRepository.GetAll();
        }

        public Report GetReportById(int id)
        {
            return _reportRepository.GetReportById(id);
        }

        public IEnumerable<Report> GetReportsByUserId(int id)
        {
            return _reportRepository.GetReportsByUserId(id);
        }

        public void Update(Report report)
        {
            _reportRepository.Update(report);
        }
    }
}
