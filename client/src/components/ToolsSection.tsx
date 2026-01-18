'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { t, getSection } from '@/lib/i18n';
import { Search, Gamepad2, AlertCircle, Mail, Filter, X } from 'lucide-react';
import { useState } from 'react';
import PGCGame from './PGCGame';

interface PGCAccount {
  code: string;
  name: string;
  nameEs: string;
  group: string;
  nature: 'Deudora' | 'Acreedora' | 'Mixta';
  category: string;
}

export default function ToolsSection() {
  const { language } = useLanguage();
  const tools = getSection(language, 'tools');
  const [activeTab, setActiveTab] = useState<'pgc' | 'game' | 'alerts' | 'contact'>('pgc');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterGroup, setFilterGroup] = useState<string>('');
  const [filterNature, setFilterNature] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactStatus, setContactStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Base de datos completa del PGC (100+ cuentas)
  const pgcData: PGCAccount[] = [
    // Grupo 1: Patrimonio
    { code: '100', name: 'Capital Social', nameEs: 'Capital Social', group: '1', nature: 'Acreedora', category: 'Patrimonio' },
    { code: '101', name: 'Fons de Comerç', nameEs: 'Fondo de Comercio', group: '1', nature: 'Deudora', category: 'Patrimonio' },
    { code: '102', name: 'Accions o Participacions del Patrimoni Net', nameEs: 'Acciones o Participaciones del Patrimonio Neto', group: '1', nature: 'Deudora', category: 'Patrimonio' },
    { code: '110', name: 'Reserves Voluntàries', nameEs: 'Reservas Voluntarias', group: '1', nature: 'Acreedora', category: 'Patrimonio' },
    { code: '113', name: 'Reserves Estatutàries', nameEs: 'Reservas Estatutarias', group: '1', nature: 'Acreedora', category: 'Patrimonio' },
    { code: '114', name: 'Reserves per a Accions de la Pròpia Empresa', nameEs: 'Reservas para Acciones de la Propia Empresa', group: '1', nature: 'Acreedora', category: 'Patrimonio' },
    { code: '115', name: 'Reserves per a Fons de Comerç', nameEs: 'Reservas para Fondo de Comercio', group: '1', nature: 'Acreedora', category: 'Patrimonio' },
    { code: '120', name: 'Resultats de l\'Exercici Anterior', nameEs: 'Resultados del Ejercicio Anterior', group: '1', nature: 'Mixta', category: 'Patrimonio' },
    { code: '121', name: 'Resultats de l\'Exercici', nameEs: 'Resultados del Ejercicio', group: '1', nature: 'Mixta', category: 'Patrimonio' },
    { code: '129', name: 'Altres Aportacions de Sòcis', nameEs: 'Otras Aportaciones de Socios', group: '1', nature: 'Acreedora', category: 'Patrimonio' },

    // Grupo 2: Activo No Corriente
    { code: '200', name: 'Béns Immobles', nameEs: 'Bienes Inmuebles', group: '2', nature: 'Deudora', category: 'Activo No Corriente' },
    { code: '201', name: 'Construccions', nameEs: 'Construcciones', group: '2', nature: 'Deudora', category: 'Activo No Corriente' },
    { code: '202', name: 'Instal·lacions Tècniques', nameEs: 'Instalaciones Técnicas', group: '2', nature: 'Deudora', category: 'Activo No Corriente' },
    { code: '203', name: 'Maquinària', nameEs: 'Maquinaria', group: '2', nature: 'Deudora', category: 'Activo No Corriente' },
    { code: '204', name: 'Utillatge', nameEs: 'Utillaje', group: '2', nature: 'Deudora', category: 'Activo No Corriente' },
    { code: '205', name: 'Mobiliari', nameEs: 'Mobiliario', group: '2', nature: 'Deudora', category: 'Activo No Corriente' },
    { code: '206', name: 'Equips per a Processament de Dades', nameEs: 'Equipos para Procesamiento de Datos', group: '2', nature: 'Deudora', category: 'Activo No Corriente' },
    { code: '207', name: 'Equips de Comunicacions', nameEs: 'Equipos de Comunicaciones', group: '2', nature: 'Deudora', category: 'Activo No Corriente' },
    { code: '208', name: 'Altres Instal·lacions', nameEs: 'Otras Instalaciones', group: '2', nature: 'Deudora', category: 'Activo No Corriente' },
    { code: '209', name: 'Béns en Curs de Construcció', nameEs: 'Bienes en Curso de Construcción', group: '2', nature: 'Deudora', category: 'Activo No Corriente' },
    { code: '210', name: 'Terrenys i Béns Naturals', nameEs: 'Terrenos y Bienes Naturales', group: '2', nature: 'Deudora', category: 'Activo No Corriente' },
    { code: '211', name: 'Construccions', nameEs: 'Construcciones', group: '2', nature: 'Deudora', category: 'Activo No Corriente' },
    { code: '212', name: 'Instal·lacions Tècniques', nameEs: 'Instalaciones Técnicas', group: '2', nature: 'Deudora', category: 'Activo No Corriente' },
    { code: '213', name: 'Maquinària', nameEs: 'Maquinaria', group: '2', nature: 'Deudora', category: 'Activo No Corriente' },
    { code: '214', name: 'Utillatge', nameEs: 'Utillaje', group: '2', nature: 'Deudora', category: 'Activo No Corriente' },
    { code: '215', name: 'Mobiliari', nameEs: 'Mobiliario', group: '2', nature: 'Deudora', category: 'Activo No Corriente' },
    { code: '216', name: 'Equips per a Processament de Dades', nameEs: 'Equipos para Procesamiento de Datos', group: '2', nature: 'Deudora', category: 'Activo No Corriente' },
    { code: '217', name: 'Equips de Comunicacions', nameEs: 'Equipos de Comunicaciones', group: '2', nature: 'Deudora', category: 'Activo No Corriente' },
    { code: '218', name: 'Material de Transport', nameEs: 'Material de Transporte', group: '2', nature: 'Deudora', category: 'Activo No Corriente' },
    { code: '219', name: 'Altres Instal·lacions', nameEs: 'Otras Instalaciones', group: '2', nature: 'Deudora', category: 'Activo No Corriente' },
    { code: '220', name: 'Inversions en Béns Immobles', nameEs: 'Inversiones en Bienes Inmuebles', group: '2', nature: 'Deudora', category: 'Activo No Corriente' },
    { code: '221', name: 'Béns Arrendats', nameEs: 'Bienes Arrendados', group: '2', nature: 'Deudora', category: 'Activo No Corriente' },
    { code: '222', name: 'Béns Immobles en Curs de Construcció', nameEs: 'Bienes Inmuebles en Curso de Construcción', group: '2', nature: 'Deudora', category: 'Activo No Corriente' },
    { code: '280', name: 'Amortització Acumulada de l\'Immobilitzat Material', nameEs: 'Amortización Acumulada del Inmovilizado Material', group: '2', nature: 'Acreedora', category: 'Activo No Corriente' },
    { code: '281', name: 'Amortització Acumulada de Construccions', nameEs: 'Amortización Acumulada de Construcciones', group: '2', nature: 'Acreedora', category: 'Activo No Corriente' },
    { code: '282', name: 'Amortització Acumulada de Instal·lacions Tècniques', nameEs: 'Amortización Acumulada de Instalaciones Técnicas', group: '2', nature: 'Acreedora', category: 'Activo No Corriente' },
    { code: '283', name: 'Amortització Acumulada de Maquinària', nameEs: 'Amortización Acumulada de Maquinaria', group: '2', nature: 'Acreedora', category: 'Activo No Corriente' },

    // Grupo 3: Activo Corriente
    { code: '300', name: 'Matèries Primeres i altres Aprovisionaments', nameEs: 'Materias Primas y otros Aprovisionamientos', group: '3', nature: 'Deudora', category: 'Activo Corriente' },
    { code: '301', name: 'Matèries Primeres', nameEs: 'Materias Primas', group: '3', nature: 'Deudora', category: 'Activo Corriente' },
    { code: '302', name: 'Embalatges', nameEs: 'Embalajes', group: '3', nature: 'Deudora', category: 'Activo Corriente' },
    { code: '303', name: 'Combustibles', nameEs: 'Combustibles', group: '3', nature: 'Deudora', category: 'Activo Corriente' },
    { code: '304', name: 'Altres Aprovisionaments', nameEs: 'Otros Aprovisionamientos', group: '3', nature: 'Deudora', category: 'Activo Corriente' },
    { code: '310', name: 'Producció en Curs', nameEs: 'Producción en Curso', group: '3', nature: 'Deudora', category: 'Activo Corriente' },
    { code: '320', name: 'Productes Semiacabats', nameEs: 'Productos Semiacabados', group: '3', nature: 'Deudora', category: 'Activo Corriente' },
    { code: '330', name: 'Productes Acabats', nameEs: 'Productos Acabados', group: '3', nature: 'Deudora', category: 'Activo Corriente' },
    { code: '340', name: 'Subproductes, Residus i Materials de Rebuig', nameEs: 'Subproductos, Residuos y Materiales de Desecho', group: '3', nature: 'Deudora', category: 'Activo Corriente' },
    { code: '350', name: 'Mercaderies', nameEs: 'Mercaderías', group: '3', nature: 'Deudora', category: 'Activo Corriente' },
    { code: '360', name: 'Deteriorament de Valor de les Existències', nameEs: 'Deterioro de Valor de las Existencias', group: '3', nature: 'Acreedora', category: 'Activo Corriente' },
    { code: '400', name: 'Clients', nameEs: 'Clientes', group: '4', nature: 'Deudora', category: 'Deudores' },
    { code: '410', name: 'Clients, Efectes Comercials a Cobrar', nameEs: 'Clientes, Efectos Comerciales a Cobrar', group: '4', nature: 'Deudora', category: 'Deudores' },
    { code: '430', name: 'Clients, Efectes Comercials Descomptats', nameEs: 'Clientes, Efectos Comerciales Descontados', group: '4', nature: 'Deudora', category: 'Deudores' },
    { code: '440', name: 'Deutors Diversos', nameEs: 'Deudores Diversos', group: '4', nature: 'Deudora', category: 'Deudores' },
    { code: '460', name: 'Administracions Públiques, Deudora', nameEs: 'Administraciones Públicas, Deudora', group: '4', nature: 'Deudora', category: 'Deudores' },
    { code: '470', name: 'Hisenda Pública, Deudora per IVA', nameEs: 'Hacienda Pública, Deudora por IVA', group: '4', nature: 'Deudora', category: 'Deudores' },
    { code: '471', name: 'Hisenda Pública, Deudora per Altres Conceptes', nameEs: 'Hacienda Pública, Deudora por Otros Conceptos', group: '4', nature: 'Deudora', category: 'Deudores' },
    { code: '490', name: 'Deteriorament de Valor de Crèdits Comercials', nameEs: 'Deterioro de Valor de Créditos Comerciales', group: '4', nature: 'Acreedora', category: 'Deudores' },

    // Grupo 5: Tesorería
    { code: '500', name: 'Efectiu', nameEs: 'Efectivo', group: '5', nature: 'Deudora', category: 'Tesorería' },
    { code: '510', name: 'Bancs', nameEs: 'Bancos', group: '5', nature: 'Deudora', category: 'Tesorería' },
    { code: '511', name: 'Caixas d\'Estalvi', nameEs: 'Cajas de Ahorro', group: '5', nature: 'Deudora', category: 'Tesorería' },
    { code: '512', name: 'Cooperatives de Crèdit', nameEs: 'Cooperativas de Crédito', group: '5', nature: 'Deudora', category: 'Tesorería' },
    { code: '513', name: 'Altres Institucions de Crèdit', nameEs: 'Otras Instituciones de Crédito', group: '5', nature: 'Deudora', category: 'Tesorería' },
    { code: '514', name: 'Bancs en l\'Estranger', nameEs: 'Bancos en el Extranjero', group: '5', nature: 'Deudora', category: 'Tesorería' },
    { code: '520', name: 'Inversions Financeres a Curt Termini', nameEs: 'Inversiones Financieras a Corto Plazo', group: '5', nature: 'Deudora', category: 'Tesorería' },
    { code: '521', name: 'Valors de Renda Fixa', nameEs: 'Valores de Renta Fija', group: '5', nature: 'Deudora', category: 'Tesorería' },
    { code: '522', name: 'Valors de Renda Variable', nameEs: 'Valores de Renta Variable', group: '5', nature: 'Deudora', category: 'Tesorería' },

    // Grupo 6: Compras y Gastos
    { code: '600', name: 'Compres de Matèries Primeres', nameEs: 'Compras de Materias Primas', group: '6', nature: 'Deudora', category: 'Compras' },
    { code: '601', name: 'Compres de Embalatges', nameEs: 'Compras de Embalajes', group: '6', nature: 'Deudora', category: 'Compras' },
    { code: '602', name: 'Compres de Combustibles', nameEs: 'Compras de Combustibles', group: '6', nature: 'Deudora', category: 'Compras' },
    { code: '603', name: 'Compres d\'altres Aprovisionaments', nameEs: 'Compras de otros Aprovisionamientos', group: '6', nature: 'Deudora', category: 'Compras' },
    { code: '605', name: 'Subministraments', nameEs: 'Suministros', group: '6', nature: 'Deudora', category: 'Gastos' },
    { code: '606', name: 'Compres de Serveis', nameEs: 'Compras de Servicios', group: '6', nature: 'Deudora', category: 'Gastos' },
    { code: '610', name: 'Variació de Existències de Matèries Primeres', nameEs: 'Variación de Existencias de Materias Primas', group: '6', nature: 'Mixta', category: 'Compras' },
    { code: '611', name: 'Variació de Existències de Producció en Curs', nameEs: 'Variación de Existencias de Producción en Curso', group: '6', nature: 'Mixta', category: 'Compras' },
    { code: '612', name: 'Variació de Existències de Productes Semiacabats', nameEs: 'Variación de Existencias de Productos Semiacabados', group: '6', nature: 'Mixta', category: 'Compras' },
    { code: '613', name: 'Variació de Existències de Productes Acabats', nameEs: 'Variación de Existencias de Productos Acabados', group: '6', nature: 'Mixta', category: 'Compras' },
    { code: '620', name: 'Serveis de Professional Independents', nameEs: 'Servicios de Profesionales Independientes', group: '6', nature: 'Deudora', category: 'Gastos' },
    { code: '621', name: 'Arrendaments i Cànons', nameEs: 'Arrendamientos y Cánones', group: '6', nature: 'Deudora', category: 'Gastos' },
    { code: '622', name: 'Reparacions i Conservació', nameEs: 'Reparaciones y Conservación', group: '6', nature: 'Deudora', category: 'Gastos' },
    { code: '623', name: 'Serveis de Telecomunicacions', nameEs: 'Servicios de Telecomunicaciones', group: '6', nature: 'Deudora', category: 'Gastos' },
    { code: '624', name: 'Transports', nameEs: 'Transportes', group: '6', nature: 'Deudora', category: 'Gastos' },
    { code: '625', name: 'Viatges i Dietes', nameEs: 'Viajes y Dietas', group: '6', nature: 'Deudora', category: 'Gastos' },
    { code: '626', name: 'Publicitat i Propaganda', nameEs: 'Publicidad y Propaganda', group: '6', nature: 'Deudora', category: 'Gastos' },
    { code: '627', name: 'Altres Despeses de Gestió', nameEs: 'Otros Gastos de Gestión', group: '6', nature: 'Deudora', category: 'Gastos' },
    { code: '628', name: 'Donacions', nameEs: 'Donaciones', group: '6', nature: 'Deudora', category: 'Gastos' },
    { code: '630', name: 'Impostos sobre els Beneficis', nameEs: 'Impuestos sobre los Beneficios', group: '6', nature: 'Deudora', category: 'Gastos' },
    { code: '631', name: 'Altres Impostos', nameEs: 'Otros Impuestos', group: '6', nature: 'Deudora', category: 'Gastos' },
    { code: '640', name: 'Salaris i Jornals', nameEs: 'Salarios y Jornales', group: '6', nature: 'Deudora', category: 'Personal' },
    { code: '641', name: 'Indemnitzacions', nameEs: 'Indemnizaciones', group: '6', nature: 'Deudora', category: 'Personal' },
    { code: '642', name: 'Aportacions a la Seguretat Social', nameEs: 'Aportaciones a la Seguridad Social', group: '6', nature: 'Deudora', category: 'Personal' },
    { code: '650', name: 'Altres Despeses de Gestió', nameEs: 'Otros Gastos de Gestión', group: '6', nature: 'Deudora', category: 'Gastos' },
    { code: '660', name: 'Interessos de Deutes', nameEs: 'Intereses de Deudas', group: '6', nature: 'Deudora', category: 'Gastos' },
    { code: '670', name: 'Pèrdues en la Disposició de l\'Immobilitzat', nameEs: 'Pérdidas en la Disposición del Inmovilizado', group: '6', nature: 'Deudora', category: 'Gastos' },
    { code: '678', name: 'Gastos Extraordinaris', nameEs: 'Gastos Extraordinarios', group: '6', nature: 'Deudora', category: 'Gastos' },
    { code: '680', name: 'Amortització de l\'Immobilitzat Material', nameEs: 'Amortización del Inmovilizado Material', group: '6', nature: 'Deudora', category: 'Gastos' },
    { code: '681', name: 'Amortització de l\'Immobilitzat Intangible', nameEs: 'Amortización del Inmovilizado Intangible', group: '6', nature: 'Deudora', category: 'Gastos' },
    { code: '690', name: 'Pèrdues per Deteriorament del No Corrient', nameEs: 'Pérdidas por Deterioro del No Corriente', group: '6', nature: 'Deudora', category: 'Gastos' },
    { code: '691', name: 'Pèrdues per Deteriorament del Circulant', nameEs: 'Pérdidas por Deterioro del Circulante', group: '6', nature: 'Deudora', category: 'Gastos' },

    // Grupo 7: Ventas e Ingresos
    { code: '700', name: 'Vendes de Béns i Serveis', nameEs: 'Ventas de Bienes y Servicios', group: '7', nature: 'Acreedora', category: 'Ventas' },
    { code: '701', name: 'Vendes de Matèries Primeres', nameEs: 'Ventas de Materias Primas', group: '7', nature: 'Acreedora', category: 'Ventas' },
    { code: '702', name: 'Vendes de Productes Semiacabats', nameEs: 'Ventas de Productos Semiacabados', group: '7', nature: 'Acreedora', category: 'Ventas' },
    { code: '703', name: 'Vendes de Productes Acabats', nameEs: 'Ventas de Productos Acabados', group: '7', nature: 'Acreedora', category: 'Ventas' },
    { code: '704', name: 'Vendes de Mercaderies', nameEs: 'Ventas de Mercaderías', group: '7', nature: 'Acreedora', category: 'Ventas' },
    { code: '705', name: 'Prestació de Serveis', nameEs: 'Prestación de Servicios', group: '7', nature: 'Acreedora', category: 'Ventas' },
    { code: '706', name: 'Altres Ingressos de Vendes', nameEs: 'Otros Ingresos de Ventas', group: '7', nature: 'Acreedora', category: 'Ventas' },
    { code: '708', name: 'Vendes de Residus i Materials de Rebuig', nameEs: 'Ventas de Residuos y Materiales de Desecho', group: '7', nature: 'Acreedora', category: 'Ventas' },
    { code: '709', name: 'Devolucions de Vendes i Rebaixos', nameEs: 'Devoluciones de Ventas y Rebajas', group: '7', nature: 'Deudora', category: 'Ventas' },
    { code: '750', name: 'Ingressos de Béns Immobles', nameEs: 'Ingresos de Bienes Inmuebles', group: '7', nature: 'Acreedora', category: 'Ingresos' },
    { code: '751', name: 'Altres Ingressos de Gestió', nameEs: 'Otros Ingresos de Gestión', group: '7', nature: 'Acreedora', category: 'Ingresos' },
    { code: '760', name: 'Ingressos per Interessos de Crèdits', nameEs: 'Ingresos por Intereses de Créditos', group: '7', nature: 'Acreedora', category: 'Ingresos' },
    { code: '761', name: 'Ingressos per Dividends de Participacions en el Patrimoni Net', nameEs: 'Ingresos por Dividendos de Participaciones en el Patrimonio Neto', group: '7', nature: 'Acreedora', category: 'Ingresos' },
    { code: '762', name: 'Ingressos per Interessos de Valors de Renda Fixa', nameEs: 'Ingresos por Intereses de Valores de Renta Fija', group: '7', nature: 'Acreedora', category: 'Ingresos' },
    { code: '770', name: 'Altres Ingressos Financers', nameEs: 'Otros Ingresos Financieros', group: '7', nature: 'Acreedora', category: 'Ingresos' },
    { code: '771', name: 'Guanys en la Disposició de l\'Immobilitzat', nameEs: 'Ganancias en la Disposición del Inmovilizado', group: '7', nature: 'Acreedora', category: 'Ingresos' },
    { code: '778', name: 'Ingressos Extraordinaris', nameEs: 'Ingresos Extraordinarios', group: '7', nature: 'Acreedora', category: 'Ingresos' },
  ];

  // Filtrar datos
  const filteredPGC = pgcData.filter(item => {
    const matchesSearch = 
      item.code.includes(searchQuery) || 
      (language === 'ca' ? item.name : item.nameEs).toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGroup = !filterGroup || item.group === filterGroup;
    const matchesNature = !filterNature || item.nature === filterNature;
    return matchesSearch && matchesGroup && matchesNature;
  });

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactStatus('loading');
    
    try {
      // Simular envío (en producción, conectar con un backend real)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Aquí iría la llamada a un API real
      console.log('Mensaje enviado:', contactForm);
      
      setContactStatus('success');
      setContactForm({ name: '', email: '', message: '' });
      setTimeout(() => setContactStatus('idle'), 3000);
    } catch (error) {
      setContactStatus('error');
      setTimeout(() => setContactStatus('idle'), 3000);
    }
  };

  const toolCards = [
    {
      id: 'pgc',
      title: tools.pgc_app?.title,
      description: tools.pgc_app?.description,
      icon: Search,
      color: 'blue',
    },
    {
      id: 'game',
      title: tools.pgc_game?.title,
      description: tools.pgc_game?.description,
      icon: Gamepad2,
      color: 'green',
    },
    {
      id: 'alerts',
      title: tools.fiscal_alerts?.title,
      description: tools.fiscal_alerts?.description,
      icon: AlertCircle,
      color: 'amber',
    },
    {
      id: 'contact',
      title: language === 'ca' ? 'Contacte' : 'Contacto',
      description: language === 'ca' ? 'Envia\'m un missatge' : 'Envíame un mensaje',
      icon: Mail,
      color: 'purple',
    },
  ];

  return (
    <section id="tools" className="py-16 md:py-24 bg-background">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {tools.title}
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            {tools.subtitle}
          </p>
        </div>

        {/* Tool Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 md:mb-16">
          {toolCards.map((tool) => {
            const Icon = tool.icon;
            const isActive = activeTab === tool.id;
            return (
              <button
                key={tool.id}
                onClick={() => setActiveTab(tool.id as any)}
                className={`card-float p-6 md:p-8 text-left transition-all duration-300 hover:shadow-lg group ${
                  isActive ? 'ring-2 ring-accent' : ''
                }`}
              >
                <div className={`p-3 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform ${
                  tool.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                  tool.color === 'green' ? 'bg-green-100 text-green-600' :
                  tool.color === 'amber' ? 'bg-amber-100 text-amber-600' :
                  'bg-purple-100 text-purple-600'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">{tool.title}</h3>
                <p className="text-sm text-foreground/70">{tool.description}</p>
              </button>
            );
          })}
        </div>

        {/* Active Tool Content */}
        <div className="card-float p-8 md:p-12 animate-fade-in-up">
          {/* PGC Searcher */}
          {activeTab === 'pgc' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-primary mb-2">
                  {tools.pgc_app?.title}
                </h3>
                <p className="text-foreground/70">
                  {tools.pgc_app?.description}
                </p>
              </div>

              {/* Search and Filters */}
              <div className="space-y-4">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-foreground/40 w-5 h-5" />
                  <input
                    type="text"
                    placeholder={tools.pgc_app?.placeholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-border focus:border-accent focus:outline-none transition-colors"
                  />
                </div>

                {/* Filter Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  {language === 'ca' ? 'Filtres' : 'Filtros'}
                </button>

                {/* Filters */}
                {showFilters && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-secondary rounded-lg">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        {language === 'ca' ? 'Grup' : 'Grupo'}
                      </label>
                      <select
                        value={filterGroup}
                        onChange={(e) => setFilterGroup(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border-2 border-border focus:border-accent focus:outline-none"
                      >
                        <option value="">{language === 'ca' ? 'Tots' : 'Todos'}</option>
                        {['1', '2', '3', '4', '5', '6', '7'].map(group => (
                          <option key={group} value={group}>
                            {language === 'ca' ? `Grup ${group}` : `Grupo ${group}`}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        {language === 'ca' ? 'Naturalesa' : 'Naturaleza'}
                      </label>
                      <select
                        value={filterNature}
                        onChange={(e) => setFilterNature(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border-2 border-border focus:border-accent focus:outline-none"
                      >
                        <option value="">{language === 'ca' ? 'Totes' : 'Todas'}</option>
                        <option value="Deudora">{language === 'ca' ? 'Deutora' : 'Deudora'}</option>
                        <option value="Acreedora">{language === 'ca' ? 'Acreïdora' : 'Acreedora'}</option>
                        <option value="Mixta">{language === 'ca' ? 'Mixta' : 'Mixta'}</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* Results Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-border">
                      <th className="text-left py-3 px-4 font-semibold text-primary">
                        {tools.pgc_app?.code}
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-primary">
                        {tools.pgc_app?.name}
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-primary">
                        {tools.pgc_app?.group}
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-primary">
                        {language === 'ca' ? 'Naturalesa' : 'Naturaleza'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPGC.length > 0 ? (
                      filteredPGC.map((item, index) => (
                        <tr key={index} className="border-b border-border hover:bg-accent/5 transition-colors">
                          <td className="py-3 px-4 font-semibold text-accent">{item.code}</td>
                          <td className="py-3 px-4 text-foreground">
                            {language === 'ca' ? item.name : item.nameEs}
                          </td>
                          <td className="py-3 px-4 text-foreground/70">{item.group}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              item.nature === 'Deudora' ? 'bg-blue-100 text-blue-700' :
                              item.nature === 'Acreedora' ? 'bg-green-100 text-green-700' :
                              'bg-purple-100 text-purple-700'
                            }`}>
                              {language === 'ca' 
                                ? (item.nature === 'Deudora' ? 'Deutora' : item.nature === 'Acreedora' ? 'Acreïdora' : 'Mixta')
                                : item.nature}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="py-6 text-center text-foreground/50">
                          {tools.pgc_app?.no_results}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <p className="text-xs text-foreground/50">
                {language === 'ca' 
                  ? `Mostrant ${filteredPGC.length} de ${pgcData.length} cuentas`
                  : `Mostrando ${filteredPGC.length} de ${pgcData.length} cuentas`}
              </p>
            </div>
          )}

          {/* PGC Game */}
          {activeTab === 'game' && (
            <PGCGame />
          )}

          {/* Fiscal Alerts */}
          {activeTab === 'alerts' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-primary mb-2">
                  {tools.fiscal_alerts?.title}
                </h3>
                <p className="text-foreground/70">
                  {tools.fiscal_alerts?.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { month: 'january', alerts: ['IVA', 'Retencions'] },
                  { month: 'april', alerts: ['Declaració Renta', 'IVA'] },
                  { month: 'july', alerts: ['Pagament Impost Societats'] },
                ].map((item, index) => (
                  <div key={index} className="p-4 bg-secondary rounded-lg border-l-4 border-accent">
                    <h4 className="font-semibold text-primary mb-2">
                      {tools.fiscal_alerts?.[item.month as keyof typeof tools.fiscal_alerts]}
                    </h4>
                    <ul className="space-y-1 text-sm text-foreground/70">
                      {item.alerts.map((alert, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-accent" />
                          {alert}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-amber-50 border-l-4 border-amber-500 rounded-lg">
                <p className="text-sm text-amber-900">
                  {language === 'ca'
                    ? '⚠️ Aquestes són les dates més importants. Consulta sempre la web de Hisenda per a dates exactes.'
                    : '⚠️ Estas son las fechas más importantes. Consulta siempre la web de Hacienda para fechas exactas.'
                  }
                </p>
              </div>
            </div>
          )}

          {/* Contact Form */}
          {activeTab === 'contact' && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h3 className="text-2xl font-bold text-primary mb-2">
                  {language === 'ca' ? 'Contacte' : 'Contacto'}
                </h3>
                <p className="text-foreground/70">
                  {language === 'ca' 
                    ? 'Envia\'m un missatge i et respondré al més aviat possible.'
                    : 'Envíame un mensaje y te responderé lo antes posible.'}
                </p>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    {language === 'ca' ? 'Nom' : 'Nombre'}
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2 border-border focus:border-accent focus:outline-none transition-colors"
                    placeholder={language === 'ca' ? 'El teu nom' : 'Tu nombre'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2 border-border focus:border-accent focus:outline-none transition-colors"
                    placeholder="teu@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    {language === 'ca' ? 'Missatge' : 'Mensaje'}
                  </label>
                  <textarea
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border-2 border-border focus:border-accent focus:outline-none transition-colors resize-none"
                    placeholder={language === 'ca' ? 'El teu missatge aquí...' : 'Tu mensaje aquí...'}
                  />
                </div>

                {contactStatus === 'success' && (
                  <div className="p-4 bg-green-100 border-l-4 border-green-500 rounded-lg">
                    <p className="text-green-900 font-semibold">
                      {language === 'ca' ? '✓ Missatge enviat correctament!' : '✓ ¡Mensaje enviado correctamente!'}
                    </p>
                  </div>
                )}

                {contactStatus === 'error' && (
                  <div className="p-4 bg-red-100 border-l-4 border-red-500 rounded-lg">
                    <p className="text-red-900 font-semibold">
                      {language === 'ca' ? '✗ Error en l\'enviament del missatge' : '✗ Error al enviar el mensaje'}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={contactStatus === 'loading'}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {contactStatus === 'loading' 
                    ? (language === 'ca' ? 'Enviant...' : 'Enviando...')
                    : (language === 'ca' ? 'Enviar Missatge' : 'Enviar Mensaje')}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
