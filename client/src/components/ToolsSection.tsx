import { useLanguage } from '@/contexts/LanguageContext';
import { t, getSection } from '@/lib/i18n';
import { Search, Gamepad2, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import PGCGame from './PGCGame';

export default function ToolsSection() {
  const { language } = useLanguage();
  const tools = getSection(language, 'tools');
  const [activeTab, setActiveTab] = useState<'pgc' | 'game' | 'alerts'>('pgc');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample PGC data
  const pgcData = [
    { code: '100', name: language === 'ca' ? 'Capital Social' : 'Capital Social', type: 'Patrimoni', group: '1' },
    { code: '101', name: language === 'ca' ? 'Fons de Comerç' : 'Fondo de Comercio', type: 'Patrimoni', group: '1' },
    { code: '200', name: language === 'ca' ? 'Béns Immobles' : 'Bienes Inmuebles', type: 'Actiu', group: '2' },
    { code: '210', name: language === 'ca' ? 'Maquinària' : 'Maquinaria', type: 'Actiu', group: '2' },
    { code: '300', name: language === 'ca' ? 'Matèries Primeres' : 'Materias Primas', type: 'Existències', group: '3' },
    { code: '400', name: language === 'ca' ? 'Clients' : 'Clientes', type: 'Deutors', group: '4' },
    { code: '500', name: language === 'ca' ? 'Efectiu' : 'Efectivo', type: 'Tresoreria', group: '5' },
    { code: '600', name: language === 'ca' ? 'Compres' : 'Compras', type: 'Despeses', group: '6' },
    { code: '700', name: language === 'ca' ? 'Vendes' : 'Ventas', type: 'Ingressos', group: '7' },
  ];

  const filteredPGC = pgcData.filter(item =>
    item.code.includes(searchQuery) || item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 md:mb-16">
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
                  'bg-amber-100 text-amber-600'
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
                        {tools.pgc_app?.type}
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-primary">
                        {tools.pgc_app?.group}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPGC.length > 0 ? (
                      filteredPGC.map((item, index) => (
                        <tr key={index} className="border-b border-border hover:bg-accent/5 transition-colors">
                          <td className="py-3 px-4 font-semibold text-accent">{item.code}</td>
                          <td className="py-3 px-4 text-foreground">{item.name}</td>
                          <td className="py-3 px-4 text-foreground/70">{item.type}</td>
                          <td className="py-3 px-4 text-foreground/70">{item.group}</td>
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
        </div>
      </div>
    </section>
  );
}
