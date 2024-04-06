import React, { useState } from 'react';
import { View, Button, Image, StyleSheet, Text } from 'react-native';
import { TextInput } from 'react-native-paper';

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [celular, setCelular] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleNomeChange = (novoNome) => {
    setNome(novoNome);
  };

  const handleEmailChange = (novoEmail) => {
    setEmail(novoEmail);
  };

  const handleCelularChange = (novoCelular) => {
    setCelular(novoCelular);
  };

  const handleSenhaChange = (novaSenha) => {
    setSenha(novaSenha);
  };

  const handleConfirmarSenhaChange = (novaSenha) => {
    setConfirmarSenha(novaSenha);
  };

  const handleCadastro = () => {
    console.log('Nome:', nome);
    console.log('Email:', email);
    console.log('Celular:', celular);
    console.log('Senha:', senha);
    console.log('Confirmar Senha:', confirmarSenha);

    fetch("https://192.168.18.17:8081/api/Cadastro", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: nome,
        email: email,
        telefone: celular,
        senha: senha
      })
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Erro na requisição: ' + res.status);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Erro:', error);
        console.log('Erro', 'Não foi possível cadastrar o usuário');
      });
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/Logo1.png')} style={styles.logo} />
      <Text style={[styles.description, { color: '#74B0FF' }]}>Para criar sua conta, preencha todos os campos.</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        placeholderTextColor="#999"
        value={nome}
        onChangeText={handleNomeChange}
        left={<TextInput.Icon icon="account" color="#74B0FF"> </TextInput.Icon>}

      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#999"
        value={email}
        onChangeText={handleEmailChange}
        keyboardType="email-address"
        left={<TextInput.Icon icon="email-outline" color="#74B0FF"> </TextInput.Icon>}
      />
      <TextInput
        style={styles.input}
        placeholder="Celular"
        placeholderTextColor="#999"
        value={celular}
        onChangeText={handleCelularChange}
        keyboardType="phone-pad"
        left={<TextInput.Icon icon="cellphone" color="#74B0FF"> </TextInput.Icon>}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#999"
        value={senha}
        onChangeText={handleSenhaChange}
        secureTextEntry
        left={<TextInput.Icon icon="lock-outline" color="#74B0FF"> </TextInput.Icon>}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar Senha"
        placeholderTextColor="#999"
        value={confirmarSenha}
        onChangeText={handleConfirmarSenhaChange}
        secureTextEntry
        left={<TextInput.Icon icon="lock-outline" color="#74B0FF"> </TextInput.Icon>}
      />


      <View style={styles.buttonContainer}>
        <Button
          title="Criar conta"
          onPress={handleCadastro}
          color={'#74B0FF'}
        />
      </View>

      <View style={{ marginTop: 3 }}>
        <Text>Já tem uma conta? Clique aqui.</Text>
      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 2,
    marginBottom: 10,
    width: '100%',
    textAlign: 'left',
    backgroundColor: 'rgba(137, 137, 137, 0.1)',
  },
  logo: {
    width: 200,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 35,
  },
  description: {
    marginBottom: 20,
    fontSize: 15,
    textAlign: 'justify',
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20,
  }

});
