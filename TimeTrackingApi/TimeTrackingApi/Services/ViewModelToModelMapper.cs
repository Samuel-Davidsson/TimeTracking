using Domain.Entities;
using TimeTrackingApi.Viewmodels;

namespace TimeTrackingApi.Services
{
    internal class ViewModelToModelMapper
    {
        public Report ReportViewModelToArticle(ReportViewmodel model)
        {
            return new Report
            {
                Id = model.Id,
                UserId = model.UserId,
                Accepted = model.Accepted,
                Attest = model.Attest,
                DeviationItems = model.DeviationItems,
            };
        }

        public Report ReportViewModelToEditArticle(ReportViewmodel model, Report report)
        {
            return new Report
            {
                DeviationItems = model.DeviationItems,
            };
        }
    }
}
