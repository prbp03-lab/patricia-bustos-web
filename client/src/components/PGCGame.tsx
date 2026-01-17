import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { t, getSection } from '@/lib/i18n';
import { RotateCcw, Volume2 } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export default function PGCGame() {
  const { language } = useLanguage();
  const game = getSection(language, 'tools')?.pgc_game;
  
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);

  // Preguntas del juego (bilingüe)
  const questions: Question[] = [
    {
      id: 1,
      question: language === 'ca' 
        ? '¿Quin compte del PGC representa el Capital Social?'
        : '¿Qué cuenta del PGC representa el Capital Social?',
      options: [
        language === 'ca' ? 'Compte 100' : 'Cuenta 100',
        language === 'ca' ? 'Compte 200' : 'Cuenta 200',
        language === 'ca' ? 'Compte 300' : 'Cuenta 300',
        language === 'ca' ? 'Compte 400' : 'Cuenta 400',
      ],
      correct: 0,
      explanation: language === 'ca'
        ? 'El compte 100 representa el Capital Social en el PGC. Es la aportació inicial dels accionistes.'
        : 'La cuenta 100 representa el Capital Social en el PGC. Es la aportación inicial de los accionistas.',
    },
    {
      id: 2,
      question: language === 'ca'
        ? '¿A quin grup pertany la compte de Clients?'
        : '¿A qué grupo pertenece la cuenta de Clientes?',
      options: [
        language === 'ca' ? 'Grup 1 (Patrimoni)' : 'Grupo 1 (Patrimonio)',
        language === 'ca' ? 'Grup 4 (Deutors)' : 'Grupo 4 (Deudores)',
        language === 'ca' ? 'Grup 5 (Tresoreria)' : 'Grupo 5 (Tesorería)',
        language === 'ca' ? 'Grup 6 (Despeses)' : 'Grupo 6 (Gastos)',
      ],
      correct: 1,
      explanation: language === 'ca'
        ? 'Els Clients pertanyen al Grup 4 (Deutors). Són les persones o empreses que deuen diners per compres a crèdit.'
        : 'Los Clientes pertenecen al Grupo 4 (Deudores). Son las personas o empresas que deben dinero por compras a crédito.',
    },
    {
      id: 3,
      question: language === 'ca'
        ? '¿Quin és el compte de Vendes de Béns i Serveis?'
        : '¿Cuál es la cuenta de Ventas de Bienes y Servicios?',
      options: [
        language === 'ca' ? 'Compte 600' : 'Cuenta 600',
        language === 'ca' ? 'Compte 700' : 'Cuenta 700',
        language === 'ca' ? 'Compte 500' : 'Cuenta 500',
        language === 'ca' ? 'Compte 800' : 'Cuenta 800',
      ],
      correct: 1,
      explanation: language === 'ca'
        ? 'El compte 700 representa les Vendes de Béns i Serveis. És un compte d\'ingressos.'
        : 'La cuenta 700 representa las Ventas de Bienes y Servicios. Es una cuenta de ingresos.',
    },
    {
      id: 4,
      question: language === 'ca'
        ? '¿Quin compte representa el Fons de Comerç?'
        : '¿Qué cuenta representa el Fondo de Comercio?',
      options: [
        language === 'ca' ? 'Compte 101' : 'Cuenta 101',
        language === 'ca' ? 'Compte 102' : 'Cuenta 102',
        language === 'ca' ? 'Compte 200' : 'Cuenta 200',
        language === 'ca' ? 'Compte 210' : 'Cuenta 210',
      ],
      correct: 0,
      explanation: language === 'ca'
        ? 'El compte 101 representa el Fons de Comerç, que és el valor pagat per sobre del valor comptable en una adquisició.'
        : 'La cuenta 101 representa el Fondo de Comercio, que es el valor pagado por encima del valor contable en una adquisición.',
    },
    {
      id: 5,
      question: language === 'ca'
        ? '¿A quin compte s\'abonen les compres de matèries primeres?'
        : '¿A qué cuenta se cargan las compras de materias primas?',
      options: [
        language === 'ca' ? 'Compte 300' : 'Cuenta 300',
        language === 'ca' ? 'Compte 600' : 'Cuenta 600',
        language === 'ca' ? 'Compte 700' : 'Cuenta 700',
        language === 'ca' ? 'Compte 400' : 'Cuenta 400',
      ],
      correct: 1,
      explanation: language === 'ca'
        ? 'El compte 600 representa les Compres de Matèries Primeres. És un compte de despeses.'
        : 'La cuenta 600 representa las Compras de Materias Primas. Es una cuenta de gastos.',
    },
  ];

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setGameFinished(true);
    }
  };

  const handleRestart = () => {
    setGameStarted(false);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setGameFinished(false);
  };

  if (!gameStarted) {
    return (
      <div className="space-y-6 text-center">
        <div>
          <h3 className="text-2xl font-bold text-primary mb-2">
            {game?.title}
          </h3>
          <p className="text-foreground/70">
            {game?.description}
          </p>
        </div>

        <div className="py-12 px-6 rounded-lg bg-gradient-to-br from-accent/10 to-primary/10 border-2 border-dashed border-accent/30">
          <div className="text-5xl mb-4">🎮</div>
          <p className="text-lg font-semibold text-primary mb-6">
            {language === 'ca' ? 'Joc Interactiu' : 'Juego Interactivo'}
          </p>
          <button
            onClick={() => setGameStarted(true)}
            className="btn-primary"
          >
            {game?.start_game}
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-secondary rounded-lg">
            <p className="text-2xl font-bold text-accent">{questions.length}</p>
            <p className="text-xs text-foreground/60">
              {language === 'ca' ? 'Preguntes' : 'Preguntas'}
            </p>
          </div>
          <div className="p-4 bg-secondary rounded-lg">
            <p className="text-2xl font-bold text-primary">∞</p>
            <p className="text-xs text-foreground/60">
              {language === 'ca' ? 'Intents' : 'Intentos'}
            </p>
          </div>
          <div className="p-4 bg-secondary rounded-lg">
            <p className="text-2xl font-bold text-accent">100%</p>
            <p className="text-xs text-foreground/60">
              {language === 'ca' ? 'Gratuït' : 'Gratuito'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (gameFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="space-y-6 text-center py-12">
        <div className="text-6xl mb-4">
          {percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '💪'}
        </div>
        
        <div>
          <h3 className="text-3xl font-bold text-primary mb-2">
            {game?.final_score}
          </h3>
          <p className="text-5xl font-bold text-accent mb-4">
            {score}/{questions.length}
          </p>
          <p className="text-xl text-foreground/70">
            {percentage >= 80 && (language === 'ca' ? 'Excel·lent!' : '¡Excelente!')}
            {percentage >= 60 && percentage < 80 && (language === 'ca' ? 'Molt bé!' : '¡Muy bien!')}
            {percentage < 60 && (language === 'ca' ? 'Segueix practicant!' : '¡Sigue practicando!')}
          </p>
        </div>

        <div className="p-6 bg-secondary rounded-lg">
          <p className="text-sm text-foreground/70 mb-4">
            {language === 'ca'
              ? 'Has acertat el ' + percentage + '% de les preguntes'
              : 'Has acertado el ' + percentage + '% de las preguntas'
            }
          </p>
          <button
            onClick={handleRestart}
            className="btn-primary inline-flex items-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            {game?.try_again}
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const isAnswered = selectedAnswer !== null;

  return (
    <div className="space-y-8">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-foreground/70">
            {game?.question} {currentQuestion + 1} {game?.of} {questions.length}
          </span>
          <span className="text-sm font-semibold text-accent">
            {game?.score}: {score}
          </span>
        </div>
        <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-accent to-primary h-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="space-y-6">
        <div className="p-8 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border-2 border-primary/10">
          <h3 className="text-xl md:text-2xl font-bold text-primary">
            {question.question}
          </h3>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isCorrect = index === question.correct;
            const isSelected = index === selectedAnswer;
            const showResult = isAnswered && (isCorrect || isSelected);

            return (
              <button
                key={index}
                onClick={() => !isAnswered && handleAnswer(index)}
                disabled={isAnswered}
                className={`w-full p-4 text-left rounded-lg border-2 font-semibold transition-all duration-200 ${
                  !isAnswered
                    ? 'border-border hover:border-accent hover:bg-accent/5 cursor-pointer'
                    : showResult
                    ? isCorrect
                      ? 'border-green-500 bg-green-50 text-green-900'
                      : 'border-red-500 bg-red-50 text-red-900'
                    : 'border-border opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {showResult && (
                    <span className="text-lg">
                      {isCorrect ? '✓' : '✗'}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className={`p-6 rounded-lg border-l-4 ${
            selectedAnswer === question.correct
              ? 'bg-green-50 border-green-500 text-green-900'
              : 'bg-amber-50 border-amber-500 text-amber-900'
          }`}>
            <p className="font-semibold mb-2">
              {selectedAnswer === question.correct ? game?.correct : game?.incorrect}
            </p>
            <p className="text-sm">{question.explanation}</p>
          </div>
        )}

        {/* Next Button */}
        {isAnswered && (
          <button
            onClick={handleNext}
            className="w-full btn-primary"
          >
            {currentQuestion === questions.length - 1 ? game?.finish : game?.next}
          </button>
        )}
      </div>
    </div>
  );
}
