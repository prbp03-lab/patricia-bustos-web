import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/i18n';
import { Zap, Database, Brain, Settings } from 'lucide-react';

interface SkillItem {
  icon: React.ReactNode;
  name: string;
  category: string;
  description: string;
  color: 'blue' | 'green' | 'purple' | 'amber';
}

export default function SkillsBento() {
  const { language } = useLanguage();

  const skills: SkillItem[] = [
    {
      icon: <Database className="w-8 h-8" />,
      name: 'SAGE 200',
      category: language === 'ca' ? 'ERP' : 'ERP',
      description: language === 'ca' ? 'Gestió comptable i fiscal' : 'Gestión contable y fiscal',
      color: 'blue',
    },
    {
      icon: <Settings className="w-8 h-8" />,
      name: 'SAP',
      category: language === 'ca' ? 'ERP' : 'ERP',
      description: language === 'ca' ? 'Sistemes empresarials' : 'Sistemas empresariales',
      color: 'green',
    },
    {
      icon: <Brain className="w-8 h-8" />,
      name: 'ChatGPT & IA',
      category: language === 'ca' ? 'Automatització' : 'Automatización',
      description: language === 'ca' ? 'Prompt Engineering' : 'Prompt Engineering',
      color: 'purple',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      name: 'Dynamics 365',
      category: language === 'ca' ? 'ERP' : 'ERP',
      description: language === 'ca' ? 'Solucions Microsoft' : 'Soluciones Microsoft',
      color: 'amber',
    },
  ];

  const colorClasses = {
    blue: 'from-blue-500/10 to-blue-600/10 border-blue-200 hover:border-blue-400 text-blue-700',
    green: 'from-green-500/10 to-green-600/10 border-green-200 hover:border-green-400 text-green-700',
    purple: 'from-purple-500/10 to-purple-600/10 border-purple-200 hover:border-purple-400 text-purple-700',
    amber: 'from-amber-500/10 to-amber-600/10 border-amber-200 hover:border-amber-400 text-amber-700',
  };

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {language === 'ca' ? 'Habilitats Tècniques' : 'Habilidades Técnicas'}
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            {language === 'ca' 
              ? 'Especialitzada en sistemes ERP, comptabilitat i automatització amb IA'
              : 'Especializada en sistemas ERP, contabilidad y automatización con IA'
            }
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              className={`card-float p-6 flex flex-col items-center text-center space-y-4 bg-gradient-to-br ${colorClasses[skill.color]} border-2 transition-all duration-300 hover:shadow-lg hover:scale-105 group`}
            >
              {/* Icon */}
              <div className={`p-3 rounded-lg bg-gradient-to-br ${colorClasses[skill.color]} group-hover:scale-110 transition-transform`}>
                {skill.icon}
              </div>

              {/* Content */}
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-primary">{skill.name}</h3>
                <p className="text-xs font-semibold text-accent uppercase tracking-wider">
                  {skill.category}
                </p>
                <p className="text-sm text-foreground/70">{skill.description}</p>
              </div>

              {/* Accent Line */}
              <div className="w-8 h-1 bg-accent rounded-full group-hover:w-12 transition-all" />
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 md:mt-16 p-6 md:p-8 rounded-2xl bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10">
          <h3 className="text-xl font-bold text-primary mb-4">
            {language === 'ca' ? 'Més Competències' : 'Más Competencias'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="font-semibold text-foreground">
                {language === 'ca' ? 'Comptable' : 'Contable'}
              </p>
              <ul className="text-sm text-foreground/70 space-y-1">
                <li>• {language === 'ca' ? 'Comptabilitat General' : 'Contabilidad General'}</li>
                <li>• {language === 'ca' ? 'Gestió Fiscal' : 'Gestión Fiscal'}</li>
                <li>• {language === 'ca' ? 'Nòmines' : 'Nóminas'}</li>
              </ul>
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-foreground">
                {language === 'ca' ? 'Administrativa' : 'Administrativa'}
              </p>
              <ul className="text-sm text-foreground/70 space-y-1">
                <li>• {language === 'ca' ? 'Gestió Documental' : 'Gestión Documental'}</li>
                <li>• {language === 'ca' ? 'Atenció al Client' : 'Atención al Cliente'}</li>
                <li>• {language === 'ca' ? 'Coordinació de Tasques' : 'Coordinación de Tareas'}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
