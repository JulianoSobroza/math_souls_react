import { Category, Question } from '../App';

export const categories: Category[] = [
  {
    id: 'aritmetica',
    name: 'Aritmética',
    icon: '🔢',
    subcategories: [
      {
        id: 'divisibilidade',
        name: 'Divisibilidade',
        description: 'Critérios de divisibilidade, MDC e MMC',
        questionCount: 15
      },
      {
        id: 'numeros-primos',
        name: 'Números Primos',
        description: 'Fatoração, primalidade e teoremas',
        questionCount: 12
      },
      {
        id: 'porcentagem',
        name: 'Porcentagem',
        description: 'Cálculos percentuais e aplicações',
        questionCount: 18
      }
    ]
  },
  {
    id: 'algebra',
    name: 'Álgebra',
    icon: '📐',
    subcategories: [
      {
        id: 'equacoes-1-grau',
        name: 'Equações 1º Grau',
        description: 'Sistemas e problemas lineares',
        questionCount: 20
      },
      {
        id: 'equacoes-2-grau',
        name: 'Equações 2º Grau',
        description: 'Bhaskara, Viète e aplicações',
        questionCount: 22
      },
      {
        id: 'funcoes',
        name: 'Funções',
        description: 'Funções lineares, quadráticas e exponenciais',
        questionCount: 25
      },
      {
        id: 'polinomios',
        name: 'Polinômios',
        description: 'Operações e teoremas',
        questionCount: 16
      }
    ]
  },
  {
    id: 'geometria',
    name: 'Geometria',
    icon: '📏',
    subcategories: [
      {
        id: 'geometria-plana',
        name: 'Geometria Plana',
        description: 'Áreas e perímetros',
        questionCount: 18
      },
      {
        id: 'geometria-espacial',
        name: 'Geometria Espacial',
        description: 'Volumes e superfícies',
        questionCount: 14
      },
      {
        id: 'geometria-analitica',
        name: 'Geometria Analítica',
        description: 'Distâncias, retas e circunferências',
        questionCount: 20
      }
    ]
  },
  {
    id: 'trigonometria',
    name: 'Trigonometria',
    icon: '📊',
    subcategories: [
      {
        id: 'razoes-trigonometricas',
        name: 'Razões Trigonométricas',
        description: 'Seno, cosseno e tangente',
        questionCount: 15
      },
      {
        id: 'identidades',
        name: 'Identidades',
        description: 'Fórmulas e transformações',
        questionCount: 17
      },
      {
        id: 'equacoes-trigonometricas',
        name: 'Equações Trigonométricas',
        description: 'Resolução e sistemas',
        questionCount: 13
      }
    ]
  }
];

