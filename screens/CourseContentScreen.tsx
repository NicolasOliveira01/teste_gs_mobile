import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  TouchableOpacity, 
  ScrollView
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigation';
import { generateLearningContent } from '../services/aiService';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { showAlert } from '../config/utils';

type CourseContentScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CourseContent'
>;

type Props = {
  navigation: CourseContentScreenNavigationProp;
  route: {
    params: {
      courseId: string;
      area: string;
      nivel: string;
    }
  };
};

type ConteudoType = {
  titulo: string;
  topicos: string[];
  exemplos: string[];
};

type QuestaoType = {
  pergunta: string;
  alternativas: {
    A: string;
    B: string;
    C: string;
    D: string;
    E: string;
  };
  correta: string;
};

type ConteudoCompletoType = {
  conteudo: ConteudoType;
  questao: QuestaoType;
};

export default function CourseContentScreen({ route, navigation }: Props) {
  const { courseId, area, nivel } = route.params;
  const [conteudoCompleto, setConteudoCompleto] = useState<ConteudoCompletoType | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [respostaSelecionada, setRespostaSelecionada] = useState<string>('');
  const [questaoRespondida, setQuestaoRespondida] = useState(false);
  const [acertou, setAcertou] = useState(false);
  const [atualizandoConclusao, setAtualizandoConclusao] = useState(false);

  useEffect(() => {
    const carregarConteudo = async () => {
      try {
        setCarregando(true);
        const resultado = await generateLearningContent(area, nivel);
        setConteudoCompleto(resultado);
      } catch (error) {
        console.log('Erro ao carregar conteúdo:', error);
        showAlert('Erro ao carregar conteúdo do curso', 'error');
      } finally {
        setCarregando(false);
      }
    };

    carregarConteudo();
  }, [area, nivel]);

  const verificarResposta = async () => {
    if (!respostaSelecionada || !conteudoCompleto) return;

    const respostaCorreta = respostaSelecionada === conteudoCompleto.questao.correta;
    setAcertou(respostaCorreta);
    setQuestaoRespondida(true);

    if (respostaCorreta) {
      await marcarCursoComoConcluido();
      showAlert('🎉 Parabéns! Você acertou e concluiu este curso!', 'success');
    } else {
      showAlert('❌ Resposta incorreta. Tente novamente!', 'error');
    }
  };

  const marcarCursoComoConcluido = async () => {
    try {
      setAtualizandoConclusao(true);
      const userId = auth().currentUser?.uid;
      if (!userId) return;

      await database().ref(`/users/${userId}/Courses/${courseId}/concluido`).set(true);
      console.log('Curso marcado como concluído:', courseId);
    } catch (error) {
      console.log('Erro ao atualizar conclusão:', error);
      showAlert('Erro ao salvar progresso', 'error');
    } finally {
      setAtualizandoConclusao(false);
    }
  };

  const reiniciarQuestao = () => {
    setRespostaSelecionada('');
    setQuestaoRespondida(false);
    setAcertou(false);
  };

  if (carregando) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2563EB" />
          <Text style={styles.loadingText}>Gerando conteúdo personalizado... 🤖</Text>
        </View>
      </View>
    );
  }

  if (!conteudoCompleto) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Erro ao carregar conteúdo</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.title}>Conteúdo do Curso</Text>
      
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>ID do Curso: {courseId}</Text>
        <Text style={styles.infoText}>Área: {area}</Text>
        <Text style={styles.infoText}>Nível: {nivel}</Text>
      </View>

      {/* Conteúdo Gerado */}
      <View style={styles.contentContainer}>
        <Text style={styles.contentTitle}>📚 {conteudoCompleto.conteudo.titulo}</Text>
        
        <Text style={styles.sectionTitle}>Principais Tópicos:</Text>
        {conteudoCompleto.conteudo.topicos.map((topico, index) => (
          <Text key={index} style={styles.topicoText}>• {topico}</Text>
        ))}
        
        <Text style={styles.sectionTitle}>Exemplos Práticos:</Text>
        {conteudoCompleto.conteudo.exemplos.map((exemplo, index) => (
          <Text key={index} style={styles.exemploText}>💡 {exemplo}</Text>
        ))}
      </View>

      {/* Questão */}
      <View style={styles.questaoContainer}>
        <Text style={styles.questaoTitle}>❓ Questão de Verificação</Text>
        <Text style={styles.perguntaText}>{conteudoCompleto.questao.pergunta}</Text>

        {/* Alternativas */}
        {Object.entries(conteudoCompleto.questao.alternativas).map(([letra, texto]) => (
          <TouchableOpacity
            key={letra}
            style={[
              styles.alternativaButton,
              respostaSelecionada === letra && !questaoRespondida && styles.alternativaSelecionada,
              questaoRespondida && acertou && letra === conteudoCompleto.questao.correta && styles.alternativaCorreta,
              questaoRespondida && !acertou && respostaSelecionada === letra && styles.alternativaIncorreta
            ]}
            onPress={() => !questaoRespondida && setRespostaSelecionada(letra)}
            disabled={questaoRespondida}
          >
            <Text style={[
              styles.alternativaTexto,
              respostaSelecionada === letra && !questaoRespondida && styles.alternativaTextoSelecionado,
              questaoRespondida && acertou && letra === conteudoCompleto.questao.correta && styles.alternativaTextoCorreto,
              questaoRespondida && !acertou && respostaSelecionada === letra && styles.alternativaTextoIncorreto
            ]}>
              {letra}. {texto}
            </Text>
          </TouchableOpacity>
        ))}

        {/* Botões de Ação */}
        {!questaoRespondida ? (
          <TouchableOpacity
            style={[styles.botaoVerificar, !respostaSelecionada && styles.botaoDesabilitado]}
            onPress={verificarResposta}
            disabled={!respostaSelecionada || atualizandoConclusao}
          >
            {atualizandoConclusao ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.botaoVerificarTexto}>Verificar Resposta</Text>
            )}
          </TouchableOpacity>
        ) : (
          <View style={styles.resultadoContainer}>
            <Text style={acertou ? styles.resultadoAcerto : styles.resultadoErro}>
              {acertou ? '✅ Parabéns! Você acertou!' : '❌ Resposta incorreta'}
            </Text>
            {!acertou && (
              <TouchableOpacity
                style={styles.botaoReiniciar}
                onPress={reiniciarQuestao}
              >
                <Text style={styles.botaoReiniciarTexto}>Tentar Novamente</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#dc2626',
    textAlign: 'center',
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  infoContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666',
  },
  contentContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  contentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 8,
    color: '#444',
  },
  topicoText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 6,
    color: '#555',
  },
  exemploText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
    color: '#666',
    fontStyle: 'italic',
  },
  questaoContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  questaoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  perguntaText: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 20,
    color: '#444',
  },
  alternativaButton: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  alternativaSelecionada: {
    borderColor: '#2563EB',
    backgroundColor: '#dbeafe',
  },
  alternativaCorreta: {
    borderColor: '#059669',
    backgroundColor: '#d1fae5',
  },
  alternativaIncorreta: {
    borderColor: '#dc2626',
    backgroundColor: '#fecaca',
  },
  alternativaTexto: {
    fontSize: 14,
    color: '#333',
  },
  alternativaTextoSelecionado: {
    fontWeight: 'bold',
    color: '#2563EB',
  },
  alternativaTextoCorreto: {
    fontWeight: 'bold',
    color: '#059669',
  },
  alternativaTextoIncorreto: {
    fontWeight: 'bold',
    color: '#dc2626',
  },
  botaoVerificar: {
    backgroundColor: '#2563EB',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  botaoDesabilitado: {
    backgroundColor: '#9ca3af',
    opacity: 0.6,
  },
  botaoVerificarTexto: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultadoContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  resultadoAcerto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 15,
  },
  resultadoErro: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#dc2626',
    marginBottom: 15,
  },
  botaoReiniciar: {
    backgroundColor: '#6b7280',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '60%',
  },
  botaoReiniciarTexto: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});