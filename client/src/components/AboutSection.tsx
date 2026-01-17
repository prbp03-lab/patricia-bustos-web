import { useLanguage } from '@/contexts/LanguageContext';
import { t, getSection } from '@/lib/i18n';
import { Briefcase, BookOpen, Globe } from 'lucide-react';
import { useState } from 'react';

export default function AboutSection() {
  const { language } = useLanguage();
  const about = getSection(language, 'about');
  const [activeTab, setActiveTab] = useState<'experience' | 'education' | 'languages'>('experience');

  const tabs = [
    { id: 'experience', label: language === 'ca' ? 'Experiència' : 'Experiencia', icon: Briefcase },
    { id: 'education', label: language === 'ca' ? 'Formació' : 'Formación', icon: BookOpen },
    { id: 'languages', label: language === 'ca' ? 'Idiomes' : 'Idiomas', icon: Globe },
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {about.title}
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            {about.intro}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 md:gap-4 mb-8 md:mb-12 border-b border-border overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id as any;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 md:px-6 py-3 font-semibold transition-all duration-200 border-b-2 whitespace-nowrap ${
                  isActive
                    ? 'border-accent text-accent'
                    : 'border-transparent text-foreground/60 hover:text-foreground'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="animate-fade-in-up">
          {/* Experience Tab */}
          {activeTab === 'experience' && (
            <div className="space-y-6">
              {about.experience_items?.map((item: any, index: number) => (
                <div
                  key={index}
                  className="card-float p-6 md:p-8 border-l-4 border-accent hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-primary">{item.company}</h3>
                      <p className="text-accent font-semibold">{item.role}</p>
                    </div>
                    <span className="inline-flex px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-semibold w-fit">
                      {item.year}
                    </span>
                  </div>
                  <p className="text-foreground/70">{item.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Education Tab */}
          {activeTab === 'education' && (
            <div className="space-y-6">
              {about.education?.map((item: any, index: number) => (
                <div
                  key={index}
                  className="card-float p-6 md:p-8 border-l-4 border-primary hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-primary">{item.title}</h3>
                      <p className="text-foreground/70 text-sm">{item.institution}</p>
                    </div>
                    <span className="inline-flex px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold w-fit">
                      {item.year}
                    </span>
                  </div>
                  {item.hours && (
                    <p className="text-sm text-accent font-medium">{item.hours}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Languages Tab */}
          {activeTab === 'languages' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {about.languages?.map((item: any, index: number) => (
                <div
                  key={index}
                  className="card-float p-6 text-center hover:shadow-lg transition-all duration-300 border-t-4 border-accent"
                >
                  <h3 className="text-lg font-bold text-primary mb-2">{item.language}</h3>
                  <p className="text-accent font-semibold">{item.level}</p>
                </div>
              ))}

              {/* Certifications */}
              <div className="md:col-span-3 mt-6 card-float p-6 md:p-8 bg-gradient-to-r from-accent/5 to-primary/5 border-l-4 border-accent">
                <h3 className="text-lg font-bold text-primary mb-4">
                  {about.certifications_title}
                </h3>
                <ul className="space-y-2">
                  {about.certifications?.map((cert: string, index: number) => (
                    <li key={index} className="flex items-center gap-3 text-foreground/70">
                      <span className="w-2 h-2 rounded-full bg-accent" />
                      {cert}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
