export type AreaKey = 'ia' | 'sustentabilidade' | 'softSkills' | 'gestao' | 'analiseDados' | 'ti';
export type NivelKey = 'iniciante' | 'intermediario' | 'avancado';

export const prompts: Record<AreaKey, Record<NivelKey, string>> = {
    ia: {
        iniciante: `
            Crie um conteúdo educativo para INICIANTES em IA/Machine Learning seguindo EXATAMENTE este formato:

            CONTEÚDO PRINCIPAL:
            - Explique o que é Inteligência Artificial de forma simples
            - Diferencie IA, Machine Learning e Deep Learning
            - Mostre exemplos práticos no dia a dia
            - Introduza conceitos básicos de como modelos aprendem

            QUESTÃO DE VERIFICAÇÃO:
            Crie UMA questão objetiva para testar o entendimento do conteúdo.
            A questão deve ter:
            - 5 alternativas (A, B, C, D, E)
            - Apenas UMA alternativa correta
            - Dificuldade adequada para iniciantes
            - Foco em conceitos fundamentais apresentados

            FORMATO JSON EXATO:
            {
                "conteudo": {
                    "titulo": "Título do conteúdo para iniciantes em IA",
                    "topicos": [
                        "Texto explicativo do tópico 1",
                        "Texto explicativo do tópico 2", 
                        "Texto explicativo do tópico 3"
                    ],
                    "exemplos": [
                        "Exemplo prático 1",
                        "Exemplo prático 2"
                    ]
                },
                "questao": {
                    "pergunta": "Texto da pergunta sobre conceitos de IA",
                    "alternativas": {
                        "A": "Texto da alternativa A",
                        "B": "Texto da alternativa B",
                        "C": "Texto da alternativa C", 
                        "D": "Texto da alternativa D",
                        "E": "Texto da alternativa E"
                    },
                    "correta": "A"
                }
            }

            Retorne APENAS o JSON válido, sem markdown, sem texto adicional.
        `,      
        intermediario: `
            Crie um conteúdo educativo para INTERMEDIÁRIOS em IA/Machine Learning seguindo EXATAMENTE este formato:

            CONTEÚDO PRINCIPAL:
            - Explique algoritmos de ML supervisionado e não supervisionado
            - Detalhe técnicas de pré-processamento e feature engineering
            - Aborde validação cruzada e métricas de avaliação
            - Introduza conceitos de overfitting e underfitting

            QUESTÃO DE VERIFICAÇÃO:
            Crie UMA questão objetiva para testar o entendimento do conteúdo.
            A questão deve ter:
            - 5 alternativas (A, B, C, D, E)
            - Apenas UMA alternativa correta
            - Dificuldade adequada para intermediários
            - Foco em aplicações práticas e técnicas apresentadas

            FORMATO JSON EXATO:
            {
                "conteudo": {
                    "titulo": "Título do conteúdo para intermediários em IA",
                    "topicos": [
                        "Texto explicativo do tópico 1",
                        "Texto explicativo do tópico 2", 
                        "Texto explicativo do tópico 3"
                    ],
                    "exemplos": [
                        "Exemplo prático 1",
                        "Exemplo prático 2"
                    ]
                },
                "questao": {
                    "pergunta": "Texto da pergunta sobre técnicas intermediárias de IA",
                    "alternativas": {
                        "A": "Texto da alternativa A",
                        "B": "Texto da alternativa B",
                        "C": "Texto da alternativa C", 
                        "D": "Texto da alternativa D",
                        "E": "Texto da alternativa E"
                    },
                    "correta": "A"
                }
            }

            Retorne APENAS o JSON válido, sem markdown, sem texto adicional.
        `,
        avancado: `
            Crie um conteúdo educativo para AVANÇADOS em IA/Machine Learning seguindo EXATAMENTE este formato:

            CONTEÚDO PRINCIPAL:
            - Explore arquiteturas complexas de Deep Learning (CNN, RNN, Transformers)
            - Detalhe técnicas de otimização e fine-tuning de modelos
            - Aborde ética em IA e vieses em algoritmos
            - Discuta implementação de modelos em produção (MLOps)

            QUESTÃO DE VERIFICAÇÃO:
            Crie UMA questão objetiva para testar o entendimento do conteúdo.
            A questão deve ter:
            - 5 alternativas (A, B, C, D, E)
            - Apenas UMA alternativa correta
            - Dificuldade adequada para avançados
            - Foco em conceitos complexos e aplicações avançadas

            FORMATO JSON EXATO:
            {
                "conteudo": {
                    "titulo": "Título do conteúdo para avançados em IA",
                    "topicos": [
                        "Texto explicativo do tópico 1",
                        "Texto explicativo do tópico 2", 
                        "Texto explicativo do tópico 3"
                    ],
                    "exemplos": [
                        "Exemplo prático 1",
                        "Exemplo prático 2"
                    ]
                },
                "questao": {
                    "pergunta": "Texto da pergunta sobre conceitos avançados de IA",
                    "alternativas": {
                        "A": "Texto da alternativa A",
                        "B": "Texto da alternativa B",
                        "C": "Texto da alternativa C", 
                        "D": "Texto da alternativa D",
                        "E": "Texto da alternativa E"
                    },
                    "correta": "A"
                }
            }

            Retorne APENAS o JSON válido, sem markdown, sem texto adicional.
        `
    },
    sustentabilidade: {
        iniciante: `
            Crie um conteúdo educativo para INICIANTES em Sustentabilidade e ESG seguindo EXATAMENTE este formato:

            CONTEÚDO PRINCIPAL:
            - Explique o que é sustentabilidade de forma simples
            - Diferencie os 3 pilares da sustentabilidade (ambiental, social, econômico)
            - Introduza conceitos básicos de ESG (Environmental, Social, Governance)
            - Mostre exemplos práticos de sustentabilidade no dia a dia

            QUESTÃO DE VERIFICAÇÃO:
            Crie UMA questão objetiva para testar o entendimento do conteúdo.
            A questão deve ter:
            - 5 alternativas (A, B, C, D, E)
            - Apenas UMA alternativa correta
            - Dificuldade adequada para iniciantes
            - Foco em conceitos fundamentais apresentados

            FORMATO JSON EXATO:
            {
                "conteudo": {
                    "titulo": "Título do conteúdo para iniciantes em Sustentabilidade",
                    "topicos": [
                        "Texto explicativo do tópico 1",
                        "Texto explicativo do tópico 2", 
                        "Texto explicativo do tópico 3"
                    ],
                    "exemplos": [
                        "Exemplo prático 1",
                        "Exemplo prático 2"
                    ]
                },
                "questao": {
                    "pergunta": "Texto da pergunta sobre conceitos básicos de sustentabilidade",
                    "alternativas": {
                        "A": "Texto da alternativa A",
                        "B": "Texto da alternativa B",
                        "C": "Texto da alternativa C", 
                        "D": "Texto da alternativa D",
                        "E": "Texto da alternativa E"
                    },
                    "correta": "A"
                }
            }

            Retorne APENAS o JSON válido, sem markdown, sem texto adicional.
        `,

        intermediario: `
            Crie um conteúdo educativo para INTERMEDIÁRIOS em Sustentabilidade e ESG seguindo EXATAMENTE este formato:

            CONTEÚDO PRINCIPAL:
            - Detalhe métricas e indicadores de sustentabilidade (pegada de carbono, LCA)
            - Explique frameworks de relatórios ESG (GRI, SASB, TCFD)
            - Aborde gestão de cadeia de suprimentos sustentável
            - Discuta energias renováveis e eficiência energética

            QUESTÃO DE VERIFICAÇÃO:
            Crie UMA questão objetiva para testar o entendimento do conteúdo.
            A questão deve ter:
            - 5 alternativas (A, B, C, D, E)
            - Apenas UMA alternativa correta
            - Dificuldade adequada para intermediários
            - Foco em aplicações práticas e métricas de sustentabilidade

            FORMATO JSON EXATO:
            {
                "conteudo": {
                    "titulo": "Título do conteúdo para intermediários em Sustentabilidade",
                    "topicos": [
                        "Texto explicativo do tópico 1",
                        "Texto explicativo do tópico 2", 
                        "Texto explicativo do tópico 3"
                    ],
                    "exemplos": [
                        "Exemplo prático 1",
                        "Exemplo prático 2"
                    ]
                },
                "questao": {
                    "pergunta": "Texto da pergunta sobre práticas intermediárias de sustentabilidade",
                    "alternativas": {
                        "A": "Texto da alternativa A",
                        "B": "Texto da alternativa B",
                        "C": "Texto da alternativa C", 
                        "D": "Texto da alternativa D",
                        "E": "Texto da alternativa E"
                    },
                    "correta": "A"
                }
            }

            Retorne APENAS o JSON válido, sem markdown, sem texto adicional.
        `,

        avancado: `
            Crie um conteúdo educativo para AVANÇADOS em Sustentabilidade e ESG seguindo EXATAMENTE este formato:

            CONTEÚDO PRINCIPAL:
            - Explore estratégias de economia circular e zero waste
            - Detalhe investimentos de impacto e green bonds
            - Aborde due diligence ESG em M&A e investimentos
            - Discuta regulamentações climáticas (Acordo de Paris, Net Zero)

            QUESTÃO DE VERIFICAÇÃO:
            Crie UMA questão objetiva para testar o entendimento do conteúdo.
            A questão deve ter:
            - 5 alternativas (A, B, C, D, E)
            - Apenas UMA alternativa correta
            - Dificuldade adequada para avançados
            - Foco em estratégias complexas e regulamentações avançadas

            FORMATO JSON EXATO:
            {
                "conteudo": {
                    "titulo": "Título do conteúdo para avançados em Sustentabilidade",
                    "topicos": [
                        "Texto explicativo do tópico 1",
                        "Texto explicativo do tópico 2", 
                        "Texto explicativo do tópico 3"
                    ],
                    "exemplos": [
                        "Exemplo prático 1",
                        "Exemplo prático 2"
                    ]
                },
                "questao": {
                    "pergunta": "Texto da pergunta sobre estratégias avançadas de sustentabilidade",
                    "alternativas": {
                        "A": "Texto da alternativa A",
                        "B": "Texto da alternativa B",
                        "C": "Texto da alternativa C", 
                        "D": "Texto da alternativa D",
                        "E": "Texto da alternativa E"
                    },
                    "correta": "A"
                }
            }

            Retorne APENAS o JSON válido, sem markdown, sem texto adicional.
        `
    },
    softSkills: {
        iniciante: `
            Crie um conteúdo educativo para INICIANTES em Soft Skills seguindo EXATAMENTE este formato:

            CONTEÚDO PRINCIPAL:
            - Explique o que são soft skills e sua importância no mercado de trabalho
            - Diferencie hard skills e soft skills com exemplos práticos
            - Introduza comunicação eficaz e escuta ativa
            - Aborde trabalho em equipe e colaboração básica

            QUESTÃO DE VERIFICAÇÃO:
            Crie UMA questão objetiva para testar o entendimento do conteúdo.
            A questão deve ter:
            - 5 alternativas (A, B, C, D, E)
            - Apenas UMA alternativa correta
            - Dificuldade adequada para iniciantes
            - Foco em conceitos fundamentais de soft skills

            FORMATO JSON EXATO:
            {
                "conteudo": {
                    "titulo": "Título do conteúdo para iniciantes em Soft Skills",
                    "topicos": [
                        "Texto explicativo do tópico 1",
                        "Texto explicativo do tópico 2", 
                        "Texto explicativo do tópico 3"
                    ],
                    "exemplos": [
                        "Exemplo prático 1",
                        "Exemplo prático 2"
                    ]
                },
                "questao": {
                    "pergunta": "Texto da pergunta sobre conceitos básicos de soft skills",
                    "alternativas": {
                        "A": "Texto da alternativa A",
                        "B": "Texto da alternativa B",
                        "C": "Texto da alternativa C", 
                        "D": "Texto da alternativa D",
                        "E": "Texto da alternativa E"
                    },
                    "correta": "A"
                }
            }

            Retorne APENAS o JSON válido, sem markdown, sem texto adicional.
        `,

        intermediario: `
            Crie um conteúdo educativo para INTERMEDIÁRIOS em Soft Skills seguindo EXATAMENTE este formato:

            CONTEÚDO PRINCIPAL:
            - Detalhe técnicas de comunicação não-violenta e feedback construtivo
            - Explique gestão de conflitos e mediação em equipes
            - Aborde inteligência emocional e autoconhecimento
            - Discuta apresentações eficazes e storytelling profissional

            QUESTÃO DE VERIFICAÇÃO:
            Crie UMA questão objetiva para testar o entendimento do conteúdo.
            A questão deve ter:
            - 5 alternativas (A, B, C, D, E)
            - Apenas UMA alternativa correta
            - Dificuldade adequada para intermediários
            - Foco em aplicações práticas de soft skills intermediárias

            FORMATO JSON EXATO:
            {
                "conteudo": {
                    "titulo": "Título do conteúdo para intermediários em Soft Skills",
                    "topicos": [
                        "Texto explicativo do tópico 1",
                        "Texto explicativo do tópico 2", 
                        "Texto explicativo do tópico 3"
                    ],
                    "exemplos": [
                        "Exemplo prático 1",
                        "Exemplo prático 2"
                    ]
                },
                "questao": {
                    "pergunta": "Texto da pergunta sobre técnicas intermediárias de soft skills",
                    "alternativas": {
                        "A": "Texto da alternativa A",
                        "B": "Texto da alternativa B",
                        "C": "Texto da alternativa C", 
                        "D": "Texto da alternativa D",
                        "E": "Texto da alternativa E"
                    },
                    "correta": "A"
                }
            }

            Retorne APENAS o JSON válido, sem markdown, sem texto adicional.
        `,

        avancado: `
            Crie um conteúdo educativo para AVANÇADOS em Soft Skills seguindo EXATAMENTE este formato:

            CONTEÚDO PRINCIPAL:
            - Explore liderança transformacional e gestão de mudanças
            - Detalhe negociação complexa e influência estratégica
            - Aborde gestão de stakeholders e política organizacional
            - Discuta mentoring, coaching e desenvolvimento de talentos

            QUESTÃO DE VERIFICAÇÃO:
            Crie UMA questão objetiva para testar o entendimento do conteúdo.
            A questão deve ter:
            - 5 alternativas (A, B, C, D, E)
            - Apenas UMA alternativa correta
            - Dificuldade adequada para avançados
            - Foco em estratégias avançadas de liderança e influência

            FORMATO JSON EXATO:
            {
                "conteudo": {
                    "titulo": "Título do conteúdo para avançados em Soft Skills",
                    "topicos": [
                        "Texto explicativo do tópico 1",
                        "Texto explicativo do tópico 2", 
                        "Texto explicativo do tópico 3"
                    ],
                    "exemplos": [
                        "Exemplo prático 1",
                        "Exemplo prático 2"
                    ]
                },
                "questao": {
                    "pergunta": "Texto da pergunta sobre estratégias avançadas de soft skills",
                    "alternativas": {
                        "A": "Texto da alternativa A",
                        "B": "Texto da alternativa B",
                        "C": "Texto da alternativa C", 
                        "D": "Texto da alternativa D",
                        "E": "Texto da alternativa E"
                    },
                    "correta": "A"
                }
            }

            Retorne APENAS o JSON válido, sem markdown, sem texto adicional.
        `
    },
    gestao: {
        iniciante: `
            Crie um conteúdo educativo para INICIANTES em Gestão seguindo EXATAMENTE este formato:

            CONTEÚDO PRINCIPAL:
            - Explique os conceitos básicos de gestão e administração
            - Diferencie os tipos de gestão (projetos, pessoas, processos)
            - Introduza o ciclo PDCA (Plan-Do-Check-Act)
            - Aborde noções básicas de planejamento e organização

            QUESTÃO DE VERIFICAÇÃO:
            Crie UMA questão objetiva para testar o entendimento do conteúdo.
            A questão deve ter:
            - 5 alternativas (A, B, C, D, E)
            - Apenas UMA alternativa correta
            - Dificuldade adequada para iniciantes
            - Foco em conceitos fundamentais de gestão

            FORMATO JSON EXATO:
            {
                "conteudo": {
                    "titulo": "Título do conteúdo para iniciantes em Gestão",
                    "topicos": [
                        "Texto explicativo do tópico 1",
                        "Texto explicativo do tópico 2", 
                        "Texto explicativo do tópico 3"
                    ],
                    "exemplos": [
                        "Exemplo prático 1",
                        "Exemplo prático 2"
                    ]
                },
                "questao": {
                    "pergunta": "Texto da pergunta sobre conceitos básicos de gestão",
                    "alternativas": {
                        "A": "Texto da alternativa A",
                        "B": "Texto da alternativa B",
                        "C": "Texto da alternativa C", 
                        "D": "Texto da alternativa D",
                        "E": "Texto da alternativa E"
                    },
                    "correta": "A"
                }
            }

            Retorne APENAS o JSON válido, sem markdown, sem texto adicional.
        `,

        intermediario: `
            Crie um conteúdo educativo para INTERMEDIÁRIOS em Gestão seguindo EXATAMENTE este formato:

            CONTEÚDO PRINCIPAL:
            - Detalhe metodologias ágeis (Scrum, Kanban) e gestão de projetos
            - Explique gestão de desempenho e avaliação de resultados
            - Aborde orçamentação e controle financeiro básico
            - Discuta gestão de equipes e delegação eficaz

            QUESTÃO DE VERIFICAÇÃO:
            Crie UMA questão objetiva para testar o entendimento do conteúdo.
            A questão deve ter:
            - 5 alternativas (A, B, C, D, E)
            - Apenas UMA alternativa correta
            - Dificuldade adequada para intermediários
            - Foco em técnicas práticas de gestão intermediária

            FORMATO JSON EXATO:
            {
                "conteudo": {
                    "titulo": "Título do conteúdo para intermediários em Gestão",
                    "topicos": [
                        "Texto explicativo do tópico 1",
                        "Texto explicativo do tópico 2", 
                        "Texto explicativo do tópico 3"
                    ],
                    "exemplos": [
                        "Exemplo prático 1",
                        "Exemplo prático 2"
                    ]
                },
                "questao": {
                    "pergunta": "Texto da pergunta sobre técnicas intermediárias de gestão",
                    "alternativas": {
                        "A": "Texto da alternativa A",
                        "B": "Texto da alternativa B",
                        "C": "Texto da alternativa C", 
                        "D": "Texto da alternativa D",
                        "E": "Texto da alternativa E"
                    },
                    "correta": "A"
                }
            }

            Retorne APENAS o JSON válido, sem markdown, sem texto adicional.
        `,

        avancado: `
            Crie um conteúdo educativo para AVANÇADOS em Gestão seguindo EXATAMENTE este formato:

            CONTEÚDO PRINCIPAL:
            - Explore estratégia organizacional e gestão da mudança
            - Detalhe governança corporativa e compliance
            - Aborde gestão de riscos e tomada de decisão complexa
            - Discuta liderança executiva e gestão de stakeholders

            QUESTÃO DE VERIFICAÇÃO:
            Crie UMA questão objetiva para testar o entendimento do conteúdo.
            A questão deve ter:
            - 5 alternativas (A, B, C, D, E)
            - Apenas UMA alternativa correta
            - Dificuldade adequada para avançados
            - Foco em estratégias avançadas e governança corporativa

            FORMATO JSON EXATO:
            {
                "conteudo": {
                    "titulo": "Título do conteúdo para avançados em Gestão",
                    "topicos": [
                        "Texto explicativo do tópico 1",
                        "Texto explicativo do tópico 2", 
                        "Texto explicativo do tópico 3"
                    ],
                    "exemplos": [
                        "Exemplo prático 1",
                        "Exemplo prático 2"
                    ]
                },
                "questao": {
                    "pergunta": "Texto da pergunta sobre estratégias avançadas de gestão",
                    "alternativas": {
                        "A": "Texto da alternativa A",
                        "B": "Texto da alternativa B",
                        "C": "Texto da alternativa C", 
                        "D": "Texto da alternativa D",
                        "E": "Texto da alternativa E"
                    },
                    "correta": "A"
                }
            }

            Retorne APENAS o JSON válido, sem markdown, sem texto adicional.
        `
    },
    analiseDados: {
        iniciante: `
            Crie um conteúdo educativo para INICIANTES em Análise de Dados seguindo EXATAMENTE este formato:

            CONTEÚDO PRINCIPAL:
            - Explique o que é análise de dados e sua importância nas organizações
            - Diferencie dados estruturados e não estruturados
            - Introduza conceitos básicos de estatística descritiva (média, mediana, moda)
            - Aborde visualização de dados simples com gráficos básicos

            QUESTÃO DE VERIFICAÇÃO:
            Crie UMA questão objetiva para testar o entendimento do conteúdo.
            A questão deve ter:
            - 5 alternativas (A, B, C, D, E)
            - Apenas UMA alternativa correta
            - Dificuldade adequada para iniciantes
            - Foco em conceitos fundamentais de análise de dados

            FORMATO JSON EXATO:
            {
                "conteudo": {
                    "titulo": "Título do conteúdo para iniciantes em Análise de Dados",
                    "topicos": [
                        "Texto explicativo do tópico 1",
                        "Texto explicativo do tópico 2", 
                        "Texto explicativo do tópico 3"
                    ],
                    "exemplos": [
                        "Exemplo prático 1",
                        "Exemplo prático 2"
                    ]
                },
                "questao": {
                    "pergunta": "Texto da pergunta sobre conceitos básicos de análise de dados",
                    "alternativas": {
                        "A": "Texto da alternativa A",
                        "B": "Texto da alternativa B",
                        "C": "Texto da alternativa C", 
                        "D": "Texto da alternativa D",
                        "E": "Texto da alternativa E"
                    },
                    "correta": "A"
                }
            }

            Retorne APENAS o JSON válido, sem markdown, sem texto adicional.
        `,

        intermediario: `
            Crie um conteúdo educativo para INTERMEDIÁRIOS em Análise de Dados seguindo EXATAMENTE este formato:

            CONTEÚDO PRINCIPAL:
            - Detalhe técnicas de limpeza e preparação de dados (ETL)
            - Explique análise exploratória de dados (EDA) avançada
            - Aborde correlação, regressão e testes de hipóteses
            - Discuta ferramentas de BI (Power BI, Tableau) e SQL intermediário

            QUESTÃO DE VERIFICAÇÃO:
            Crie UMA questão objetiva para testar o entendimento do conteúdo.
            A questão deve ter:
            - 5 alternativas (A, B, C, D, E)
            - Apenas UMA alternativa correta
            - Dificuldade adequada para intermediários
            - Foco em técnicas práticas de análise intermediária

            FORMATO JSON EXATO:
            {
                "conteudo": {
                    "titulo": "Título do conteúdo para intermediários em Análise de Dados",
                    "topicos": [
                        "Texto explicativo do tópico 1",
                        "Texto explicativo do tópico 2", 
                        "Texto explicativo do tópico 3"
                    ],
                    "exemplos": [
                        "Exemplo prático 1",
                        "Exemplo prático 2"
                    ]
                },
                "questao": {
                    "pergunta": "Texto da pergunta sobre técnicas intermediárias de análise de dados",
                    "alternativas": {
                        "A": "Texto da alternativa A",
                        "B": "Texto da alternativa B",
                        "C": "Texto da alternativa C", 
                        "D": "Texto da alternativa D",
                        "E": "Texto da alternativa E"
                    },
                    "correta": "A"
                }
            }

            Retorne APENAS o JSON válido, sem markdown, sem texto adicional.
        `,

        avancado: `
            Crie um conteúdo educativo para AVANÇADOS em Análise de Dados seguindo EXATAMENTE este formato:

            CONTEÚDO PRINCIPAL:
            - Explore machine learning aplicado à análise preditiva
            - Detalhe análise de séries temporais e forecasting
            - Aborde big data e processamento distribuído (Spark, Hadoop)
            - Discuta data storytelling e tomada de decisão baseada em dados

            QUESTÃO DE VERIFICAÇÃO:
            Crie UMA questão objetiva para testar o entendimento do conteúdo.
            A questão deve ter:
            - 5 alternativas (A, B, C, D, E)
            - Apenas UMA alternativa correta
            - Dificuldade adequada para avançados
            - Foco em técnicas avançadas e análise preditiva

            FORMATO JSON EXATO:
            {
                "conteudo": {
                    "titulo": "Título do conteúdo para avançados em Análise de Dados",
                    "topicos": [
                        "Texto explicativo do tópico 1",
                        "Texto explicativo do tópico 2", 
                        "Texto explicativo do tópico 3"
                    ],
                    "exemplos": [
                        "Exemplo prático 1",
                        "Exemplo prático 2"
                    ]
                },
                "questao": {
                    "pergunta": "Texto da pergunta sobre técnicas avançadas de análise de dados",
                    "alternativas": {
                        "A": "Texto da alternativa A",
                        "B": "Texto da alternativa B",
                        "C": "Texto da alternativa C", 
                        "D": "Texto da alternativa D",
                        "E": "Texto da alternativa E"
                    },
                    "correta": "A"
                }
            }

            Retorne APENAS o JSON válido, sem markdown, sem texto adicional.
        `
    },
    ti: {
        iniciante: `
            Crie um conteúdo educativo para INICIANTES em Tecnologia da Informação seguindo EXATAMENTE este formato:

            CONTEÚDO PRINCIPAL:
            - Explique os conceitos básicos de TI e infraestrutura de tecnologia
            - Diferencie hardware, software e sistemas operacionais
            - Introduza redes de computadores e conceitos de internet
            - Aborde noções básicas de segurança da informação e cibersegurança

            QUESTÃO DE VERIFICAÇÃO:
            Crie UMA questão objetiva para testar o entendimento do conteúdo.
            A questão deve ter:
            - 5 alternativas (A, B, C, D, E)
            - Apenas UMA alternativa correta
            - Dificuldade adequada para iniciantes
            - Foco em conceitos fundamentais de tecnologia da informação

            FORMATO JSON EXATO:
            {
                "conteudo": {
                    "titulo": "Título do conteúdo para iniciantes em Tecnologia da Informação",
                    "topicos": [
                        "Texto explicativo do tópico 1",
                        "Texto explicativo do tópico 2", 
                        "Texto explicativo do tópico 3"
                    ],
                    "exemplos": [
                        "Exemplo prático 1",
                        "Exemplo prático 2"
                    ]
                },
                "questao": {
                    "pergunta": "Texto da pergunta sobre conceitos básicos de TI",
                    "alternativas": {
                        "A": "Texto da alternativa A",
                        "B": "Texto da alternativa B",
                        "C": "Texto da alternativa C", 
                        "D": "Texto da alternativa D",
                        "E": "Texto da alternativa E"
                    },
                    "correta": "A"
                }
            }

            Retorne APENAS o JSON válido, sem markdown, sem texto adicional.
        `,

        intermediario: `
            Crie um conteúdo educativo para INTERMEDIÁRIOS em Tecnologia da Informação seguindo EXATAMENTE este formato:

            CONTEÚDO PRINCIPAL:
            - Detalhe administração de sistemas e redes corporativas
            - Explique virtualização e conceitos de cloud computing
            - Aborde gestão de bancos de dados e administração de BD
            - Discuta DevOps básico e pipelines de CI/CD

            QUESTÃO DE VERIFICAÇÃO:
            Crie UMA questão objetiva para testar o entendimento do conteúdo.
            A questão deve ter:
            - 5 alternativas (A, B, C, D, E)
            - Apenas UMA alternativa correta
            - Dificuldade adequada para intermediários
            - Foco em administração de sistemas e infraestrutura

            FORMATO JSON EXATO:
            {
                "conteudo": {
                    "titulo": "Título do conteúdo para intermediários em Tecnologia da Informação",
                    "topicos": [
                        "Texto explicativo do tópico 1",
                        "Texto explicativo do tópico 2", 
                        "Texto explicativo do tópico 3"
                    ],
                    "exemplos": [
                        "Exemplo prático 1",
                        "Exemplo prático 2"
                    ]
                },
                "questao": {
                    "pergunta": "Texto da pergunta sobre administração de sistemas e infraestrutura",
                    "alternativas": {
                        "A": "Texto da alternativa A",
                        "B": "Texto da alternativa B",
                        "C": "Texto da alternativa C", 
                        "D": "Texto da alternativa D",
                        "E": "Texto da alternativa E"
                    },
                    "correta": "A"
                }
            }

            Retorne APENAS o JSON válido, sem markdown, sem texto adicional.
        `,

        avancado: `
            Crie um conteúdo educativo para AVANÇADOS em Tecnologia da Informação seguindo EXATAMENTE este formato:

            CONTEÚDO PRINCIPAL:
            - Explore arquitetura de soluções em nuvem (AWS, Azure, GCP)
            - Detalhe segurança cibernética avançada e ethical hacking
            - Aborde arquitetura de microserviços e containers (Docker, Kubernetes)
            - Discuta governança de TI e transformação digital corporativa

            QUESTÃO DE VERIFICAÇÃO:
            Crie UMA questão objetiva para testar o entendimento do conteúdo.
            A questão deve ter:
            - 5 alternativas (A, B, C, D, E)
            - Apenas UMA alternativa correta
            - Dificuldade adequada para avançados
            - Foco em arquitetura cloud e segurança avançada

            FORMATO JSON EXATO:
            {
                "conteudo": {
                    "titulo": "Título do conteúdo para avançados em Tecnologia da Informação",
                    "topicos": [
                        "Texto explicativo do tópico 1",
                        "Texto explicativo do tópico 2", 
                        "Texto explicativo do tópico 3"
                    ],
                    "exemplos": [
                        "Exemplo prático 1",
                        "Exemplo prático 2"
                    ]
                },
                "questao": {
                    "pergunta": "Texto da pergunta sobre arquitetura cloud e segurança avançada",
                    "alternativas": {
                        "A": "Texto da alternativa A",
                        "B": "Texto da alternativa B",
                        "C": "Texto da alternativa C", 
                        "D": "Texto da alternativa D",
                        "E": "Texto da alternativa E"
                    },
                    "correta": "A"
                }
            }

            Retorne APENAS o JSON válido, sem markdown, sem texto adicional.
        `
    }
}

export const areaMap: Record<string, AreaKey> = {
  'ia': 'ia',
  'sustentabilidade': 'sustentabilidade', 
  'softSkills': 'softSkills',
  'gestao': 'gestao',
  'analiseDados': 'analiseDados',
  'ti': 'ti'
};

export function getPrompt(area: string, nivel: string): string | null {
  const areaKey = areaMap[area];
  if (areaKey && prompts[areaKey] && nivel in prompts[areaKey]) {
    return prompts[areaKey][nivel as NivelKey];
  }
  return null;
}