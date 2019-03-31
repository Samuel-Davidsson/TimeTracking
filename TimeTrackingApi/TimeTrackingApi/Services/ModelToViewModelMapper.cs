using Domain.Entities;
using TimeTrackingApi.Viewmodels;

namespace TimeTrackingApi.Services
{
    internal class ModelToViewModelMapper
    {
        public DeviationViewmodel DeviationViewmodel(Deviation deviation)
        {
            return new DeviationViewmodel
            {
                Hours = deviation.Hours,
                Description = deviation.Description,
                AbsenceDate = deviation.AbsenceDate,
            };
        }
        public ReportViewmodel ReportViewmodel(Report report)
        {
            return new ReportViewmodel
            {
                Id = report.Id,
                Accepted = report.Accepted,
                Attest = report.Attest,
                CreatedDate = report.CreatedDate,
                Date = report.Date,
                DeviationItems = report.DeviationItems,
                UpdatedDate = report.UpdatedDate,
                UserId = report.UserId
            };
        }

    }
}