export const questions: Question[] = [
  // Álgebra - Equações 2º Grau
  {
    id: 'eq2-001',
    name: 'Raízes Reais',
    description: 'Encontre as raízes reais da equação x² - 5x + 6 = 0',
    difficulty: 'easy',
    xp: 50,
    options: [
      'x₁ = 2 e x₂ = 3',
      'x₁ = 1 e x₂ = 6',
      'x₁ = -2 e x₂ = -3',
      'x₁ = 0 e x₂ = 5',
      'Não há raízes reais'
    ],
    correctAnswer: 0,
    categoryId: 'algebra',
    subcategoryId: 'equacoes-2-grau'
  },
  {
    id: 'eq2-002',
    name: 'Soma das Raízes',
    description: 'Na equação 2x² - 8x + k = 0, sabendo que uma raiz é 3, determine o valor de k e a outra raiz.',
    difficulty: 'medium',
    xp: 100,
    options: [
      'k = -6 e x₂ = 1',
      'k = 6 e x₂ = 1',
      'k = 6 e x₂ = -1',
      'k = -6 e x₂ = -1',
      'k = 12 e x₂ = 2'
    ],
    correctAnswer: 1,
    categoryId: 'algebra',
    subcategoryId: 'equacoes-2-grau'
  },
  {
    id: 'eq2-003',
    name: 'Discriminante',
    description: 'Determine os valores de m para que a equação x² - 2mx + m² - 1 = 0 tenha duas raízes reais distintas.',
    difficulty: 'hard',
    xp: 150,
    options: [
      'm ∈ ℝ',
      'm > 0',
      'm < 0',
      'm ≠ 0',
      'Não existe m que satisfaça'
    ],
    correctAnswer: 0,
    categoryId: 'algebra',
    subcategoryId: 'equacoes-2-grau'
  },
  
  // Geometria - Geometria Plana
  {
    id: 'geop-001',
    name: 'Área do Trapézio',
    description: 'Um trapézio tem bases medindo 8 cm e 12 cm, e altura de 5 cm. Calcule sua área.',
    difficulty: 'easy',
    xp: 50,
    options: [
      '40 cm²',
      '50 cm²',
      '60 cm²',
      '100 cm²',
      '120 cm²'
    ],
    correctAnswer: 1,
    categoryId: 'geometria',
    subcategoryId: 'geometria-plana'
  },
  {
    id: 'geop-002',
    name: 'Teorema de Pitágoras',
    description: 'Um triângulo retângulo tem catetos medindo 5 cm e 12 cm. Qual é a medida da hipotenusa?',
    difficulty: 'easy',
    xp: 50,
    options: [
      '13 cm',
      '17 cm',
      '15 cm',
      '14 cm',
      '11 cm'
    ],
    correctAnswer: 0,
    categoryId: 'geometria',
    subcategoryId: 'geometria-plana'
  },
  
  // Trigonometria - Razões
  {
    id: 'trig-001',
    name: 'Seno de 30°',
    description: 'Calcule o valor de sen(30°) + cos(60°)',
    difficulty: 'easy',
    xp: 50,
    options: [
      '1',
      '1/2',
      '√3/2',
      '√3',
      '0'
    ],
    correctAnswer: 0,
    categoryId: 'trigonometria',
    subcategoryId: 'razoes-trigonometricas'
  },
  {
    id: 'trig-002',
    name: 'Relação Fundamental',
    description: 'Se sen(x) = 3/5 e x está no primeiro quadrante, calcule cos(x).',
    difficulty: 'medium',
    xp: 100,
    options: [
      '3/5',
      '4/5',
      '5/3',
      '5/4',
      '2/5'
    ],
    correctAnswer: 1,
    categoryId: 'trigonometria',
    subcategoryId: 'razoes-trigonometricas'
  },
  
  // Aritmética - Divisibilidade
  {
    id: 'arit-001',
    name: 'MDC',
    description: 'Calcule o MDC entre 48 e 72.',
    difficulty: 'easy',
    xp: 50,
    options: [
      '12',
      '24',
      '6',
      '8',
      '144'
    ],
    correctAnswer: 1,
    categoryId: 'aritmetica',
    subcategoryId: 'divisibilidade'
  },
  {
    id: 'arit-002',
    name: 'MMC',
    description: 'Três sinais de trânsito piscam a cada 4, 6 e 9 segundos respectivamente. Se piscam juntos agora, depois de quantos segundos piscarão juntos novamente?',
    difficulty: 'medium',
    xp: 100,
    options: [
      '18 segundos',
      '36 segundos',
      '72 segundos',
      '108 segundos',
      '216 segundos'
    ],
    correctAnswer: 1,
    categoryId: 'aritmetica',
    subcategoryId: 'divisibilidade'
  },
  
  // Álgebra - Funções (mais difíceis)
  {
    id: 'func-001',
    name: 'Função Composta',
    description: 'Dadas f(x) = 2x + 1 e g(x) = x² - 1, calcule (f ∘ g)(2).',
    difficulty: 'medium',
    xp: 100,
    options: [
      '5',
      '7',
      '9',
      '11',
      '13'
    ],
    correctAnswer: 1,
    categoryId: 'algebra',
    subcategoryId: 'funcoes'
  },
  {
    id: 'func-002',
    name: 'Função Inversa',
    description: 'Encontre a função inversa de f(x) = (3x - 2)/5.',
    difficulty: 'hard',
    xp: 150,
    options: [
      'f⁻¹(x) = (5x + 2)/3',
      'f⁻¹(x) = (5x - 2)/3',
      'f⁻¹(x) = (3x + 2)/5',
      'f⁻¹(x) = 3x/5 + 2',
      'f⁻¹(x) = (2 - 5x)/3'
    ],
    correctAnswer: 0,
    categoryId: 'algebra',
    subcategoryId: 'funcoes'
  },
  
  // Geometria Analítica
  {
    id: 'geoa-001',
    name: 'Distância entre Pontos',
    description: 'Calcule a distância entre os pontos A(1, 2) e B(4, 6).',
    difficulty: 'easy',
    xp: 50,
    options: [
      '5',
      '√7',
      '7',
      '√5',
      '3'
    ],
    correctAnswer: 0,
    categoryId: 'geometria',
    subcategoryId: 'geometria-analitica'
  },
  {
    id: 'geoa-002',
    name: 'Equação da Reta',
    description: 'Encontre a equação da reta que passa pelos pontos (2, 3) e (4, 7).',
    difficulty: 'medium',
    xp: 100,
    options: [
      'y = 2x - 1',
      'y = 2x + 1',
      'y = x + 1',
      'y = 3x - 3',
      'y = x - 1'
    ],
    correctAnswer: 0,
    categoryId: 'geometria',
    subcategoryId: 'geometria-analitica'
  }
];
