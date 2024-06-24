import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import Footer from '../template/footer';

const AvaliacoesPendentes = () => {
  const [pedidoProdutos, setPedidoProdutos] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [usuarioId, setUsuarioId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsuarioLogado = async () => {
      try {
        const response = await fetch('http://10.0.2.2:5035/api/Autenticacao/UsuarioLogado');
        const data = await response.json();
        setUsuarioId(data.usuarioId);
      } catch (error) {
        console.error('Erro ao buscar usuário logado:', error);
        Alert.alert('Erro', 'Não foi possível buscar o usuário logado.');
      }
    };

    const fetchPedidoProdutos = async () => {
      try {
        const response = await fetch('http://10.0.2.2:5035/api/PedidoProduto/');
        const data = await response.json();
        console.log('Pedido_Produtos:', data);
        setPedidoProdutos(data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarioLogado();
    fetchPedidoProdutos();
  }, []);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const produtosDetalhes = await Promise.all(pedidoProdutos.map(async (pedidoProduto) => {
          const response = await fetch(`http://10.0.2.2:5035/api/Produto/${pedidoProduto.produtoId}`);
          const produtoData = await response.json();
          return { ...produtoData, quantidade: pedidoProduto.quantidade };
        }));
        setProdutos(produtosDetalhes);
      } catch (error) {
        console.error('Erro ao buscar detalhes dos produtos:', error);
      }
    };

    if (pedidoProdutos.length > 0) {
      fetchProdutos();
    }
  }, [pedidoProdutos]);

  const handleAvaliacao = (produtoId, comentario, nota) => {
    const updatedProdutos = produtos.map(produto =>
      produto.produtoId === produtoId ? { ...produto, comentario, nota } : produto
    );
    setProdutos(updatedProdutos);
  };

  const sendAvaliacao = async (produtoId, comentario, nota) => {
    const dataAvaliacao = new Date().toISOString();

    if (isNaN(parseInt(nota)) || !comentario.trim()) {
      Alert.alert('Erro', 'Nota inválida ou comentário vazio.');
      return;
    }

    const avaliacao = {
      usuarioId,
      produtoId,
      nota: parseInt(nota),
      comentario: comentario.toString(),
      dataAvaliacao,
    };

    console.log('Enviando avaliação:', avaliacao);

    try {
      const response = await fetch('http://10.0.2.2:5035/api/Avaliacao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(avaliacao),
      });

      const responseText = await response.text();

      console.log('Resposta do servidor:', responseText);

      if (response.ok) {
        console.log('Avaliação enviada com sucesso');
        Alert.alert('Sucesso', 'Avaliação enviada com sucesso');
        handleAvaliacao(produtoId, comentario, nota);
      } else {
        console.log('Falha ao enviar avaliação:', responseText);
        Alert.alert('Erro', 'Falha ao enviar avaliação: ' + responseText);
      }
    } catch (error) {
      console.error('Erro ao enviar avaliação:', error);
      Alert.alert('Erro', 'Erro ao enviar avaliação');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {produtos.map(produto => (
          <View key={produto.produtoId} style={styles.produtoContainer}>
            <View style={styles.produtoHeader}>
              <Image
                style={styles.produtoImagem}
                source={{ uri: `data:image/png;base64,${produto.fotoProduto}` }}
              />
              <View style={styles.produtoInfo}>
                <Text style={styles.produtoNome}>{produto.nomeProduto}</Text>
                <Text style={styles.produtoPreco}>Preço individual: R${produto.preco}</Text>
                <View style={styles.produtoPrecoQuantidadeContainer}>
                  <Text style={styles.produtoPrecoTotal}>Valor total: R${(produto.preco * produto.quantidade).toFixed(2)}</Text>
                  <Text style={styles.produtoQuantidade}>Qtd: {produto.quantidade}</Text>
                </View>
              </View>
            </View>
            <View style={styles.avaliacaoContainer}>
              <Text style={styles.label}>Dê uma nota para este produto:</Text>
              <View style={styles.estrelas}>
                {[...Array(5)].map((_, index) => (
                  <Text
                    key={index}
                    style={index < produto.nota ? styles.estrelaSelecionada : styles.estrela}
                    onPress={() => handleAvaliacao(produto.produtoId, produto.comentario, index + 1)}
                  >
                    ⭐
                  </Text>
                ))}
              </View>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Deixe um comentário"
              onChangeText={(comentario) => handleAvaliacao(produto.produtoId, comentario, produto.nota)}
              value={produto.comentario}
            />
            <View style={styles.botaoContainer}>
              <TouchableOpacity
                style={styles.botaoEnviar}
                onPress={() => sendAvaliacao(produto.produtoId, produto.comentario, produto.nota)}
              >
                <Text style={styles.botaoTexto}>Enviar avaliação</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <Footer style={styles.footer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollViewContent: {
    padding: 20,
    paddingBottom: 100, // Espaço extra para o footer fixo
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  produtoContainer: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  produtoHeader: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  produtoImagem: {
    width: 80,
    height: 80,
    marginRight: 10,
    backgroundColor: '#ccc', // Placeholder color in case the image fails to load
  },
  produtoInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  produtoNome: {
    fontSize: 18,
    color: '#74B0FF',
    marginBottom: 5,
  },
  produtoPreco: {
    fontSize: 12,
    color: '#777',
    marginBottom: 5,
  },
  produtoPrecoQuantidadeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  produtoPrecoTotal: {
    fontSize: 12,
    color: '#777',
    marginBottom: 5,
  },
  produtoQuantidade: {
    fontSize: 12,
    color: '#777',
  },
  avaliacaoContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  estrelas: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  estrela: {
    fontSize: 18,
    color: '#ccc',
  },
  estrelaSelecionada: {
    fontSize: 24,
    color: '#FFD700',
  },
  input: {
    height: 80,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    textAlignVertical: 'top',
  },
  botaoContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  botaoEnviar: {
    backgroundColor: '#74B0FF',
    padding: 10,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default AvaliacoesPendentes;