using System.ComponentModel.DataAnnotations;

namespace pucfarma.api.Models
{
    public class Endereco
    {
        [Display(Name = "CEP")]
        public string cep { get; set; }

        [MaxLength(20)]
        [Display(Name = "Estado")]
        public string estado { get; set; }

        [MaxLength(30)]
        [Display(Name = "Cidade")]
        public string cidade { get; set; }

        [MaxLength(30)]
        [Display(Name = "Bairro")]
        public string bairro { get; set; }

        [MaxLength(30)]
        [Display(Name = "Rua")]
        public string rua { get; set; }

        [MaxLength(10)]
        [Display(Name = "Número")]
        public string numero { get; set; }

        [MaxLength(20)]
        [Display(Name = "Complemento")]
        public string complemento { get; set; }
    }
}