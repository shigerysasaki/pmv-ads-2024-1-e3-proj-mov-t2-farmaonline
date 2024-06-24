import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Footer from '../template/footer';
import Header from '../template/header';

const PagamentoPage = () => {
  const route = useRoute();
  const subtotal = route.params?.subtotal || 0; // Recebendo o subtotal dos parâmetros da rota
  const taxaEntrega = 10.00; // Valor fictício para a taxa de entrega
  const total = subtotal + taxaEntrega;

  const [pagamentoSelecionado, setPagamentoSelecionado] = useState(null);
  const [formaPagamentoSelecionada, setFormaPagamentoSelecionada] = useState(null);
  const [email, setEmail] = useState('');
  const [nomeCartao, setNomeCartao] = useState('');
  const [numeroCartao, setNumeroCartao] = useState('');
  const [cvv, setCvv] = useState('');
  const [validade, setValidade] = useState('');
  const [emailBoleto, setEmailBoleto] = useState('');

  const handleFormaPagamentoSelecionada = (forma) => {
    setFormaPagamentoSelecionada(forma);
    setPagamentoSelecionado(null); // Reset pagamentoSelecionado ao escolher uma nova forma de pagamento
  };

  const handlePagamentoSelecionado = (pagamento) => {
    setPagamentoSelecionado(pagamento);
    // Limpar o e-mail do boleto quando outro método de pagamento for selecionado
    if (pagamento !== 'boleto') {
      setEmailBoleto('');
    }
  };

  const validarPix = async () => {
    try {
      const response = await fetch('http://10.0.2.2:5035/api/Pagamento/Pix', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ID: 123, email }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.erro || 'Pix validado');
      }
      return true;
    } catch (error) {
      Alert.alert('Erro', error.message);
      return false;
    }
  };

  const validarCartaoCredito = async () => {
    try {
      const response = await fetch('http://10.0.2.2:5035/api/Pagamento/BoletoBancario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nomeCartao, numeroCartao, cvv, validade }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Erro ao validar cartão de crédito');
      }
      return true;
    } catch (error) {
      Alert.alert('Erro', error.message);
      return false;
    }
  };

  const validarBoleto = async () => {
    try {
      const response = await fetch('http://10.0.2.2:5035/api/Pagamento/Cartao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailBoleto }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Erro ao validar boleto');
      }
      return true;
    } catch (error) {
      Alert.alert('Erro', error.message);
      return false;
    }
  };

  const finalizarPedido = async () => {
    let isValid = false;
    if (pagamentoSelecionado === 'pix') {
      if (email === '') {
        Alert.alert('Erro', 'Por favor, insira seu e-mail para o pagamento via PIX.');
        return;
      }
      isValid = await validarPix();
    } else if (pagamentoSelecionado === 'cartaoCredito') {
      if (nomeCartao === '' || numeroCartao === '' || cvv === '' || validade === '') {
        Alert.alert('Erro', 'Por favor, preencha todos os campos do cartão de crédito.');
        return;
      }
      isValid = await validarCartaoCredito();
    } else if (pagamentoSelecionado === 'boleto') {
      if (emailBoleto === '') {
        Alert.alert('Erro', 'Por favor, insira seu e-mail para o boleto.');
        return;
      }
      isValid = await validarBoleto();
    }

    if (isValid) {
      // Simular envio de dados ao backend
      Alert.alert('Sucesso', 'Pedido finalizado com sucesso!');
    }
  };

  return (
    <View style={styles.container}>
      <Header style={styles.header} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
          <Text style={styles.titulo}>Formas de Pagamento</Text>
          <View style={styles.botoesContainer}>
            <TouchableOpacity
              accessibilityLabel="Pagar via app"
              style={[
                styles.botao,
                formaPagamentoSelecionada === 'viaApp' && styles.botaoSelecionado,
              ]}
              onPress={() => handleFormaPagamentoSelecionada('viaApp')}>
              <Text style={[
                styles.botaoTexto,
                formaPagamentoSelecionada === 'viaApp' && styles.botaoTextoSelecionado,
              ]}>Via App</Text>
            </TouchableOpacity>
            <TouchableOpacity
              accessibilityLabel="Pagar na entrega"
              style={[
                styles.botao,
                formaPagamentoSelecionada === 'naEntrega' && styles.botaoSelecionado,
              ]}
              onPress={() => handleFormaPagamentoSelecionada('naEntrega')}>
              <Text style={[
                styles.botaoTexto,
                formaPagamentoSelecionada === 'naEntrega' && styles.botaoTextoSelecionado,
              ]}>Na Entrega</Text>
            </TouchableOpacity>
          </View>
        </View>
        {formaPagamentoSelecionada && (
          <View style={styles.opcoesContainer}>
            <TouchableOpacity
              accessibilityLabel="Pagar com Pix"
              style={[
                styles.opcaoPagamento,
                pagamentoSelecionado === 'pix' && styles.opcaoPagamentoSelecionada,
              ]}
              onPress={() => handlePagamentoSelecionado('pix')}>
              <Text style={styles.opcaoPagamentoTexto}>Pix</Text>
            </TouchableOpacity>
            <TouchableOpacity
              accessibilityLabel="Pagar com Cartão de Crédito"
              style={[
                styles.opcaoPagamento,
                pagamentoSelecionado === 'cartaoCredito' && styles.opcaoPagamentoSelecionada,
              ]}
              onPress={() => handlePagamentoSelecionado('cartaoCredito')}>
              <Text style={styles.opcaoPagamentoTexto}>Cartão de Crédito</Text>
            </TouchableOpacity>
            <TouchableOpacity
              accessibilityLabel="Pagar com Boleto Bancário"
              style={[
                styles.opcaoPagamento,
                pagamentoSelecionado === 'boleto' && styles.opcaoPagamentoSelecionada,
              ]}
              onPress={() => handlePagamentoSelecionado('boleto')}>
              <Text style={styles.opcaoPagamentoTexto}>Boleto Bancário</Text>
            </TouchableOpacity>
          </View>
        )}
        {pagamentoSelecionado === 'pix' && (
          <View style={styles.informacoesPixContainer}>
            <Text style={styles.informacoesPixTitulo}>Informações sobre o PIX</Text>
            <Text style={styles.informacoesPixTexto}>
              Ao efetuar a compra utilizando Pix como método de pagamento, será enviado um código QR para o e-mail informado abaixo:
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu e-mail"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              accessibilityLabel="Campo para digitar e-mail"
            />
          </View>
        )}
        {pagamentoSelecionado === 'cartaoCredito' && (
          <View style={styles.informacoesCartaoContainer}>
            <Text style={styles.informacoesCartaoTitulo}>Informações do Cartão de Crédito</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome impresso no cartão"
              value={nomeCartao}
              onChangeText={setNomeCartao}
              accessibilityLabel="Campo para digitar nome impresso no cartão"
            />
            <TextInput
              style={styles.input}
              placeholder="Número do cartão"
              value={numeroCartao}
              onChangeText={setNumeroCartao}
              keyboardType="numeric"
              accessibilityLabel="Campo para digitar número do cartão"
            />
            <View style={styles.cartaoInfoContainer}>
              <TextInput
                style={[styles.input, styles.cvvInput]}
                placeholder="CVV"
                value={cvv}
                onChangeText={setCvv}
                keyboardType="numeric"
                accessibilityLabel="Campo para digitar CVV"
              />
              <TextInput
                style={[styles.input, styles.validadeInput]}
                placeholder="Validade"
                value={validade}
                onChangeText={setValidade}
                keyboardType="numeric"
                accessibilityLabel="Campo para digitar validade do cartão"
              />
            </View>
          </View>
        )}
        {pagamentoSelecionado === 'boleto' && (
          <View style={styles.informacoesBoletoContainer}>
            <Text style={styles.informacoesBoletoTitulo}>Informações sobre o Boleto Bancário</Text>
            <Text style={styles.informacoesBoletoTexto}>
              Ao efetuar a compra com Boleto Bancário como forma de pagamento, o boleto será enviado ao e-mail da conta cadastrada.
            </Text>
            <Text style={styles.informacoesBoletoTexto}>
              Os procedimentos de entrega serão iniciados após confirmação do pagamento.
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu e-mail"
              value={emailBoleto}
              onChangeText={setEmailBoleto}
              keyboardType="email-address"
              accessibilityLabel="Campo para digitar e-mail do boleto"
            />
          </View>
        )}
      </ScrollView>
      <View style={styles.totalBox}>
        <View style={styles.totalContainer}>
          <Text style={styles.label}>Subtotal:</Text>
          <Text style={[styles.valor, { color: '#898989' }]}>R${subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.label}>Taxa de entrega:</Text>
          <Text style={[styles.valor, { color: '#898989' }]}>R${taxaEntrega.toFixed(2)}</Text>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.label}>Total:</Text>
          <Text style={[styles.valor, { color: '#26CE55' }]}>R${total.toFixed(2)}</Text>
        </View>
        <View style={styles.botaoContainer}>
          <TouchableOpacity
            style={styles.botaoFinal}
            onPress={finalizarPedido}
            accessibilityLabel="Botão para finalizar pedido">
            <Text style={styles.botaoFinalTexto}>Finalizar Pedido</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Footer style={styles.footer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  header: {
    height: 50,
    backgroundColor: '#cccccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  botao: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
  botaoSelecionado: {
    backgroundColor: '#007bff',
  },
  botaoTexto: {
    color: '#007bff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  botaoTextoSelecionado: {
    color: '#ffffff',
  },
  opcoesContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'start',
    alignSelf: 'center',
    marginBottom: 20,
  },
  opcaoPagamento: {
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 5,
    marginHorizontal: 10,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  opcaoPagamentoTexto: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#ffffff',
    
  },
  opcaoPagamentoSelecionada: {
    borderColor: '#007bff',
  },
  informacoesPixContainer: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  informacoesPixTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#007bff',
  },
  informacoesPixTexto: {
    fontSize: 14,
    color: '#898989',
    textAlign: 'center',
    marginBottom: 10,
  },
  informacoesCartaoContainer: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  informacoesCartaoTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#007bff',
  },
  cartaoInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  cvvInput: {
    flex: 1,
    marginRight: 5,
  },
  validadeInput: {
    flex: 1,
    marginLeft: 5,
  },
  totalBox: {
    backgroundColor: '#ffffff',
    padding: 10, // Reduzindo o padding geral
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 10, // Reduzindo a margem superior
    marginBottom: 10, // Reduzindo a margem inferior
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#898989',
  },
  valor: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  botaoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  botaoFinal: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  botaoFinalTexto: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 'auto',
  },
  informacoesBoletoContainer: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  informacoesBoletoTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#007bff',
  },
  informacoesBoletoTexto: {
    fontSize: 14,
    color: '#898989',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default PagamentoPage;
