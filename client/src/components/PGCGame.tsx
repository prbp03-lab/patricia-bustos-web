'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { t, getSection } from '@/lib/i18n';
import { RotateCcw, Trophy, TrendingUp, Award, Target, Clock, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

interface GameStats {
  totalGames: number;
  totalScore: number;
  bestScore: number;
  bestStreak: number;
  currentStreak: number;
  lastPlayed: string;
  averageScore: number;
  totalQuestions: number;
  correctAnswers: number;
  gameHistory: GameRecord[];
}

interface GameRecord {
  date: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  duration: number;
  streak: number;
}

const STORAGE_KEY = 'pgc_game_stats_v2';

export default function PGCGame() {
  const { language } = useLanguage();
  const game = getSection(language, 'tools')?.pgc_game;
  
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [gameStartTime, setGameStartTime] = useState<number>(0);
  const [gameDuration, setGameDuration] = useState<number>(0);
  const [stats, setStats] = useState<GameStats>({
    totalGames: 0,
    totalScore: 0,
    bestScore: 0,
    bestStreak: 0,
    currentStreak: 0,
    lastPlayed: '',
    averageScore: 0,
    totalQuestions: 0,
    correctAnswers: 0,
    gameHistory: [],
  });
  const [showNewRecord, setShowNewRecord] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);

  // Base de datos expandida de preguntas (40+ cuentas PGC)
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
        ? 'El compte 100 representa el Capital Social. És la aportació inicial dels accionistes.'
        : 'La cuenta 100 representa el Capital Social. Es la aportación inicial de los accionistas.',
      difficulty: 'easy',
      category: 'Patrimonio',
    },
    {
      id: 2,
      question: language === 'ca'
        ? '¿Quin compte representa les Reserves Estatutàries?'
        : '¿Qué cuenta representa las Reservas Estatutarias?',
      options: [
        language === 'ca' ? 'Compte 110' : 'Cuenta 110',
        language === 'ca' ? 'Compte 113' : 'Cuenta 113',
        language === 'ca' ? 'Compte 120' : 'Cuenta 120',
        language === 'ca' ? 'Compte 130' : 'Cuenta 130',
      ],
      correct: 1,
      explanation: language === 'ca'
        ? 'El compte 113 representa les Reserves Estatutàries, establertes per la llei o els estatuts.'
        : 'La cuenta 113 representa las Reservas Estatutarias, establecidas por ley o estatutos.',
      difficulty: 'medium',
      category: 'Patrimonio',
    },
    {
      id: 3,
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
        ? 'El compte 101 representa el Fons de Comerç, valor pagat per sobre del valor comptable.'
        : 'La cuenta 101 representa el Fondo de Comercio, valor pagado por encima del valor contable.',
      difficulty: 'hard',
      category: 'Patrimonio',
    },
    {
      id: 4,
      question: language === 'ca'
        ? '¿A quin compte es registren les Construccions?'
        : '¿A qué cuenta se registran las Construcciones?',
      options: [
        language === 'ca' ? 'Compte 210' : 'Cuenta 210',
        language === 'ca' ? 'Compte 211' : 'Cuenta 211',
        language === 'ca' ? 'Compte 220' : 'Cuenta 220',
        language === 'ca' ? 'Compte 230' : 'Cuenta 230',
      ],
      correct: 0,
      explanation: language === 'ca'
        ? 'El compte 210 és per a Terrenys i Béns Naturals. El 211 és per a Construccions.'
        : 'La cuenta 210 es para Terrenos. La 211 es para Construcciones.',
      difficulty: 'medium',
      category: 'Activo No Corriente',
    },
    {
      id: 5,
      question: language === 'ca'
        ? '¿Quin compte representa el Material de Transport?'
        : '¿Qué cuenta representa el Material de Transporte?',
      options: [
        language === 'ca' ? 'Compte 218' : 'Cuenta 218',
        language === 'ca' ? 'Compte 219' : 'Cuenta 219',
        language === 'ca' ? 'Compte 220' : 'Cuenta 220',
        language === 'ca' ? 'Compte 221' : 'Cuenta 221',
      ],
      correct: 0,
      explanation: language === 'ca'
        ? 'El compte 218 és per a Material de Transport (vehicles, etc.).'
        : 'La cuenta 218 es para Material de Transporte (vehículos, etc.).',
      difficulty: 'medium',
      category: 'Activo No Corriente',
    },
    {
      id: 6,
      question: language === 'ca'
        ? '¿Quin compte representa l\'Amortització Acumulada?'
        : '¿Qué cuenta representa la Amortización Acumulada?',
      options: [
        language === 'ca' ? 'Compte 280' : 'Cuenta 280',
        language === 'ca' ? 'Compte 281' : 'Cuenta 281',
        language === 'ca' ? 'Compte 282' : 'Cuenta 282',
        language === 'ca' ? 'Compte 290' : 'Cuenta 290',
      ],
      correct: 0,
      explanation: language === 'ca'
        ? 'El compte 280 és una compte de contraactiu que registra l\'amortització acumulada.'
        : 'La cuenta 280 es una cuenta de contraactivo que registra la amortización acumulada.',
      difficulty: 'hard',
      category: 'Activo No Corriente',
    },
    {
      id: 7,
      question: language === 'ca'
        ? '¿A quin compte es registren les Matèries Primeres?'
        : '¿A qué cuenta se registran las Materias Primas?',
      options: [
        language === 'ca' ? 'Compte 300' : 'Cuenta 300',
        language === 'ca' ? 'Compte 310' : 'Cuenta 310',
        language === 'ca' ? 'Compte 320' : 'Cuenta 320',
        language === 'ca' ? 'Compte 330' : 'Cuenta 330',
      ],
      correct: 0,
      explanation: language === 'ca'
        ? 'El compte 300 és per a Matèries Primeres i altres aprovisionaments.'
        : 'La cuenta 300 es para Materias Primas y otros aprovisionamientos.',
      difficulty: 'easy',
      category: 'Activo Corriente',
    },
    {
      id: 8,
      question: language === 'ca'
        ? '¿Quin compte representa els Productes Acabats?'
        : '¿Qué cuenta representa los Productos Acabados?',
      options: [
        language === 'ca' ? 'Compte 300' : 'Cuenta 300',
        language === 'ca' ? 'Compte 330' : 'Cuenta 330',
        language === 'ca' ? 'Compte 340' : 'Cuenta 340',
        language === 'ca' ? 'Compte 350' : 'Cuenta 350',
      ],
      correct: 1,
      explanation: language === 'ca'
        ? 'El compte 330 és per a Productes Acabats disponibles per a la venda.'
        : 'La cuenta 330 es para Productos Acabados disponibles para la venta.',
      difficulty: 'medium',
      category: 'Activo Corriente',
    },
    {
      id: 9,
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
        ? 'Els Clients pertanyen al Grup 4. Són deutors per compres a crèdit.'
        : 'Los Clientes pertenecen al Grupo 4. Son deudores por compras a crédito.',
      difficulty: 'easy',
      category: 'Activo Corriente',
    },
    {
      id: 10,
      question: language === 'ca'
        ? '¿Quin compte representa els Clients, Efectes Comercials a Cobrar?'
        : '¿Qué cuenta representa los Clientes, Efectos Comerciales a Cobrar?',
      options: [
        language === 'ca' ? 'Compte 430' : 'Cuenta 430',
        language === 'ca' ? 'Compte 431' : 'Cuenta 431',
        language === 'ca' ? 'Compte 440' : 'Cuenta 440',
        language === 'ca' ? 'Compte 450' : 'Cuenta 450',
      ],
      correct: 0,
      explanation: language === 'ca'
        ? 'El compte 430 és per a Clients, Efectes Comercials a Cobrar.'
        : 'La cuenta 430 es para Clientes, Efectos Comerciales a Cobrar.',
      difficulty: 'medium',
      category: 'Activo Corriente',
    },
    {
      id: 11,
      question: language === 'ca'
        ? '¿Quin compte representa els Deutes a Llarg Termini amb Entitats de Crèdit?'
        : '¿Qué cuenta representa las Deudas a Largo Plazo con Entidades de Crédito?',
      options: [
        language === 'ca' ? 'Compte 170' : 'Cuenta 170',
        language === 'ca' ? 'Compte 171' : 'Cuenta 171',
        language === 'ca' ? 'Compte 172' : 'Cuenta 172',
        language === 'ca' ? 'Compte 173' : 'Cuenta 173',
      ],
      correct: 0,
      explanation: language === 'ca'
        ? 'El compte 170 és per a Deutes a Llarg Termini amb Entitats de Crèdit.'
        : 'La cuenta 170 es para Deudas a Largo Plazo con Entidades de Crédito.',
      difficulty: 'medium',
      category: 'Pasivo No Corriente',
    },
    {
      id: 12,
      question: language === 'ca'
        ? '¿Quin compte representa les Provisions per a Riscos i Despeses?'
        : '¿Qué cuenta representa las Provisiones para Riesgos y Gastos?',
      options: [
        language === 'ca' ? 'Compte 140' : 'Cuenta 140',
        language === 'ca' ? 'Compte 145' : 'Cuenta 145',
        language === 'ca' ? 'Compte 150' : 'Cuenta 150',
        language === 'ca' ? 'Compte 160' : 'Cuenta 160',
      ],
      correct: 1,
      explanation: language === 'ca'
        ? 'El compte 145 és per a Provisions per a Riscos i Despeses.'
        : 'La cuenta 145 es para Provisiones para Riesgos y Gastos.',
      difficulty: 'hard',
      category: 'Pasivo No Corriente',
    },
    {
      id: 13,
      question: language === 'ca'
        ? '¿Quin compte representa els Proveïdors?'
        : '¿Qué cuenta representa los Proveedores?',
      options: [
        language === 'ca' ? 'Compte 400' : 'Cuenta 400',
        language === 'ca' ? 'Compte 401' : 'Cuenta 401',
        language === 'ca' ? 'Compte 410' : 'Cuenta 410',
        language === 'ca' ? 'Compte 420' : 'Cuenta 420',
      ],
      correct: 0,
      explanation: language === 'ca'
        ? 'El compte 400 és per a Proveïdors de Béns i Serveis.'
        : 'La cuenta 400 es para Proveedores de Bienes y Servicios.',
      difficulty: 'easy',
      category: 'Pasivo Corriente',
    },
    {
      id: 14,
      question: language === 'ca'
        ? '¿Quin compte representa l\'Hisenda Pública, Deudora per IVA?'
        : '¿Qué cuenta representa la Hacienda Pública, Deudora por IVA?',
      options: [
        language === 'ca' ? 'Compte 470' : 'Cuenta 470',
        language === 'ca' ? 'Compte 471' : 'Cuenta 471',
        language === 'ca' ? 'Compte 472' : 'Cuenta 472',
        language === 'ca' ? 'Compte 473' : 'Cuenta 473',
      ],
      correct: 1,
      explanation: language === 'ca'
        ? 'El compte 471 és per a Hisenda Pública, Deudora per IVA.'
        : 'La cuenta 471 es para Hacienda Pública, Deudora por IVA.',
      difficulty: 'hard',
      category: 'Pasivo Corriente',
    },
    {
      id: 15,
      question: language === 'ca'
        ? '¿Quin compte representa l\'Hisenda Pública, Acreïdora per IVA?'
        : '¿Qué cuenta representa la Hacienda Pública, Acreedora por IVA?',
      options: [
        language === 'ca' ? 'Compte 475' : 'Cuenta 475',
        language === 'ca' ? 'Compte 476' : 'Cuenta 476',
        language === 'ca' ? 'Compte 477' : 'Cuenta 477',
        language === 'ca' ? 'Compte 478' : 'Cuenta 478',
      ],
      correct: 1,
      explanation: language === 'ca'
        ? 'El compte 476 és per a Hisenda Pública, Acreïdora per IVA.'
        : 'La cuenta 476 es para Hacienda Pública, Acreedora por IVA.',
      difficulty: 'hard',
      category: 'Pasivo Corriente',
    },
    {
      id: 16,
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
        ? 'El compte 600 representa les Compres de Matèries Primeres.'
        : 'La cuenta 600 representa las Compras de Materias Primas.',
      difficulty: 'easy',
      category: 'Compras y Gastos',
    },
    {
      id: 17,
      question: language === 'ca'
        ? '¿Quin compte representa els Subministraments?'
        : '¿Qué cuenta representa los Suministros?',
      options: [
        language === 'ca' ? 'Compte 600' : 'Cuenta 600',
        language === 'ca' ? 'Compte 602' : 'Cuenta 602',
        language === 'ca' ? 'Compte 605' : 'Cuenta 605',
        language === 'ca' ? 'Compte 610' : 'Cuenta 610',
      ],
      correct: 2,
      explanation: language === 'ca'
        ? 'El compte 605 representa els Subministraments (aigua, electricitat, etc.).'
        : 'La cuenta 605 representa los Suministros (agua, electricidad, etc.).',
      difficulty: 'medium',
      category: 'Compras y Gastos',
    },
    {
      id: 18,
      question: language === 'ca'
        ? '¿Quin compte representa els Serveis de Professional Independents?'
        : '¿Qué cuenta representa los Servicios de Profesionales Independientes?',
      options: [
        language === 'ca' ? 'Compte 620' : 'Cuenta 620',
        language === 'ca' ? 'Compte 621' : 'Cuenta 621',
        language === 'ca' ? 'Compte 622' : 'Cuenta 622',
        language === 'ca' ? 'Compte 623' : 'Cuenta 623',
      ],
      correct: 0,
      explanation: language === 'ca'
        ? 'El compte 620 representa els Serveis de Professional Independents.'
        : 'La cuenta 620 representa los Servicios de Profesionales Independientes.',
      difficulty: 'medium',
      category: 'Compras y Gastos',
    },
    {
      id: 19,
      question: language === 'ca'
        ? '¿Quin compte representa els Arrendaments i Cànons?'
        : '¿Qué cuenta representa los Arrendamientos y Cánones?',
      options: [
        language === 'ca' ? 'Compte 620' : 'Cuenta 620',
        language === 'ca' ? 'Compte 621' : 'Cuenta 621',
        language === 'ca' ? 'Compte 622' : 'Cuenta 622',
        language === 'ca' ? 'Compte 623' : 'Cuenta 623',
      ],
      correct: 1,
      explanation: language === 'ca'
        ? 'El compte 621 representa els Arrendaments i Cànons.'
        : 'La cuenta 621 representa los Arrendamientos y Cánones.',
      difficulty: 'medium',
      category: 'Compras y Gastos',
    },
    {
      id: 20,
      question: language === 'ca'
        ? '¿Quin compte representa els Reparacions i Conservació?'
        : '¿Qué cuenta representa las Reparaciones y Conservación?',
      options: [
        language === 'ca' ? 'Compte 622' : 'Cuenta 622',
        language === 'ca' ? 'Compte 623' : 'Cuenta 623',
        language === 'ca' ? 'Compte 624' : 'Cuenta 624',
        language === 'ca' ? 'Compte 625' : 'Cuenta 625',
      ],
      correct: 1,
      explanation: language === 'ca'
        ? 'El compte 623 representa les Reparacions i Conservació.'
        : 'La cuenta 623 representa las Reparaciones y Conservación.',
      difficulty: 'medium',
      category: 'Compras y Gastos',
    },
    {
      id: 21,
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
      difficulty: 'easy',
      category: 'Ventas e Ingresos',
    },
    {
      id: 22,
      question: language === 'ca'
        ? '¿Quin compte representa les Vendes de Residus i Materials de Rebuig?'
        : '¿Qué cuenta representa las Ventas de Residuos y Materiales de Desecho?',
      options: [
        language === 'ca' ? 'Compte 700' : 'Cuenta 700',
        language === 'ca' ? 'Compte 707' : 'Cuenta 707',
        language === 'ca' ? 'Compte 708' : 'Cuenta 708',
        language === 'ca' ? 'Compte 709' : 'Cuenta 709',
      ],
      correct: 2,
      explanation: language === 'ca'
        ? 'El compte 708 representa les Vendes de Residus i Materials de Rebuig.'
        : 'La cuenta 708 representa las Ventas de Residuos y Materiales de Desecho.',
      difficulty: 'hard',
      category: 'Ventas e Ingresos',
    },
    {
      id: 23,
      question: language === 'ca'
        ? '¿Quin compte representa els Ingressos per Interessos?'
        : '¿Qué cuenta representa los Ingresos por Intereses?',
      options: [
        language === 'ca' ? 'Compte 760' : 'Cuenta 760',
        language === 'ca' ? 'Compte 761' : 'Cuenta 761',
        language === 'ca' ? 'Compte 762' : 'Cuenta 762',
        language === 'ca' ? 'Compte 763' : 'Cuenta 763',
      ],
      correct: 0,
      explanation: language === 'ca'
        ? 'El compte 760 representa els Ingressos per Interessos de Crèdits.'
        : 'La cuenta 760 representa los Ingresos por Intereses de Créditos.',
      difficulty: 'medium',
      category: 'Ventas e Ingresos',
    },
    {
      id: 24,
      question: language === 'ca'
        ? '¿Quin compte representa els Ingressos per Dividends?'
        : '¿Qué cuenta representa los Ingresos por Dividendos?',
      options: [
        language === 'ca' ? 'Compte 760' : 'Cuenta 760',
        language === 'ca' ? 'Compte 761' : 'Cuenta 761',
        language === 'ca' ? 'Compte 762' : 'Cuenta 762',
        language === 'ca' ? 'Compte 763' : 'Cuenta 763',
      ],
      correct: 1,
      explanation: language === 'ca'
        ? 'El compte 761 representa els Ingressos per Dividends de Participacions en el Patrimoni Net.'
        : 'La cuenta 761 representa los Ingresos por Dividendos de Participaciones en el Patrimonio Neto.',
      difficulty: 'hard',
      category: 'Ventas e Ingresos',
    },
    {
      id: 25,
      question: language === 'ca'
        ? '¿Quin compte representa els Altres Ingressos de Gestió?'
        : '¿Qué cuenta representa los Otros Ingresos de Gestión?',
      options: [
        language === 'ca' ? 'Compte 750' : 'Cuenta 750',
        language === 'ca' ? 'Compte 751' : 'Cuenta 751',
        language === 'ca' ? 'Compte 752' : 'Cuenta 752',
        language === 'ca' ? 'Compte 753' : 'Cuenta 753',
      ],
      correct: 1,
      explanation: language === 'ca'
        ? 'El compte 751 representa els Altres Ingressos de Gestió.'
        : 'La cuenta 751 representa los Otros Ingresos de Gestión.',
      difficulty: 'medium',
      category: 'Ventas e Ingresos',
    },
    {
      id: 26,
      question: language === 'ca'
        ? '¿Quin compte representa els Gastos de Personal?'
        : '¿Qué cuenta representa los Gastos de Personal?',
      options: [
        language === 'ca' ? 'Compte 640' : 'Cuenta 640',
        language === 'ca' ? 'Compte 641' : 'Cuenta 641',
        language === 'ca' ? 'Compte 642' : 'Cuenta 642',
        language === 'ca' ? 'Compte 643' : 'Cuenta 643',
      ],
      correct: 0,
      explanation: language === 'ca'
        ? 'El compte 640 representa els Salaris i Jornals.'
        : 'La cuenta 640 representa los Salarios y Jornales.',
      difficulty: 'easy',
      category: 'Compras y Gastos',
    },
    {
      id: 27,
      question: language === 'ca'
        ? '¿Quin compte representa les Aportacions a la Seguretat Social?'
        : '¿Qué cuenta representa las Aportaciones a la Seguridad Social?',
      options: [
        language === 'ca' ? 'Compte 640' : 'Cuenta 640',
        language === 'ca' ? 'Compte 641' : 'Cuenta 641',
        language === 'ca' ? 'Compte 642' : 'Cuenta 642',
        language === 'ca' ? 'Compte 643' : 'Cuenta 643',
      ],
      correct: 2,
      explanation: language === 'ca'
        ? 'El compte 642 representa les Aportacions a la Seguretat Social de l\'empresa.'
        : 'La cuenta 642 representa las Aportaciones a la Seguridad Social de la empresa.',
      difficulty: 'medium',
      category: 'Compras y Gastos',
    },
    {
      id: 28,
      question: language === 'ca'
        ? '¿Quin compte representa els Impostos sobre els Beneficis?'
        : '¿Qué cuenta representa los Impuestos sobre los Beneficios?',
      options: [
        language === 'ca' ? 'Compte 630' : 'Cuenta 630',
        language === 'ca' ? 'Compte 631' : 'Cuenta 631',
        language === 'ca' ? 'Compte 632' : 'Cuenta 632',
        language === 'ca' ? 'Compte 633' : 'Cuenta 633',
      ],
      correct: 0,
      explanation: language === 'ca'
        ? 'El compte 630 representa els Impostos sobre els Beneficis (Impost de Societats).'
        : 'La cuenta 630 representa los Impuestos sobre los Beneficios (Impuesto de Sociedades).',
      difficulty: 'medium',
      category: 'Compras y Gastos',
    },
    {
      id: 29,
      question: language === 'ca'
        ? '¿Quin compte representa la Depreciació de l\'Immobilitzat Material?'
        : '¿Qué cuenta representa la Depreciación del Inmovilizado Material?',
      options: [
        language === 'ca' ? 'Compte 680' : 'Cuenta 680',
        language === 'ca' ? 'Compte 681' : 'Cuenta 681',
        language === 'ca' ? 'Compte 682' : 'Cuenta 682',
        language === 'ca' ? 'Compte 683' : 'Cuenta 683',
      ],
      correct: 0,
      explanation: language === 'ca'
        ? 'El compte 680 representa la Depreciació de l\'Immobilitzat Material.'
        : 'La cuenta 680 representa la Depreciación del Inmovilizado Material.',
      difficulty: 'hard',
      category: 'Compras y Gastos',
    },
    {
      id: 30,
      question: language === 'ca'
        ? '¿Quin compte representa les Pèrdues per Deteriorament del Circulant?'
        : '¿Qué cuenta representa las Pérdidas por Deterioro del Circulante?',
      options: [
        language === 'ca' ? 'Compte 690' : 'Cuenta 690',
        language === 'ca' ? 'Compte 691' : 'Cuenta 691',
        language === 'ca' ? 'Compte 692' : 'Cuenta 692',
        language === 'ca' ? 'Compte 693' : 'Cuenta 693',
      ],
      correct: 1,
      explanation: language === 'ca'
        ? 'El compte 691 representa les Pèrdues per Deteriorament del Circulant.'
        : 'La cuenta 691 representa las Pérdidas por Deterioro del Circulante.',
      difficulty: 'hard',
      category: 'Compras y Gastos',
    },
    {
      id: 31,
      question: language === 'ca'
        ? '¿Quin compte representa els Interessos de Deutes?'
        : '¿Qué cuenta representa los Intereses de Deudas?',
      options: [
        language === 'ca' ? 'Compte 660' : 'Cuenta 660',
        language === 'ca' ? 'Compte 661' : 'Cuenta 661',
        language === 'ca' ? 'Compte 662' : 'Cuenta 662',
        language === 'ca' ? 'Compte 663' : 'Cuenta 663',
      ],
      correct: 0,
      explanation: language === 'ca'
        ? 'El compte 660 representa els Interessos de Deutes.'
        : 'La cuenta 660 representa los Intereses de Deudas.',
      difficulty: 'medium',
      category: 'Compras y Gastos',
    },
    {
      id: 32,
      question: language === 'ca'
        ? '¿Quin compte representa les Pèrdues en la Disposició de l\'Immobilitzat?'
        : '¿Qué cuenta representa las Pérdidas en la Disposición del Inmovilizado?',
      options: [
        language === 'ca' ? 'Compte 670' : 'Cuenta 670',
        language === 'ca' ? 'Compte 671' : 'Cuenta 671',
        language === 'ca' ? 'Compte 672' : 'Cuenta 672',
        language === 'ca' ? 'Compte 673' : 'Cuenta 673',
      ],
      correct: 1,
      explanation: language === 'ca'
        ? 'El compte 671 representa les Pèrdues en la Disposició de l\'Immobilitzat.'
        : 'La cuenta 671 representa las Pérdidas en la Disposición del Inmovilizado.',
      difficulty: 'hard',
      category: 'Compras y Gastos',
    },
    {
      id: 33,
      question: language === 'ca'
        ? '¿Quin compte representa les Altres Despeses de Gestió?'
        : '¿Qué cuenta representa los Otros Gastos de Gestión?',
      options: [
        language === 'ca' ? 'Compte 650' : 'Cuenta 650',
        language === 'ca' ? 'Compte 651' : 'Cuenta 651',
        language === 'ca' ? 'Compte 652' : 'Cuenta 652',
        language === 'ca' ? 'Compte 653' : 'Cuenta 653',
      ],
      correct: 1,
      explanation: language === 'ca'
        ? 'El compte 651 representa les Altres Despeses de Gestió.'
        : 'La cuenta 651 representa los Otros Gastos de Gestión.',
      difficulty: 'medium',
      category: 'Compras y Gastos',
    },
    {
      id: 34,
      question: language === 'ca'
        ? '¿Quin compte representa els Guanys en la Disposició de l\'Immobilitzat?'
        : '¿Qué cuenta representa las Ganancias en la Disposición del Inmovilizado?',
      options: [
        language === 'ca' ? 'Compte 770' : 'Cuenta 770',
        language === 'ca' ? 'Compte 771' : 'Cuenta 771',
        language === 'ca' ? 'Compte 772' : 'Cuenta 772',
        language === 'ca' ? 'Compte 773' : 'Cuenta 773',
      ],
      correct: 1,
      explanation: language === 'ca'
        ? 'El compte 771 representa els Guanys en la Disposició de l\'Immobilitzat.'
        : 'La cuenta 771 representa las Ganancias en la Disposición del Inmovilizado.',
      difficulty: 'hard',
      category: 'Ventas e Ingresos',
    },
    {
      id: 35,
      question: language === 'ca'
        ? '¿Quin compte representa els Ingressos Extraordinaris?'
        : '¿Qué cuenta representa los Ingresos Extraordinarios?',
      options: [
        language === 'ca' ? 'Compte 778' : 'Cuenta 778',
        language === 'ca' ? 'Compte 779' : 'Cuenta 779',
        language === 'ca' ? 'Compte 780' : 'Cuenta 780',
        language === 'ca' ? 'Compte 781' : 'Cuenta 781',
      ],
      correct: 0,
      explanation: language === 'ca'
        ? 'El compte 778 representa els Ingressos Extraordinaris.'
        : 'La cuenta 778 representa los Ingresos Extraordinarios.',
      difficulty: 'hard',
      category: 'Ventas e Ingresos',
    },
    {
      id: 36,
      question: language === 'ca'
        ? '¿Quin compte representa els Gastos Extraordinaris?'
        : '¿Qué cuenta representa los Gastos Extraordinarios?',
      options: [
        language === 'ca' ? 'Compte 678' : 'Cuenta 678',
        language === 'ca' ? 'Compte 679' : 'Cuenta 679',
        language === 'ca' ? 'Compte 680' : 'Cuenta 680',
        language === 'ca' ? 'Compte 681' : 'Cuenta 681',
      ],
      correct: 0,
      explanation: language === 'ca'
        ? 'El compte 678 representa els Gastos Extraordinaris.'
        : 'La cuenta 678 representa los Gastos Extraordinarios.',
      difficulty: 'hard',
      category: 'Compras y Gastos',
    },
    {
      id: 37,
      question: language === 'ca'
        ? '¿Quin compte representa els Publicitat i Propaganda?'
        : '¿Qué cuenta representa la Publicidad y Propaganda?',
      options: [
        language === 'ca' ? 'Compte 625' : 'Cuenta 625',
        language === 'ca' ? 'Compte 626' : 'Cuenta 626',
        language === 'ca' ? 'Compte 627' : 'Cuenta 627',
        language === 'ca' ? 'Compte 628' : 'Cuenta 628',
      ],
      correct: 1,
      explanation: language === 'ca'
        ? 'El compte 626 representa la Publicitat i Propaganda.'
        : 'La cuenta 626 representa la Publicidad y Propaganda.',
      difficulty: 'medium',
      category: 'Compras y Gastos',
    },
    {
      id: 38,
      question: language === 'ca'
        ? '¿Quin compte representa els Transports?'
        : '¿Qué cuenta representa los Transportes?',
      options: [
        language === 'ca' ? 'Compte 624' : 'Cuenta 624',
        language === 'ca' ? 'Compte 625' : 'Cuenta 625',
        language === 'ca' ? 'Compte 626' : 'Cuenta 626',
        language === 'ca' ? 'Compte 627' : 'Cuenta 627',
      ],
      correct: 2,
      explanation: language === 'ca'
        ? 'El compte 626 representa els Transports.'
        : 'La cuenta 626 representa los Transportes.',
      difficulty: 'medium',
      category: 'Compras y Gastos',
    },
    {
      id: 39,
      question: language === 'ca'
        ? '¿Quin compte representa els Viatges i Dietes?'
        : '¿Qué cuenta representa los Viajes y Dietas?',
      options: [
        language === 'ca' ? 'Compte 627' : 'Cuenta 627',
        language === 'ca' ? 'Compte 628' : 'Cuenta 628',
        language === 'ca' ? 'Compte 629' : 'Cuenta 629',
        language === 'ca' ? 'Compte 630' : 'Cuenta 630',
      ],
      correct: 0,
      explanation: language === 'ca'
        ? 'El compte 627 representa els Viatges i Dietes.'
        : 'La cuenta 627 representa los Viajes y Dietas.',
      difficulty: 'medium',
      category: 'Compras y Gastos',
    },
    {
      id: 40,
      question: language === 'ca'
        ? '¿Quin compte representa els Donacions?'
        : '¿Qué cuenta representa las Donaciones?',
      options: [
        language === 'ca' ? 'Compte 628' : 'Cuenta 628',
        language === 'ca' ? 'Compte 629' : 'Cuenta 629',
        language === 'ca' ? 'Compte 630' : 'Cuenta 630',
        language === 'ca' ? 'Compte 631' : 'Cuenta 631',
      ],
      correct: 1,
      explanation: language === 'ca'
        ? 'El compte 629 representa els Donacions.'
        : 'La cuenta 629 representa las Donaciones.',
      difficulty: 'hard',
      category: 'Compras y Gastos',
    },
  ];

  // Cargar estadísticas al iniciar
  useEffect(() => {
    const savedStats = localStorage.getItem(STORAGE_KEY);
    if (savedStats) {
      try {
        setStats(JSON.parse(savedStats));
      } catch (e) {
        console.error('Error loading stats:', e);
      }
    }
  }, []);

  // Guardar estadísticas
  const saveStats = (newStats: GameStats) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newStats));
    setStats(newStats);
  };

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    const isCorrect = index === questions[currentQuestion].correct;
    
    if (isCorrect) {
      setScore(score + 1);
      setCurrentStreak(currentStreak + 1);
    } else {
      setCurrentStreak(0);
    }
    
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      finishGame();
    }
  };

  const finishGame = () => {
    const duration = Math.round((Date.now() - gameStartTime) / 1000);
    setGameDuration(duration);
    
    const newTotalGames = stats.totalGames + 1;
    const newTotalScore = stats.totalScore + score;
    const newBestScore = Math.max(stats.bestScore, score);
    const newBestStreak = Math.max(stats.bestStreak, currentStreak);
    const newTotalQuestions = stats.totalQuestions + questions.length;
    const newCorrectAnswers = stats.correctAnswers + score;
    const newAverageScore = newTotalScore / newTotalGames;
    const percentage = Math.round((score / questions.length) * 100);

    const gameRecord: GameRecord = {
      date: new Date().toISOString(),
      score: score,
      totalQuestions: questions.length,
      percentage: percentage,
      duration: duration,
      streak: currentStreak,
    };

    const newStats: GameStats = {
      totalGames: newTotalGames,
      totalScore: newTotalScore,
      bestScore: newBestScore,
      bestStreak: newBestStreak,
      currentStreak: currentStreak,
      lastPlayed: new Date().toISOString(),
      averageScore: Math.round(newAverageScore * 10) / 10,
      totalQuestions: newTotalQuestions,
      correctAnswers: newCorrectAnswers,
      gameHistory: [gameRecord, ...stats.gameHistory.slice(0, 9)],
    };

    const isNewRecord = score > stats.bestScore;
    if (isNewRecord && stats.bestScore > 0) {
      setShowNewRecord(true);
    }

    saveStats(newStats);
    setGameFinished(true);
  };

  const handleRestart = () => {
    setGameStarted(false);
    setCurrentQuestion(0);
    setScore(0);
    setCurrentStreak(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setGameFinished(false);
    setShowNewRecord(false);
  };

  const getBadge = () => {
    const totalCorrect = stats.correctAnswers;
    if (totalCorrect >= 150) return { icon: '🏆', text: language === 'ca' ? 'Mestre PGC' : 'Maestro PGC', color: 'text-yellow-500' };
    if (totalCorrect >= 100) return { icon: '🥇', text: language === 'ca' ? 'Expert' : 'Experto', color: 'text-orange-500' };
    if (totalCorrect >= 50) return { icon: '🥈', text: language === 'ca' ? 'Avançat' : 'Avanzado', color: 'text-gray-400' };
    if (totalCorrect >= 25) return { icon: '🥉', text: language === 'ca' ? 'Intermedi' : 'Intermedio', color: 'text-amber-600' };
    return { icon: '🌱', text: language === 'ca' ? 'Principiant' : 'Principiante', color: 'text-green-500' };
  };

  const getMotivationalMessage = (percentage: number) => {
    if (percentage === 100) {
      return language === 'ca' 
        ? '¡Perfecte! Ets un expert del PGC!' 
        : '¡Perfecto! ¡Eres un experto del PGC!';
    }
    if (percentage >= 80) {
      return language === 'ca'
        ? '¡Excel·lent! Estàs molt a prop de la perfecció!'
        : '¡Excelente! ¡Estás muy cerca de la perfección!';
    }
    if (percentage >= 60) {
      return language === 'ca'
        ? 'Molt bé! Continua practicant per millorar!'
        : '¡Muy bien! ¡Continúa practicando para mejorar!';
    }
    return language === 'ca'
      ? 'Segueix intentant-ho! Cada partida et fa millor!'
      : '¡Sigue intentándolo! ¡Cada partida te hace mejor!';
  };

  const isNewRecordScore = score > stats.bestScore && stats.totalGames > 0;

  if (!gameStarted) {
    const badge = getBadge();
    
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

        {/* Estadísticas del jugador */}
        {stats.totalGames > 0 && (
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg p-6 border-2 border-primary/10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className={`text-4xl ${badge.color}`}>{badge.icon}</span>
              <div className="text-left">
                <p className={`text-lg font-bold ${badge.color}`}>{badge.text}</p>
                <p className="text-sm text-foreground/60">
                  {language === 'ca' ? 'El teu nivell actual' : 'Tu nivel actual'}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-card/50 rounded-lg p-3">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Trophy className="w-4 h-4 text-accent" />
                  <p className="text-2xl font-bold text-accent">{stats.bestScore}</p>
                </div>
                <p className="text-xs text-foreground/60">
                  {language === 'ca' ? 'Millor puntuació' : 'Mejor puntuación'}
                </p>
              </div>
              
              <div className="bg-card/50 rounded-lg p-3">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Target className="w-4 h-4 text-primary" />
                  <p className="text-2xl font-bold text-primary">{stats.averageScore}</p>
                </div>
                <p className="text-xs text-foreground/60">
                  {language === 'ca' ? 'Mitjana' : 'Promedio'}
                </p>
              </div>
              
              <div className="bg-card/50 rounded-lg p-3">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <p className="text-2xl font-bold text-green-500">{stats.bestStreak}</p>
                </div>
                <p className="text-xs text-foreground/60">
                  {language === 'ca' ? 'Millor ratxa' : 'Mejor racha'}
                </p>
              </div>
              
              <div className="bg-card/50 rounded-lg p-3">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Award className="w-4 h-4 text-purple-500" />
                  <p className="text-2xl font-bold text-purple-500">{stats.totalGames}</p>
                </div>
                <p className="text-xs text-foreground/60">
                  {language === 'ca' ? 'Partides' : 'Partidas'}
                </p>
              </div>
            </div>

            {/* Botón para mostrar línea de tiempo */}
            {stats.gameHistory.length > 0 && (
              <button
                onClick={() => setShowTimeline(!showTimeline)}
                className="mt-4 w-full px-4 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Clock className="w-4 h-4" />
                {language === 'ca' ? 'Veure Historial' : 'Ver Historial'}
              </button>
            )}

            {/* Línea de tiempo */}
            {showTimeline && stats.gameHistory.length > 0 && (
              <div className="mt-4 space-y-2 max-h-48 overflow-y-auto">
                <p className="text-sm font-semibold text-foreground/70 mb-3">
                  {language === 'ca' ? 'Últimes 10 partides' : 'Últimas 10 partidas'}
                </p>
                {stats.gameHistory.map((record, idx) => (
                  <div key={idx} className="bg-card/30 rounded-lg p-3 text-left text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-foreground">
                        {new Date(record.date).toLocaleDateString(language === 'ca' ? 'ca-ES' : 'es-ES')}
                      </span>
                      <span className={`font-bold ${record.percentage >= 80 ? 'text-green-500' : record.percentage >= 60 ? 'text-yellow-500' : 'text-red-500'}`}>
                        {record.percentage}%
                      </span>
                    </div>
                    <div className="flex justify-between text-foreground/60 mt-1">
                      <span>{record.score}/{record.totalQuestions}</span>
                      <span>{record.duration}s</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="py-12 px-6 rounded-lg bg-gradient-to-br from-accent/10 to-primary/10 border-2 border-dashed border-accent/30">
          <div className="text-5xl mb-4">🎮</div>
          <p className="text-lg font-semibold text-primary mb-6">
            {language === 'ca' ? 'Joc Interactiu' : 'Juego Interactivo'}
          </p>
          <button
            onClick={() => {
              setGameStarted(true);
              setGameStartTime(Date.now());
            }}
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
        {showNewRecord && (
          <div className="animate-bounce mb-4">
            <div className="inline-block px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full">
              <p className="text-white font-bold">
                {language === 'ca' ? '🎉 NOU RÈCORD! 🎉' : '🎉 ¡NUEVO RÉCORD! 🎉'}
              </p>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <h3 className="text-3xl font-bold text-primary">
            {language === 'ca' ? 'Partida Finalitzada!' : '¡Partida Finalizada!'}
          </h3>
          
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-8 border-2 border-primary/20">
            <p className="text-6xl font-bold text-accent mb-2">{percentage}%</p>
            <p className="text-2xl font-semibold text-primary mb-4">
              {score} / {questions.length}
            </p>
            <p className="text-lg text-foreground/70">
              {getMotivationalMessage(percentage)}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card rounded-lg p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                <p className="font-semibold">{gameDuration}s</p>
              </div>
              <p className="text-xs text-foreground/60">
                {language === 'ca' ? 'Durada' : 'Duración'}
              </p>
            </div>
            <div className="bg-card rounded-lg p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <p className="font-semibold">{currentStreak}</p>
              </div>
              <p className="text-xs text-foreground/60">
                {language === 'ca' ? 'Ratxa Actual' : 'Racha Actual'}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleRestart}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          {language === 'ca' ? 'Jugar de Nou' : 'Jugar de Nuevo'}
        </button>
      </div>
    );
  }

  // Durante el juego
  return (
    <div className="space-y-6">
      {/* Progreso */}
      <div className="bg-card rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-semibold text-foreground">
            {language === 'ca' ? 'Pregunta' : 'Pregunta'} {currentQuestion + 1} / {questions.length}
          </p>
          <p className="text-sm font-semibold text-accent">{score} punts</p>
        </div>
        <div className="w-full bg-secondary rounded-full h-2">
          <div
            className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Pregunta */}
      <div className="space-y-4">
        <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg p-6 border-2 border-primary/10">
          <p className="text-lg font-semibold text-primary">
            {questions[currentQuestion].question}
          </p>
        </div>

        {/* Opciones */}
        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => !showExplanation && handleAnswer(idx)}
              disabled={showExplanation}
              className={`w-full p-4 rounded-lg font-semibold transition-all duration-200 text-left ${
                selectedAnswer === idx
                  ? idx === questions[currentQuestion].correct
                    ? 'bg-green-500/20 border-2 border-green-500 text-green-700'
                    : 'bg-red-500/20 border-2 border-red-500 text-red-700'
                  : 'bg-card border-2 border-border hover:border-accent hover:bg-accent/5'
              } ${showExplanation ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                  selectedAnswer === idx
                    ? idx === questions[currentQuestion].correct
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                    : 'bg-primary/10 text-primary'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </div>
                <span>{option}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Explicación */}
        {showExplanation && (
          <div className={`rounded-lg p-4 border-2 ${
            selectedAnswer === questions[currentQuestion].correct
              ? 'bg-green-500/10 border-green-500'
              : 'bg-red-500/10 border-red-500'
          }`}>
            <p className="font-semibold mb-2">
              {selectedAnswer === questions[currentQuestion].correct
                ? language === 'ca' ? '✓ Correcte!' : '✓ ¡Correcto!'
                : language === 'ca' ? '✗ Incorrecte' : '✗ Incorrecto'}
            </p>
            <p className="text-sm text-foreground/80">
              {questions[currentQuestion].explanation}
            </p>
          </div>
        )}

        {/* Botón Siguiente */}
        {showExplanation && (
          <button
            onClick={handleNext}
            className="btn-primary w-full"
          >
            {currentQuestion < questions.length - 1
              ? language === 'ca' ? 'Següent' : 'Siguiente'
              : language === 'ca' ? 'Finalitzar' : 'Finalizar'}
          </button>
        )}
      </div>
    </div>
  );
}
