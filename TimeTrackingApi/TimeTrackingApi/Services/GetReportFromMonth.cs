using Domain.Entities;
using Domain.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TimeTrackingApi.Viewmodels;

namespace TimeTrackingApi.Services
{
    public class GetReportFromMonth
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
    }
}
