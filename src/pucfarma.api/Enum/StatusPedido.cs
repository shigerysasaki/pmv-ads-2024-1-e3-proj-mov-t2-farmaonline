using System.ComponentModel.DataAnnotations;

namespace pucfarma.api.Enum
{
    public enum StatusPedido
    {
        [Display(Name = "Aguardando pagamento")]
        PagamentoPendente,

        [Display(Name = "Em processo de entrega")]
        Preparacao,

        [Display(Name = "Pedido finalizado")]
        Finalizado,

        [Display(Name = "Pedido cancelado")]
        Cancelado
    }
}
