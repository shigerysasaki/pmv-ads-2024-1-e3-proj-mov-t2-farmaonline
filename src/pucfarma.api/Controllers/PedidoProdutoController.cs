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
    public class PedidoProdutoController : ControllerBase
    {
        private readonly PucFarmaDbContext _context;

        public PedidoProdutoController(PucFarmaDbContext context)
        {
            _context = context;
        }

        // GET: api/PedidoProduto
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PedidoProdutoModel>>> GetPedidosProdutos()
        {
            return await _context.PedidoProduto.ToListAsync();
        }

        // GET: api/PedidoProduto/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PedidoProdutoModel>> GetPedidoProduto(int id)
        {
            var pedidoProdutoModel = await _context.PedidoProduto.FindAsync(id);

            if (pedidoProdutoModel == null)
            {
                return NotFound();
            }

            return pedidoProdutoModel;
        }

        // PUT: api/PedidoProduto/5
        [HttpPut("{id}")]
        public async Task<IActionResult> EditarPedidoProduto(int id, PedidoProdutoModel pedidoProdutoModel)
        {
            if (id != pedidoProdutoModel.pedidoId)
            {
                return BadRequest();
            }

            _context.Entry(pedidoProdutoModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PedidoProdutoExists(id))
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

        // POST: api/PedidoProduto
        [HttpPost]
        public async Task<ActionResult<PedidoProdutoModel>> GerarPedidoProduto(PedidoProdutoModel pedidoProdutoModel)
        {
            _context.PedidoProduto.Add(pedidoProdutoModel);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (PedidoProdutoExists(pedidoProdutoModel.pedidoId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetPedidoProduto", new { id = pedidoProdutoModel.pedidoId }, pedidoProdutoModel);
        }

        // DELETE: api/PedidoProduto/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> ApagarPedidoProduto(int id)
        {
            var pedidoProdutoModel = await _context.PedidoProduto.FindAsync(id);
            if (pedidoProdutoModel == null)
            {
                return NotFound();
            }

            _context.PedidoProduto.Remove(pedidoProdutoModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PedidoProdutoExists(int id)
        {
            return _context.PedidoProduto.Any(e => e.pedidoId == id);
        }
    }
}
