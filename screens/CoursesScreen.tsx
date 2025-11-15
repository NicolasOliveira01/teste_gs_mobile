// CoursesScreen.tsx - COM SCROLL
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ActivityIndicator, 
  ScrollView  // ✅ Adicione esta importação
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigation';

import { generateLearningContent } from '../services/aiService';

type CoursesScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Courses'
>;

type Props = {
  navigation: CoursesScreenNavigationProp;
  route: {
    params?: {
      userData?: {
        areaInteresse: string;
        nivelArea: string;
        nome?: string;
      }
    }
  };
};

export default function CoursesScreen({ route }: Props) {
  const [conteudo, setConteudo] = useState<any>(null);
  const [carregando, setCarregando] = useState(false);

  const userData = route.params?.userData || {
    areaInteresse: 'IA',
    nivelArea: 'iniciante',
    nome: 'Usuário'
  };

  const carregarConteudoIA = async () => {
    setCarregando(true);
    try {
      const resultado = await generateLearningContent(
        userData.areaInteresse, 
        userData.nivelArea
      );
      setConteudo(resultado);
    } catch (error) {
      console.log('Erro ao carregar conteúdo:', error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarConteudoIA();
  }, []);

  return (
    // ✅ ENVOLVA TUDO EM SCROLLVIEW
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        Trilhas
      </Text>

      {carregando && (
        <View style={{ alignItems: 'center', marginVertical: 20 }}>
          <ActivityIndicator size="large" />
          <Text style={{ marginTop: 10 }}>IA gerando conteúdo personalizado... 🤖</Text>
        </View>
      )}

      {conteudo && (
        <View>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
            🎯 Roadmap:
          </Text>
          {/* {conteudo.roadmap.map((passo: string, index: number) => (
            <Text key={index} style={{ marginBottom: 8, lineHeight: 20 }}>• {passo}</Text>
          ))} */}
        </View>
      )}

      <TouchableOpacity 
        style={{ 
          backgroundColor: '#2563EB', 
          padding: 15, 
          borderRadius: 10, 
          alignItems: 'center',
          marginTop: 30,
          marginBottom: 20 // ✅ Adicione margem inferior para não cortar
        }}
        onPress={carregarConteudoIA}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>🔄 Gerar Novo Conteúdo</Text>
      </TouchableOpacity>
    </ScrollView> // ✅ FECHE O SCROLLVIEW
  );
}