using Domain.Entities;
using System.Collections.Generic;
using System.Linq;

namespace TimeTrackingApi.Services
{
    public class UserControllerServices
    {
        public Report SortReportDeviations(Report report, List<Deviation> deviations)
        {
            report.DeviationItems = deviations;
            var sortDeviations = report.DeviationItems.OrderByDescending(x => x.AbsenceDate);
            report.DeviationItems = sortDeviations.ToList();
            return report;
        }
    }
}
