using Microsoft.EntityFrameworkCore;
using pucfarma.api.Models;


namespace pucfarma.api.Data
{
    public class PucFarmaDbContext : DbContext
    {
        public PucFarmaDbContext(DbContextOptions<PucFarmaDbContext> options) : base(options) { }

        public DbSet<UsuarioModel> Usuarios { get; set; }
        public DbSet<PedidoModel> Pedidos { get; set; }
        public DbSet<ProdutoModel> Produtos { get; set; }
        public DbSet<AvaliacaoModel> Avaliacoes { get; set; }
        public DbSet<FarmaciaModel> Farmacia { get; set; }

        public DbSet<PedidoProdutoModel> PedidoProduto { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<FarmaciaModel>()
                .OwnsOne(e => e.enderecoFarmacia, sa =>
                {
                    sa.Property(a => a.estado).IsRequired();
                    sa.Property(a => a.cidade).IsRequired();
                    sa.Property(a => a.bairro).IsRequired();
                    sa.Property(a => a.rua).IsRequired();
                    sa.Property(a => a.numero).IsRequired();
                    sa.Property(a => a.complemento);
                });

            modelBuilder.Entity<PedidoModel>()
                .HasOne(a => a.usuario)
                .WithMany(u => u.usuarioPedido)
                .HasForeignKey(a => a.usuarioId);

            modelBuilder.Entity<PedidoProdutoModel>()
                .HasKey(pc => new { pc.pedidoId, pc.produtoId });

            modelBuilder.Entity<PedidoProdutoModel>()
                .HasOne(pc => pc.pedido)
                .WithMany(p => p.pedidoProduto)
                .HasForeignKey(pc => pc.pedidoId);

            modelBuilder.Entity<PedidoProdutoModel>()
                .HasOne(pc => pc.produto)
                .WithMany(c => c.produtoPedido)
                .HasForeignKey(pc => pc.produtoId);

            modelBuilder.Entity<ProdutoModel>()
                .HasOne(a => a.farmacia)
                .WithMany(u => u.farmaciaProduto)
                .HasForeignKey(a => a.nomeFarmacia);

            modelBuilder.Entity<AvaliacaoModel>()
                .HasOne(a => a.usuario)
                .WithMany(u => u.usuarioAvaliacao)
                .HasForeignKey(a => a.usuarioId);

            modelBuilder.Entity<AvaliacaoModel>()
                .HasOne(a => a.produto)
                .WithMany(u => u.produtoAvaliacao)
                .HasForeignKey(a => a.produtoId);
        }
     }

}