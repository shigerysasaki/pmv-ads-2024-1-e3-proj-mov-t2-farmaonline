import React, { useState } from 'react';
import { View, TextInput} from 'react-native';

export default function Cadastro() {

  const [texto, setTexto] = useState('');

  const handleInputChange = (novoTexto) => {
    setTexto(novoTexto);
  };

  return (
    <View>
      <TextInput
        placeholder="Nome completo"
        value={texto}
        onChangeText={handleInputChange}
      />
    </View>
  )
}