using System.ComponentModel.DataAnnotations;

namespace pucfarma.api.Enum
{
    public enum CategoriaProduto
    {
        Medicamentos,
        Beleza,
        Maternidade,
        Suplementos,
        Higiene,

        [Display(Name = "Produtos Infantis")]
        ProdutosInfantis,

        [Display(Name = "Dermocosméticos")]
        Dermocosmeticos
    }
}
