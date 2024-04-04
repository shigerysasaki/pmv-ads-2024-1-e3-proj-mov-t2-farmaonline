CREATE TABLE Usuario (
    usuarioID INT AUTO_INCREMENT PRIMARY KEY,
    nomeCompleto VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    telefone VARCHAR(50) NOT NULL,
    senha VARCHAR(100) NOT NULL,
    CEP INT NOT NULL,
    estado VARCHAR(20) NOT NULL,
    cidade VARCHAR(30) NOT NULL,
    bairro VARCHAR(30) NOT NULL,
    rua VARCHAR(30) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    complemento VARCHAR(20) NOT NULL
);


CREATE TABLE Pedido (
    pedidoID INT AUTO_INCREMENT PRIMARY KEY,
    usuarioID INT NOT NULL,
    metodoPagamento ENUM NOT NULL,
    dataPedido DATE NOT NULL,
    previsaoEntrega DATE NOT NULL,
    status ENUM NOT NULL,
    FOREIGN KEY (usuarioID) REFERENCES Usuario(usuarioID)
);

CREATE TABLE PedidoProduto (
    pedidoProdutoID INT AUTO_INCREMENT PRIMARY KEY,
    pedidoID INT NOT NULL,
    produtoID INT NOT NULL,
    quantidade INT NOT NULL,
    FOREIGN KEY (pedidoID) REFERENCES Pedido(pedidoID),
    FOREIGN KEY (produtoID) REFERENCES Produto(produtoID)
);


CREATE TABLE Produto (
    produtoID INT AUTO_INCREMENT PRIMARY KEY,
    farmaciaID INT NOT NULL,
    nomeProduto VARCHAR(50) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    descricao VARCHAR(500) NOT NULL,
    estoqueDisponivel INT NOT NULL,
    categoria ENUM NOT NULL,
    tipoOferta ENUM NOT NULL,
    FOREIGN KEY (farmaciaID) REFERENCES Farmacia(farmaciaID)
);

CREATE TABLE Farmacia (
    nomeFarmacia VARCHAR(20) AUTO_INCREMENT PRIMARY KEY,
    telefone VARCHAR(50) NOT NULL,
    horarioFuncionamento VARCHAR(20) NOT NULL,
    CEP INT NOT NULL,
    estado VARCHAR(20) NOT NULL,
    cidade VARCHAR(30) NOT NULL,
    bairro VARCHAR(30) NOT NULL,
    rua VARCHAR(30) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    complemento VARCHAR(30) NOT NULL
);

CREATE TABLE Avaliacao (
    avaliacaoID INT AUTO_INCREMENT PRIMARY KEY,
    usuarioID INT NOT NULL,
    produtoID INT NOT NULL,
    nota INT NOT NULL,
    comentario VARCHAR(200),
    dataAvaliacao DATE NOT NULL,
    FOREIGN KEY (usuarioID) REFERENCES Usuario(usuarioID),
    FOREIGN KEY (produtoID) REFERENCES Produto(produtoID)
);
