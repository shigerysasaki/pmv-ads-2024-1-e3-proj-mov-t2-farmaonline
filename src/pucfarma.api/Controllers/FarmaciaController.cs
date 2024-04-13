using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using pucfarma.api.Data;
using pucfarma.api.Models;

namespace pucfarma.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FarmaciaController : ControllerBase
    {
        private readonly PucFarmaDbContext _context;

        public FarmaciaController(PucFarmaDbContext context)
        {
            _context = context;
        }

        // GET: api/Farmacia
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FarmaciaModel>>> GetFarmacias()
        {
            return await _context.Farmacia.ToListAsync();
        }

        // GET: api/Farmacia/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FarmaciaModel>> GetFarmacia(string id)
        {
            var farmaciaModel = await _context.Farmacia.FindAsync(id);

            if (farmaciaModel == null)
            {
                return NotFound();
            }

            return farmaciaModel;
        }

        // PUT: api/Farmacia/5
        [HttpPut("{id}")]
        public async Task<IActionResult> EditarFarmacia(string id, FarmaciaModel farmaciaModel)
        {
            if (id != farmaciaModel.nomeFarmacia)
            {
                return BadRequest();
            }

            _context.Entry(farmaciaModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FarmaciaExists(id))
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

        // POST: api/Farmacia
        [HttpPost]
        public async Task<ActionResult<FarmaciaModel>> CriarFarmacia(FarmaciaModel farmaciaModel)
        {
            _context.Farmacia.Add(farmaciaModel);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (FarmaciaExists(farmaciaModel.nomeFarmacia))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetFarmacia", new { id = farmaciaModel.nomeFarmacia }, farmaciaModel);
        }

        // DELETE: api/Farmacia/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> ApagarFarmacia(string id)
        {
            var farmaciaModel = await _context.Farmacia.FindAsync(id);
            if (farmaciaModel == null)
            {
                return NotFound();
            }

            _context.Farmacia.Remove(farmaciaModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FarmaciaExists(string id)
        {
            return _context.Farmacia.Any(e => e.nomeFarmacia == id);
        }
    }
}
