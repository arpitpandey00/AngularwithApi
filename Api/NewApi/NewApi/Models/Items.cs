﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NewApi.Models
{
    public class Items
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public int Price { get; set; }
        public int Quantity { get; set; }
        public string Color { get; set; }
        public string ExpiryDate { get; set; }
        public bool InStock { get; set; }
    }
}
