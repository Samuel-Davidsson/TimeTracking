using Domain.Entities;
using System.Collections.Generic;

namespace Domain.Services
{
    public interface IReportService
    {
        void Add(Report report);
        void Update(Report report);
        Report GetReportById(int id);
        IEnumerable<Report> GetAll();
        IEnumerable<Report> GetReportsByUserId(int id);
    }
}