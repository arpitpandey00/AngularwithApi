using Microsoft.EntityFrameworkCore;
using NewApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NewApi.Infrastructure
{
    public class ItemDbContext : DbContext
    {
        public DbSet<Items> AllItems { get; set; }

        public ItemDbContext(DbContextOptions<ItemDbContext> options) : base(options)
        {

        }
    }
}
