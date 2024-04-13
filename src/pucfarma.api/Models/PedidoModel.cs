using pucfarma.api.Enum;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace pucfarma.api.Models
{
    [Table("Pedidos")]
    public class PedidoModel
    {
        [Key]
        public int pedidoId { get; set; }

        public int usuarioId { get; set; }
        [ForeignKey("usuarioId")]
        [Display(Name = "Usuário")]
        public UsuarioModel? usuario { get; set; }


        [Display(Name = "Data do Pedido")]
        [DataType(DataType.Date)]
        public DateTime dataPedido { get; set; }

        [Display(Name = "Previsão de Entrega")]
        [DataType(DataType.Date)]
        public DateTime previsaoEntrega { get; set; }

        [Display(Name = "Método de Pagamento")]
        public MetodoPagamento metodoPagamento { get; set; }

        [Display(Name = "Status do Pedido")]
        public StatusPedido status { get; set; }


        public ICollection<PedidoProdutoModel>? pedidoProduto { get; set; }
    }
}
