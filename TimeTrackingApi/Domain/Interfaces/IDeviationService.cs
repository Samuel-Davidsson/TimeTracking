using Domain.Entities;
using System.Collections.Generic;

namespace Domain.Services
{
    public interface IDeviationService
    {
        void Add(Deviation deviation);
        void Update(Deviation deviation);
        void Remove(Deviation deviation);
        IEnumerable<Deviation> GetAll();
        IEnumerable<Deviation> GetDeviationsByReportId(int id);
    }
}