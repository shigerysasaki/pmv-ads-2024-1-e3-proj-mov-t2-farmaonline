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
    public class AvaliacaoController : ControllerBase
    {
        private readonly PucFarmaDbContext _context;

        public AvaliacaoController(PucFarmaDbContext context)
        {
            _context = context;
        }

        // GET: api/Avaliacao
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AvaliacaoModel>>> GetAvaliacoes()
        {
            return await _context.Avaliacoes.ToListAsync();
        }

        // GET: api/Avaliacao/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AvaliacaoModel>> GetAvaliacao(int id)
        {
            var avaliacaoModel = await _context.Avaliacoes.FindAsync(id);

            if (avaliacaoModel == null)
            {
                return NotFound();
            }

            return avaliacaoModel;
        }

        // PUT: api/Avaliacao/5
        [HttpPut("{id}")]
        public async Task<IActionResult> EditarAvaliacao(int id, AvaliacaoModel avaliacaoModel)
        {
            if (id != avaliacaoModel.avaliacaoId)
            {
                return BadRequest();
            }

            _context.Entry(avaliacaoModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AvaliacaoExists(id))
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

        // POST: api/Avaliacao
        [HttpPost]
        public async Task<ActionResult<AvaliacaoModel>> AdicionarAvaliacao(AvaliacaoModel avaliacaoModel)
        {
            _context.Avaliacoes.Add(avaliacaoModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAvaliacao", new { id = avaliacaoModel.avaliacaoId }, avaliacaoModel);
        }

        // DELETE: api/Avaliacao/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> ApagarAvaliacao(int id)
        {
            var avaliacaoModel = await _context.Avaliacoes.FindAsync(id);
            if (avaliacaoModel == null)
            {
                return NotFound();
            }

            _context.Avaliacoes.Remove(avaliacaoModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AvaliacaoExists(int id)
        {
            return _context.Avaliacoes.Any(e => e.avaliacaoId == id);
        }
    }
}
