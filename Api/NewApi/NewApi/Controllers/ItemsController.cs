using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NewApi.Infrastructure;
using NewApi.Models;

namespace NewApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly ItemDbContext _context;

        public ItemsController(ItemDbContext context)
        {
            _context = context;
        }

        // GET: api/Items
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Items>>> GetAllItems()
        {
            return await _context.AllItems.ToListAsync();
        }

        // GET: api/Items/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Items>> GetItems(long id)
        {
            var items = await _context.AllItems.FindAsync(id);

            if (items == null)
            {
                return NotFound();
            }

            return items;
        }

        // PUT: api/Items/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutItems(long id, Items items)
        {
            if (id != items.Id)
            {
                return BadRequest();
            }

            _context.Entry(items).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ItemsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Items
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Items>> PostItems(Items items)
        {
            _context.AllItems.Add(items);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetItems", new { id = items.Id }, items);
        }

        // DELETE: api/Items/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Items>> DeleteItems(long id)
        {
            var items = await _context.AllItems.FindAsync(id);
            if (items == null)
            {
                return NotFound();
            }

            _context.AllItems.Remove(items);
            await _context.SaveChangesAsync();

            return items;
        }

        private bool ItemsExists(long id)
        {
            return _context.AllItems.Any(e => e.Id == id);
        }
    }
}
