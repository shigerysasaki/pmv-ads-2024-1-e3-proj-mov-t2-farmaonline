using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using pucfarma.api.Data;
using pucfarma.api.Enum;
using pucfarma.api.Models;

namespace pucfarma.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ControleVendas : ControllerBase
    {
        private readonly PucFarmaDbContext _context;

        public ControleVendas(PucFarmaDbContext context)
        {
            _context = context;
        }


        //VENDAS

        // GET: api/Pedido/Vendas/Total
        [HttpGet("Vendas/Total")]
        public async Task<ActionResult<int>> GetVendasTotal()
        {
            var totalPedidos = await _context.Pedidos.CountAsync();
            return totalPedidos;
        }

        // GET: api/Pedido/Vendas/Mes
        [HttpGet("Vendas/Mes")]
        public async Task<ActionResult<int>> GetVendasMes()
        {
            var mesAtual = DateTime.Now.Month;
            var anoAtual = DateTime.Now.Year;

            var pedidosMes = await _context.Pedidos
                .Where(p => p.dataPedido != null && p.dataPedido.Value.Month == mesAtual && p.dataPedido.Value.Year == anoAtual)
                .ToListAsync();

            return pedidosMes.Count();
        }

        // GET: api/Pedido/Vendas/Total/Pix
        [HttpGet("Vendas/Total/Pix")]
        public async Task<ActionResult<int>> GetVendasTotalPix()
        {
            var totalPedidos = await _context.Pedidos
                .Where(p => p.metodoPagamento == Enum.MetodoPagamento.Pix)
                .ToListAsync();

            return totalPedidos.Count;
        }

        // GET: api/Pedido/Vendas/Mes/Pix
        [HttpGet("Vendas/Mes/Pix")]
        public async Task<ActionResult<int>> GetVendasMesPix()
        {
            var mesAtual = DateTime.Now.Month;
            var anoAtual = DateTime.Now.Year;

            var pedidosMes = await _context.Pedidos
                .Where(p => p.dataPedido != null && p.dataPedido.Value.Month == mesAtual && p.dataPedido.Value.Year == anoAtual && p.metodoPagamento == Enum.MetodoPagamento.Pix)
                .ToListAsync();

            return pedidosMes.Count();
        }

        // GET: api/Pedido/Vendas/Total/CartaoApp
        [HttpGet("Vendas/Total/CartaoApp")]
        public async Task<ActionResult<int>> GetVendasTotalCartaoApp()
        {
            var totalPedidos = await _context.Pedidos
                .Where(p => p.metodoPagamento == Enum.MetodoPagamento.CartaoApp)
                .ToListAsync();

            return totalPedidos.Count;
        }

        // GET: api/Pedido/Vendas/Mes/CartaoApp
        [HttpGet("Vendas/Mes/CartaoApp")]
        public async Task<ActionResult<int>> GetVendasMesCartaoApp()
        {
            var mesAtual = DateTime.Now.Month;
            var anoAtual = DateTime.Now.Year;

            var pedidosMes = await _context.Pedidos
                .Where(p => p.dataPedido != null && p.dataPedido.Value.Month == mesAtual && p.dataPedido.Value.Year == anoAtual && p.metodoPagamento == Enum.MetodoPagamento.CartaoApp)
                .ToListAsync();

            return pedidosMes.Count();
        }

        // GET: api/Pedido/Vendas/Total/CartaoEntrega
        [HttpGet("Vendas/Total/CartaoEntrega")]
        public async Task<ActionResult<int>> GetVendasTotalCartaoEntrega()
        {
            var totalPedidos = await _context.Pedidos
                .Where(p => p.metodoPagamento == Enum.MetodoPagamento.CartaoEntrega)
                .ToListAsync();

            return totalPedidos.Count;
        }

        // GET: api/Pedido/Vendas/Mes/CartaoEntrega
        [HttpGet("Vendas/Mes/CartaoEntrega")]
        public async Task<ActionResult<int>> GetVendasMesCartaoEntrega()
        {
            var mesAtual = DateTime.Now.Month;
            var anoAtual = DateTime.Now.Year;

            var pedidosMes = await _context.Pedidos
                .Where(p => p.dataPedido != null && p.dataPedido.Value.Month == mesAtual && p.dataPedido.Value.Year == anoAtual && p.metodoPagamento == Enum.MetodoPagamento.CartaoEntrega)
                .ToListAsync();

            return pedidosMes.Count();
        }

        // GET: api/Pedido/Vendas/Total/BoletoBancario
        [HttpGet("Vendas/Total/BoletoBancario")]
        public async Task<ActionResult<int>> GetVendasTotalBoletoBancario()
        {
            var totalPedidos = await _context.Pedidos
                .Where(p => p.metodoPagamento == Enum.MetodoPagamento.BoletoBancario)
                .ToListAsync();

            return totalPedidos.Count;
        }

        // GET: api/Pedido/Vendas/Mes/BoletoBancario
        [HttpGet("Vendas/Mes/BoletoBancario")]
        public async Task<ActionResult<int>> GetVendasMesBoletoBancario()
        {
            var mesAtual = DateTime.Now.Month;
            var anoAtual = DateTime.Now.Year;

            var pedidosMes = await _context.Pedidos
                .Where(p => p.dataPedido != null && p.dataPedido.Value.Month == mesAtual && p.dataPedido.Value.Year == anoAtual && p.metodoPagamento == Enum.MetodoPagamento.BoletoBancario)
                .ToListAsync();

            return pedidosMes.Count();
        }

        // GET: api/Pedido/Vendas/Total/Dinheiro
        [HttpGet("Vendas/Total/Dinheiro")]
        public async Task<ActionResult<int>> GetVendasTotalDinheiro()
        {
            var totalPedidos = await _context.Pedidos
                .Where(p => p.metodoPagamento == Enum.MetodoPagamento.Dinheiro)
                .ToListAsync();

            return totalPedidos.Count;
        }

        // GET: api/Pedido/Vendas/Mes/Dinheiro
        [HttpGet("Vendas/Mes/Dinheiro")]
        public async Task<ActionResult<int>> GetVendasMesDinheiro()
        {
            var mesAtual = DateTime.Now.Month;
            var anoAtual = DateTime.Now.Year;

            var pedidosMes = await _context.Pedidos
                .Where(p => p.dataPedido != null && p.dataPedido.Value.Month == mesAtual && p.dataPedido.Value.Year == anoAtual && p.metodoPagamento == Enum.MetodoPagamento.Dinheiro)
                .ToListAsync();

            return pedidosMes.Count();
        }



        //VALOR

        // GET: api/Pedido/Valor/Total
        [HttpGet("Valor/Total")]
        public async Task<ActionResult<decimal>> GetValorTotal()
        {
            var pedidos = await _context.Pedidos
                .Include(p => p.pedidoProduto)
                .ThenInclude(pp => pp.produto)
                .ToListAsync();

            decimal valorTotal = 0;

            foreach (var pedido in pedidos)
            {
                foreach (var pedidoProduto in pedido.pedidoProduto)
                {
                    valorTotal += pedidoProduto.produto.preco * pedidoProduto.quantidade;
                }
            }

            return valorTotal;
        }

        // GET: api/Pedido/Valor/Mes
        [HttpGet("Valor/Mes")]
        public async Task<ActionResult<decimal>> GetValorMes()
        {
            var mesAtual = DateTime.Now.Month;
            var anoAtual = DateTime.Now.Year;

            var pedidos = await _context.Pedidos
                .Include(p => p.pedidoProduto)
                .ThenInclude(pp => pp.produto)
                .Where(p => p.dataPedido != null && p.dataPedido.Value.Month == mesAtual && p.dataPedido.Value.Year == anoAtual)
                .ToListAsync();

            decimal valorTotal = 0;

            foreach (var pedido in pedidos)
            {
                foreach (var pedidoProduto in pedido.pedidoProduto)
                {
                    valorTotal += pedidoProduto.produto.preco * pedidoProduto.quantidade;
                }
            }

            return valorTotal;
        }

        // GET: api/Pedido/Valor/Total/Pix
        [HttpGet("Valor/Total/Pix")]
        public async Task<ActionResult<decimal>> GetValorTotalPix()
        {
            var valorTotalPix = await _context.Pedidos
                .Include(p => p.pedidoProduto)
                .ThenInclude(pp => pp.produto)
                .Where(p => p.metodoPagamento == MetodoPagamento.Pix)
                .SumAsync(p => p.pedidoProduto.Sum(pp => pp.produto.preco * pp.quantidade));

            return valorTotalPix;
        }

        // GET: api/Pedido/Valor/Mes/Pix
        [HttpGet("Valor/Mes/Pix")]
        public async Task<ActionResult<decimal>> GetValorMesPix()
        {
            var mesAtual = DateTime.Now.Month;
            var anoAtual = DateTime.Now.Year;

            var valorTotalMesPix = await _context.Pedidos
                .Include(p => p.pedidoProduto)
                .ThenInclude(pp => pp.produto)
                .Where(p => p.metodoPagamento == MetodoPagamento.Pix &&
                            p.dataPedido != null &&
                            p.dataPedido.Value.Month == mesAtual &&
                            p.dataPedido.Value.Year == anoAtual)
                .SumAsync(p => p.pedidoProduto.Sum(pp => pp.produto.preco * pp.quantidade));

            return valorTotalMesPix;
        }

        // GET: api/Pedido/Valor/Total/CartaoApp
        [HttpGet("Valor/Total/CartaoApp")]
        public async Task<ActionResult<decimal>> GetValorTotalCartaoApp()
        {
            var valorTotalCartaoApp = await _context.Pedidos
                .Include(p => p.pedidoProduto)
                .ThenInclude(pp => pp.produto)
                .Where(p => p.metodoPagamento == MetodoPagamento.CartaoApp)
                .SumAsync(p => p.pedidoProduto.Sum(pp => pp.produto.preco * pp.quantidade));

            return valorTotalCartaoApp;
        }

        // GET: api/Pedido/Valor/Mes/CartaoApp
        [HttpGet("Valor/Mes/CartaoApp")]
        public async Task<ActionResult<decimal>> GetValorMesCartaoApp()
        {
            var mesAtual = DateTime.Now.Month;
            var anoAtual = DateTime.Now.Year;

            var valorTotalMesCartaoApp = await _context.Pedidos
                .Include(p => p.pedidoProduto)
                .ThenInclude(pp => pp.produto)
                .Where(p => p.metodoPagamento == MetodoPagamento.CartaoApp &&
                            p.dataPedido != null &&
                            p.dataPedido.Value.Month == mesAtual &&
                            p.dataPedido.Value.Year == anoAtual)
                .SumAsync(p => p.pedidoProduto.Sum(pp => pp.produto.preco * pp.quantidade));

            return valorTotalMesCartaoApp;
        }

        // GET: api/Pedido/Valor/Total/CartaoEntrega
        [HttpGet("Valor/Total/CartaoEntrega")]
        public async Task<ActionResult<decimal>> GetValorTotalCartaoEntrega()
        {
            var valorTotalCartaoEntrega = await _context.Pedidos
                .Include(p => p.pedidoProduto)
                .ThenInclude(pp => pp.produto)
                .Where(p => p.metodoPagamento == MetodoPagamento.CartaoEntrega)
                .SumAsync(p => p.pedidoProduto.Sum(pp => pp.produto.preco * pp.quantidade));

            return valorTotalCartaoEntrega;
        }

        // GET: api/Pedido/Valor/Mes/CartaoEntrega
        [HttpGet("Valor/Mes/CartaoEntrega")]
        public async Task<ActionResult<decimal>> GetValorMesCartaoEntrega()
        {
            var mesAtual = DateTime.Now.Month;
            var anoAtual = DateTime.Now.Year;

            var valorTotalMesCartaoEntrega = await _context.Pedidos
                .Include(p => p.pedidoProduto)
                .ThenInclude(pp => pp.produto)
                .Where(p => p.metodoPagamento == MetodoPagamento.CartaoEntrega &&
                            p.dataPedido != null &&
                            p.dataPedido.Value.Month == mesAtual &&
                            p.dataPedido.Value.Year == anoAtual)
                .SumAsync(p => p.pedidoProduto.Sum(pp => pp.produto.preco * pp.quantidade));

            return valorTotalMesCartaoEntrega;
        }

        // GET: api/Pedido/Valor/Total/BoletoBancario
        [HttpGet("Valor/Total/BoletoBancario")]
        public async Task<ActionResult<decimal>> GetValorTotalBoletoBancario()
        {
            var valorTotalBoletoBancario = await _context.Pedidos
                .Include(p => p.pedidoProduto)
                .ThenInclude(pp => pp.produto)
                .Where(p => p.metodoPagamento == MetodoPagamento.BoletoBancario)
                .SumAsync(p => p.pedidoProduto.Sum(pp => pp.produto.preco * pp.quantidade));

            return valorTotalBoletoBancario;
        }

        // GET: api/Pedido/Valor/Mes/BoletoBancario
        [HttpGet("Valor/Mes/BoletoBancario")]
        public async Task<ActionResult<decimal>> GetValorMesBoletoBancario()
        {
            var mesAtual = DateTime.Now.Month;
            var anoAtual = DateTime.Now.Year;

            var valorTotalMesBoletoBancario = await _context.Pedidos
                .Include(p => p.pedidoProduto)
                .ThenInclude(pp => pp.produto)
                .Where(p => p.metodoPagamento == MetodoPagamento.BoletoBancario &&
                            p.dataPedido != null &&
                            p.dataPedido.Value.Month == mesAtual &&
                            p.dataPedido.Value.Year == anoAtual)
                .SumAsync(p => p.pedidoProduto.Sum(pp => pp.produto.preco * pp.quantidade));

            return valorTotalMesBoletoBancario;
        }

        // GET: api/Pedido/Valor/Total/Dinheiro
        [HttpGet("Valor/Total/Dinheiro")]
        public async Task<ActionResult<decimal>> GetValorTotalDinheiro()
        {
            var valorTotalDinheiro = await _context.Pedidos
                .Include(p => p.pedidoProduto)
                .ThenInclude(pp => pp.produto)
                .Where(p => p.metodoPagamento == MetodoPagamento.Dinheiro)
                .SumAsync(p => p.pedidoProduto.Sum(pp => pp.produto.preco * pp.quantidade));

            return valorTotalDinheiro;
        }

        // GET: api/Pedido/Valor/Mes/Dinheiro
        [HttpGet("Valor/Mes/Dinheiro")]
        public async Task<ActionResult<decimal>> GetValorMesDinheiro()
        {
            var mesAtual = DateTime.Now.Month;
            var anoAtual = DateTime.Now.Year;

            var valorTotalMesDinheiro = await _context.Pedidos
                .Include(p => p.pedidoProduto)
                .ThenInclude(pp => pp.produto)
                .Where(p => p.metodoPagamento == MetodoPagamento.Dinheiro &&
                            p.dataPedido != null &&
                            p.dataPedido.Value.Month == mesAtual &&
                            p.dataPedido.Value.Year == anoAtual)
                .SumAsync(p => p.pedidoProduto.Sum(pp => pp.produto.preco * pp.quantidade));

            return valorTotalMesDinheiro;
        }


    }
}
