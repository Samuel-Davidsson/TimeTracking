using Domain.Entities;
using Domain.Services;
using System;
using System.Linq;
using TimeTrackingApi.Helpers;
using TimeTrackingApi.Viewmodels;

namespace TimeTrackingApi.Services
{
    public class ReportControllerServices
    {
        public Report GetReportByMonth(ReportViewmodel reportViewmodel, Report[] reports, IReportService _reportService)
        {
            DateTime currentMonthParsed = DateTime.Parse(reportViewmodel.CurrentMonth);
            var currentMonth = currentMonthParsed.ToString("yyyy-MM");
            foreach (var report in reports)
            {
                var reportDate = report.Date.ToString("yyyy-MM");
                if (reportDate == currentMonth)
                {
                    _reportService.GetReportById(report.Id);
                    var sortDeviations = report.DeviationItems.OrderByDescending(x => x.AbsenceDate);
                    report.DeviationItems = sortDeviations.ToList();
                    return report;
                }
            }
            return Mapper.ViewModelToModelMapping.ReportViewModelToReport(reportViewmodel);
        }

        public DateTime DateParser(string date)
        {
            DateTime currentMonthParsed = DateTime.Parse(date);
            var currentMonth = currentMonthParsed.ToString("yyyy-MM");
            DateTime finalcurrentMonthParsed = DateTime.Parse(currentMonth);

            return finalcurrentMonthParsed;
        }

        public Report UpdateReportDeviations(Report report, IDeviationService _deviationService, ReportViewmodel reportViewmodel)
        {
            foreach (var deviation in report.DeviationItems)
            {
                _deviationService.Remove(deviation);
            }
            report.DeviationItems = reportViewmodel.DeviationItems;
            report.UpdatedDate = DateTime.Now;

            return report;
        }
    }
}
