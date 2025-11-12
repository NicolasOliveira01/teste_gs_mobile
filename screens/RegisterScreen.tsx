import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigation';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { showAlert } from '../config/utils';
import { FIAP_COLORS } from '../config/colors';

type RegisterScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Register'
>;

type Props = {
  navigation: RegisterScreenNavigationProp;
};

export default function RegisterScreen({ navigation }: Props) {
  // Campos de login
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  // Campos pessoais
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [idade, setIdade] = useState('');
  const [curso, setCurso] = useState('');
  const [celular, setCelular] = useState('');
  const [estagio, setEstagio] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !senha || !nome || !sobrenome || !idade ||  !curso || !celular) {
      showAlert('Preencha todos os campos obrigatórios!', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showAlert('Email inválido!', 'error');
      return;
    }

    if (senha.length < 6) {
      showAlert('A senha deve ter no mínimo 6 caracteres!', 'error');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, senha);
      const userId = userCredential.user.uid;

      await database().ref(`/users/${userId}`).set({
        nome,
        sobrenome,
        idade,
        curso,
        celular,
        estagio: estagio || '',
        email,
        criadoEm: new Date().toISOString(),
      });

      showAlert('Conta criada com sucesso!', 'success');
      navigation.navigate('Login');
    } catch (error: any) {
      console.log(error);
      showAlert('Erro ao criar conta. Email pode já estar em uso.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Cadastro</Text>

      {/* Seção Login */}
      <Text style={styles.subtitle}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!loading}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#aaa"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        editable={!loading}
      />

      {/* Seção Dados Pessoais */}
      <Text style={styles.subtitle}>Dados Pessoais</Text>
      <TextInput style={styles.input} placeholder="Nome" placeholderTextColor="#aaa" value={nome} onChangeText={setNome} editable={!loading} />
      <TextInput style={styles.input} placeholder="Sobrenome" placeholderTextColor="#aaa" value={sobrenome} onChangeText={setSobrenome} editable={!loading} />
      <TextInput style={styles.input} placeholder="Idade" placeholderTextColor="#aaa" value={idade} onChangeText={setIdade} keyboardType="numeric" editable={!loading} />
      <TextInput style={styles.input} placeholder="Curso" placeholderTextColor="#aaa" value={curso} onChangeText={setCurso} editable={!loading} />
      <TextInput style={styles.input} placeholder="Celular" placeholderTextColor="#aaa" value={celular} onChangeText={setCelular} keyboardType="phone-pad" editable={!loading} />
      <TextInput style={styles.input} placeholder="Estágio (opcional)" placeholderTextColor="#aaa" value={estagio} onChangeText={setEstagio} editable={!loading} />

      {/* Botão Cadastrar */}
      <TouchableOpacity
        style={[styles.button, { marginTop: 20 }, loading && { opacity: 0.7 }]}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Cadastrar</Text>}
      </TouchableOpacity>

      {/* Botão Voltar ao Login */}
      <TouchableOpacity style={[styles.button, { backgroundColor: '#555' }]} onPress={() => navigation.navigate('Login')} disabled={loading}>
        <Text style={styles.buttonText}>Voltar ao Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: FIAP_COLORS.BACKGROUND,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: FIAP_COLORS.COLOR,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: FIAP_COLORS.COLOR,
    marginTop: 15,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    color: '#fff',
    backgroundColor: '#333',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: FIAP_COLORS.COLOR,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});