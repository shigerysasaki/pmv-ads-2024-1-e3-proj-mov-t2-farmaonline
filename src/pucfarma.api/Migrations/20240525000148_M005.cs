using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace pucfarma.api.Migrations
{
    /// <inheritdoc />
    public partial class M005 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "enderecoEntrega_rua",
                table: "Usuarios",
                newName: "rua");

            migrationBuilder.RenameColumn(
                name: "enderecoEntrega_numero",
                table: "Usuarios",
                newName: "numero");

            migrationBuilder.RenameColumn(
                name: "enderecoEntrega_estado",
                table: "Usuarios",
                newName: "estado");

            migrationBuilder.RenameColumn(
                name: "enderecoEntrega_complemento",
                table: "Usuarios",
                newName: "complemento");

            migrationBuilder.RenameColumn(
                name: "enderecoEntrega_cidade",
                table: "Usuarios",
                newName: "cidade");

            migrationBuilder.RenameColumn(
                name: "enderecoEntrega_cep",
                table: "Usuarios",
                newName: "cep");

            migrationBuilder.RenameColumn(
                name: "enderecoEntrega_bairro",
                table: "Usuarios",
                newName: "bairro");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "rua",
                table: "Usuarios",
                newName: "enderecoEntrega_rua");

            migrationBuilder.RenameColumn(
                name: "numero",
                table: "Usuarios",
                newName: "enderecoEntrega_numero");

            migrationBuilder.RenameColumn(
                name: "estado",
                table: "Usuarios",
                newName: "enderecoEntrega_estado");

            migrationBuilder.RenameColumn(
                name: "complemento",
                table: "Usuarios",
                newName: "enderecoEntrega_complemento");

            migrationBuilder.RenameColumn(
                name: "cidade",
                table: "Usuarios",
                newName: "enderecoEntrega_cidade");

            migrationBuilder.RenameColumn(
                name: "cep",
                table: "Usuarios",
                newName: "enderecoEntrega_cep");

            migrationBuilder.RenameColumn(
                name: "bairro",
                table: "Usuarios",
                newName: "enderecoEntrega_bairro");
        }
    }
}
