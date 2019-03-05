using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Data.DataContext
{
    public class TimeTrackingContext : DbContext
    {
        public TimeTrackingContext(DbContextOptions<TimeTrackingContext> options)
        : base(options)
        { }

        public TimeTrackingContext()
        {
        }
        public DbSet<Report> Reports { get; set; }
        public DbSet<Deviation> Deviations { get; set; }
        public DbSet<User> Users { get; set; }
    }
}

