using Domain.Entities;
using System.Collections.Generic;

namespace Domain.Interfaces
{
    public interface IReportRepository
    {
        void Add(Report report);
        void Update(Report report);
        Report GetReportById(int id);
        IEnumerable<Report> GetAll();
        IEnumerable<Report> GetReportsByUserId(int id);
    }
}