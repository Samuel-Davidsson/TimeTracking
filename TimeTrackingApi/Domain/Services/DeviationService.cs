using System.Collections.Generic;
using Domain.Entities;

namespace Domain.Services
{
    public class DeviationService : IDeviationService
    {
        private readonly IDeviationRepository _deviationRepository;
        public DeviationService(IDeviationRepository deviationRepository)
        {
            _deviationRepository = deviationRepository;
        }
        public void Add(Deviation deviation)
        {
            _deviationRepository.Add(deviation);
        }

        public IEnumerable<Deviation> GetAll()
        {
            return _deviationRepository.GetAll();
        }

        public IEnumerable<Deviation> GetDeviationsByReportId(int id)
        {
            return _deviationRepository.GetDeviationsByReportId(id);
        }

        public void Remove(Deviation deviation)
        {
            _deviationRepository.Remove(deviation);
        }

        public void Update(Deviation deviation)
        {
            _deviationRepository.Update(deviation);
        }
    }
}
