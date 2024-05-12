using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using pucfarma.api.Data;
using pucfarma.api.Enum;
using pucfarma.api.Models;


namespace pucfarma.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PagamentoController : ControllerBase
    {
        private readonly PucFarmaDbContext _context;

        public PagamentoController(PucFarmaDbContext context)
        {
            _context = context;
        }

        // POST: api/MetodoPagamento/Cartao
        [HttpPost("Cartao")]
        public async Task<IActionResult> PagamentoCartao(int ID, string nomeCartao, string numeroCartao, string cvv, string validade)
        {
            bool nomeCartaoApenasLetras = Regex.IsMatch(nomeCartao, @"^[a-zA-Z\s]+$");

            if (nomeCartaoApenasLetras == true && numeroCartao.Length == 16 && cvv.Length == 3)
            {
                var pedido = await _context.Pedidos.FindAsync(ID);
                if (pedido == null)
                {
                    return BadRequest(new { erro = "Não há um pedido com o ID fornecido." });
                }

                pedido.status = StatusPedido.Preparacao;
                await _context.SaveChangesAsync();

                return Ok();
            }
            return BadRequest(new { erro = "Os dados do cartão são inválidos." });
        }

        // POST: api/MetodoPagamento/Pix
        [HttpPost("Pix")]
        public async Task<IActionResult> PagamentoPix(int ID, string email)
        {
            var pedido = await _context.Pedidos.FindAsync(ID);
            if (pedido == null)
            {
                return BadRequest(new { erro = "Não há um pedido com o ID fornecido." });
            }

            if (!IsValidEmail(email))
            {
                return BadRequest(new { erro = "O endereço de e-mail fornecido não está em um formato válido." });
            }
            else
            {
                pedido.status = StatusPedido.Preparacao;
                await _context.SaveChangesAsync();
            }
            return Ok();
        }

        // POST: api/MetodoPagamento/BoletoBancario
        [HttpPost("BoletoBancario")]
        public async Task<IActionResult> BoletoBancario(int ID)
        {
            var pedido = await _context.Pedidos.FindAsync(ID);
            if (pedido == null)
            {
                return BadRequest(new { erro = "Não há um pedido com o ID fornecido." });
            }
            pedido.status = StatusPedido.Preparacao;
            await _context.SaveChangesAsync();
            return Ok();
        }


        private bool IsValidEmail(string email)
        {
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }

    }
}
