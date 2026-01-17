/**
 * Sistema de Internacionalización (i18n)
 * Soporta Catalán (ca) y Castellano (es)
 * Estructura centralizada para facilitar mantenimiento y traducción
 */

export type Language = 'ca' | 'es';

export const translations = {
  ca: {
    // Header & Navigation
    header: {
      home: 'Inici',
      about: 'Sobre mi',
      blog: 'Blog IA Contable',
      tools: 'Eines Fiscals',
      contact: 'Contacte',
      language: 'Idioma',
    },
    
    // Hero Section
    hero: {
      title: 'Patricia Bustos Paco',
      subtitle: 'Administrativa Contable & Especialista en IA',
      description: 'Transformant la gestió administrativa i fiscal mitjançant intel·ligència artificial. +15 anys d\'experiència en contabilitat, ERP i automatització.',
      cta_primary: 'Explora les Eines',
      cta_secondary: 'Llegeix el Blog',
    },

    // About Section
    about: {
      title: 'Sobre mi',
      intro: 'Sóc una professional administrativa amb més de 15 anys d\'experiència en gestió contable i atenció al client. Especialitzada en sistemes ERP (SAGE, SAP, Dynamics 365) i actualment explorant les possibilitats de la IA en contabilitat.',
      
      experience_title: 'Experiència Professional',
      experience_items: [
        {
          year: '2025',
          company: 'Administrativa Comptable Valles 222 SL',
          role: 'Administrativa Comptable',
          description: 'Facturació, gestió de moviments hoteleros, comptabilitat general i gestió de tesoreria amb SAGE 200.',
        },
        {
          year: '2008-2023',
          company: 'Caixera, Bon Preu S.A.',
          role: 'Atenció al Client i Gestió',
          description: 'Atenció al client, gestió de comandes, distribució i resolució de reclamacions.',
        },
        {
          year: '2000-2007',
          company: 'Administrativa, Avicons S.A.',
          role: 'Administrativa (Empresa Constructora)',
          description: 'Gestió de documents, actualització de dades en ERP, emissió de factures i tasques administratives generals.',
        },
      ],

      skills_title: 'Habilitats Tècniques',
      skills: [
        { name: 'SAGE 200', category: 'ERP' },
        { name: 'SAP', category: 'ERP' },
        { name: 'Dynamics 365', category: 'ERP' },
        { name: 'ChatGPT & Prompt Engineering', category: 'IA' },
        { name: 'Comptabilitat General', category: 'Comptable' },
        { name: 'Gestió Fiscal', category: 'Fiscal' },
      ],

      education_title: 'Formació',
      education: [
        {
          year: '2025',
          title: 'C.P. Activitats de Gestió Administrativa',
          institution: 'BIT\'S Centre de Formació S.L.',
          hours: '800 hores',
        },
        {
          year: '2025',
          title: 'Comptabilitat Avançada',
          institution: 'BIT\'S Centre de Formació S.L.',
          hours: '60 hores',
        },
        {
          year: '2025',
          title: 'Nòmines i Seguretat Social I',
          institution: 'BIT\'S Centre de Formació S.L.',
          hours: '30 hores',
        },
        {
          year: '2025',
          title: 'ACTIC Mitjà',
          institution: 'Número de registre: 2025256720723',
        },
        {
          year: '2025',
          title: 'Primers Auxilis Bàsics',
          institution: 'Tres punts consultors, S.L.',
          hours: '30 hores',
        },
        {
          year: '2013',
          title: 'Secretariat Mèdic',
          institution: 'Euroinnova Formació',
          hours: '420 hores',
        },
        {
          year: '2010',
          title: 'Tècnic Webmaster i Disseny de Pàgines Web',
          institution: 'Escola professional d\'aplicacions informàtiques',
          hours: '440 hores',
        },
        {
          year: '2000',
          title: 'Tècnic Superior en Administració',
          institution: 'IES CATEC',
          hours: '950 hores',
        },
      ],

      languages_title: 'Idiomes',
      languages: [
        { language: 'Castellà', level: 'Natiu' },
        { language: 'Català', level: 'Avançat' },
        { language: 'Italià', level: 'Inicial' },
      ],

      certifications_title: 'Certificacions Addicionals',
      certifications: [
        'Permís de conduir B',
        'Disponibilitat de cotxe',
      ],
    },

    // Blog Section
    blog: {
      title: 'Blog: IA en Comptabilitat',
      subtitle: 'Articles sobre automatització fiscal, PGC i innovació contable',
      categories: {
        pgc: 'PGC (Pla General Comptable)',
        verifactu: 'Verifactu',
        fiscal_calendar: 'Calendari Fiscal',
        ia_automation: 'Automatització amb IA',
      },
      read_more: 'Llegir més',
      coming_soon: 'Properament',
    },

    // Tools Section
    tools: {
      title: 'Eines Fiscals & Interactives',
      subtitle: 'Recursos pràctics per a professionals comptables',
      
      pgc_app: {
        title: 'Buscador PGC',
        description: 'Busca comptes del Pla General Comptable per codi o nom. Base de dades completa i actualitzada.',
        placeholder: 'Buscar per codi (ex: 100) o nom (ex: Capital)...',
        search: 'Cercar',
        results: 'Resultats',
        no_results: 'No s\'han trobat resultats',
        code: 'Codi',
        name: 'Nom',
        type: 'Tipus',
        group: 'Grup',
      },

      pgc_game: {
        title: 'El Joc del PGC',
        description: 'Quiz interactiu per posar a prova els teus coneixements comptables. Aprèn jugant!',
        start_game: 'Comença el Joc',
        question: 'Pregunta',
        of: 'de',
        correct: 'Correcte!',
        incorrect: 'Incorrecte',
        score: 'Puntuació',
        next: 'Següent',
        finish: 'Finalitzar',
        try_again: 'Intentar de nou',
        final_score: 'Puntuació Final',
      },

      fiscal_alerts: {
        title: 'Alertes Fiscals',
        description: 'Calendari de venciments fiscals i obligacions de Hisenda. Mantén-te informat!',
        january: 'Gener',
        february: 'Febrer',
        march: 'Març',
        april: 'Abril',
        may: 'Maig',
        june: 'Juny',
        july: 'Juliol',
        august: 'Agost',
        september: 'Setembre',
        october: 'Octubre',
        november: 'Novembre',
        december: 'Desembre',
      },
    },

    // Footer
    footer: {
      contact_title: 'Contacte',
      email: 'prpb03@gmail.com',
      phone: '678839750',
      location: 'Granollers, 08402',
      follow: 'Segueix-me',
      rights: '© 2025 Patricia Bustos Paco. Tots els drets reservats.',
    },

    // Common
    common: {
      loading: 'Carregant...',
      error: 'Error',
      success: 'Èxit',
      close: 'Tancar',
      back: 'Enrere',
      next: 'Següent',
      previous: 'Anterior',
      download: 'Descarregar',
      share: 'Compartir',
    },
  },

  es: {
    // Header & Navigation
    header: {
      home: 'Inicio',
      about: 'Sobre mí',
      blog: 'Blog IA Contable',
      tools: 'Herramientas Fiscales',
      contact: 'Contacto',
      language: 'Idioma',
    },

    // Hero Section
    hero: {
      title: 'Patricia Bustos Paco',
      subtitle: 'Administrativa Contable & Especialista en IA',
      description: 'Transformando la gestión administrativa y fiscal mediante inteligencia artificial. +15 años de experiencia en contabilidad, ERP y automatización.',
      cta_primary: 'Explora las Herramientas',
      cta_secondary: 'Lee el Blog',
    },

    // About Section
    about: {
      title: 'Sobre mí',
      intro: 'Soy una profesional administrativa con más de 15 años de experiencia en gestión contable y atención al cliente. Especializada en sistemas ERP (SAGE, SAP, Dynamics 365) y actualmente explorando las posibilidades de la IA en contabilidad.',
      
      experience_title: 'Experiencia Profesional',
      experience_items: [
        {
          year: '2025',
          company: 'Administrativa Comptable Valles 222 SL',
          role: 'Administrativa Contable',
          description: 'Facturación, gestión de movimientos hoteleros, contabilidad general y gestión de tesorería con SAGE 200.',
        },
        {
          year: '2008-2023',
          company: 'Caixera, Bon Preu S.A.',
          role: 'Atención al Cliente y Gestión',
          description: 'Atención al cliente, gestión de pedidos, distribución y resolución de reclamaciones.',
        },
        {
          year: '2000-2007',
          company: 'Administrativa, Avicons S.A.',
          role: 'Administrativa (Empresa Constructora)',
          description: 'Gestión de documentos, actualización de datos en ERP, emisión de facturas y tareas administrativas generales.',
        },
      ],

      skills_title: 'Habilidades Técnicas',
      skills: [
        { name: 'SAGE 200', category: 'ERP' },
        { name: 'SAP', category: 'ERP' },
        { name: 'Dynamics 365', category: 'ERP' },
        { name: 'ChatGPT & Prompt Engineering', category: 'IA' },
        { name: 'Contabilidad General', category: 'Contable' },
        { name: 'Gestión Fiscal', category: 'Fiscal' },
      ],

      education_title: 'Formación',
      education: [
        {
          year: '2025',
          title: 'C.P. Actividades de Gestión Administrativa',
          institution: 'BIT\'S Centro de Formación S.L.',
          hours: '800 horas',
        },
        {
          year: '2025',
          title: 'Contabilidad Avanzada',
          institution: 'BIT\'S Centro de Formación S.L.',
          hours: '60 horas',
        },
        {
          year: '2025',
          title: 'Nóminas y Seguridad Social I',
          institution: 'BIT\'S Centro de Formación S.L.',
          hours: '30 horas',
        },
        {
          year: '2025',
          title: 'ACTIC Medio',
          institution: 'Número de registro: 2025256720723',
        },
        {
          year: '2025',
          title: 'Primeros Auxilios Básicos',
          institution: 'Tres puntos consultores, S.L.',
          hours: '30 horas',
        },
        {
          year: '2013',
          title: 'Secretariado Médico',
          institution: 'Euroinnova Formación',
          hours: '420 horas',
        },
        {
          year: '2010',
          title: 'Técnico Webmaster y Diseño de Páginas Web',
          institution: 'Escuela profesional de aplicaciones informáticas',
          hours: '440 horas',
        },
        {
          year: '2000',
          title: 'Técnico Superior en Administración',
          institution: 'IES CATEC',
          hours: '950 horas',
        },
      ],

      languages_title: 'Idiomas',
      languages: [
        { language: 'Castellano', level: 'Nativo' },
        { language: 'Catalán', level: 'Avanzado' },
        { language: 'Italiano', level: 'Inicial' },
      ],

      certifications_title: 'Certificaciones Adicionales',
      certifications: [
        'Permiso de conducir B',
        'Disponibilidad de coche',
      ],
    },

    // Blog Section
    blog: {
      title: 'Blog: IA en Contabilidad',
      subtitle: 'Artículos sobre automatización fiscal, PGC e innovación contable',
      categories: {
        pgc: 'PGC (Plan General Contable)',
        verifactu: 'Verifactu',
        fiscal_calendar: 'Calendario Fiscal',
        ia_automation: 'Automatización con IA',
      },
      read_more: 'Leer más',
      coming_soon: 'Próximamente',
    },

    // Tools Section
    tools: {
      title: 'Herramientas Fiscales e Interactivas',
      subtitle: 'Recursos prácticos para profesionales contables',
      
      pgc_app: {
        title: 'Buscador PGC',
        description: 'Busca cuentas del Plan General Contable por código o nombre. Base de datos completa y actualizada.',
        placeholder: 'Buscar por código (ej: 100) o nombre (ej: Capital)...',
        search: 'Buscar',
        results: 'Resultados',
        no_results: 'No se encontraron resultados',
        code: 'Código',
        name: 'Nombre',
        type: 'Tipo',
        group: 'Grupo',
      },

      pgc_game: {
        title: 'El Juego del PGC',
        description: 'Quiz interactivo para poner a prueba tus conocimientos contables. ¡Aprende jugando!',
        start_game: 'Comenzar Juego',
        question: 'Pregunta',
        of: 'de',
        correct: '¡Correcto!',
        incorrect: 'Incorrecto',
        score: 'Puntuación',
        next: 'Siguiente',
        finish: 'Finalizar',
        try_again: 'Intentar de nuevo',
        final_score: 'Puntuación Final',
      },

      fiscal_alerts: {
        title: 'Alertas Fiscales',
        description: 'Calendario de vencimientos fiscales y obligaciones de Hacienda. ¡Mantente informado!',
        january: 'Enero',
        february: 'Febrero',
        march: 'Marzo',
        april: 'Abril',
        may: 'Mayo',
        june: 'Junio',
        july: 'Julio',
        august: 'Agosto',
        september: 'Septiembre',
        october: 'Octubre',
        november: 'Noviembre',
        december: 'Diciembre',
      },
    },

    // Footer
    footer: {
      contact_title: 'Contacto',
      email: 'prpb03@gmail.com',
      phone: '678839750',
      location: 'Granollers, 08402',
      follow: 'Sígueme',
      rights: '© 2025 Patricia Bustos Paco. Todos los derechos reservados.',
    },

    // Common
    common: {
      loading: 'Cargando...',
      error: 'Error',
      success: 'Éxito',
      close: 'Cerrar',
      back: 'Atrás',
      next: 'Siguiente',
      previous: 'Anterior',
      download: 'Descargar',
      share: 'Compartir',
    },
  },
};

/**
 * Función helper para obtener traducciones
 * @param language - Idioma actual (ca o es)
 * @param path - Ruta de la traducción (ej: 'header.home')
 * @returns Texto traducido
 */
export const t = (language: Language, path: string): string => {
  const keys = path.split('.');
  let value: any = translations[language];
  
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      return path; // Retorna la ruta si no encuentra la traducción
    }
  }
  
  return typeof value === 'string' ? value : path;
};

/**
 * Obtener todas las traducciones de una sección
 * @param language - Idioma actual
 * @param section - Sección (ej: 'header', 'hero', 'about')
 * @returns Objeto con todas las traducciones de la sección
 */
export const getSection = (language: Language, section: string): any => {
  return translations[language]?.[section as keyof typeof translations['ca']] || {};
};
