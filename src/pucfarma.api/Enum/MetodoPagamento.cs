using System.ComponentModel.DataAnnotations;

namespace pucfarma.api.Enum
{
    public enum MetodoPagamento
    {
        Pix,
        Dinheiro,

        [Display(Name = "Boleto bancário")]
        BoletoBancario,

        [Display(Name = "Cartão de Crédito (via app)")]
        CartaoApp,

        [Display(Name = "Cartão de Crédito (na entrega)")]
        CartaoEntrega
    }
}
