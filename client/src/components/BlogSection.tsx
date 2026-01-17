import { useLanguage } from '@/contexts/LanguageContext';
import { t, getSection } from '@/lib/i18n';
import { BookOpen, FileText, Calendar, Zap } from 'lucide-react';
import { useState } from 'react';

interface BlogPost {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  readTime: string;
  icon: React.ReactNode;
}

export default function BlogSection() {
  const { language } = useLanguage();
  const blog = getSection(language, 'blog');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { id: 'pgc', label: blog.categories?.pgc, icon: FileText, color: 'blue' },
    { id: 'verifactu', label: blog.categories?.verifactu, icon: Calendar, color: 'green' },
    { id: 'fiscal_calendar', label: blog.categories?.fiscal_calendar, icon: Calendar, color: 'amber' },
    { id: 'ia_automation', label: blog.categories?.ia_automation, icon: Zap, color: 'purple' },
  ];

  // Sample blog posts (placeholder)
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: language === 'ca' ? 'Introducció al PGC 2025' : 'Introducción al PGC 2025',
      category: 'pgc',
      excerpt: language === 'ca' 
        ? 'Descobreix les novetats del Pla General Comptable per a 2025 i com adaptar-te als canvis normatius.'
        : 'Descubre las novedades del Plan General Contable para 2025 y cómo adaptarte a los cambios normativos.',
      date: '2025-01-15',
      readTime: language === 'ca' ? '5 min' : '5 min',
      icon: <FileText className="w-6 h-6" />,
    },
    {
      id: '2',
      title: language === 'ca' ? 'Verifactu: Guia Completa' : 'Verifactu: Guía Completa',
      category: 'verifactu',
      excerpt: language === 'ca'
        ? 'Tot el que necessites saber sobre la facturació electrònica i els requisits de Verifactu.'
        : 'Todo lo que necesitas saber sobre la facturación electrónica y los requisitos de Verifactu.',
      date: '2025-01-10',
      readTime: language === 'ca' ? '8 min' : '8 min',
      icon: <Calendar className="w-6 h-6" />,
    },
    {
      id: '3',
      title: language === 'ca' ? 'Automatització amb ChatGPT' : 'Automatización con ChatGPT',
      category: 'ia_automation',
      excerpt: language === 'ca'
        ? 'Com utilitzar ChatGPT per automatitzar tasques comptables i estalviar temps.'
        : 'Cómo utilizar ChatGPT para automatizar tareas contables y ahorrar tiempo.',
      date: '2025-01-05',
      readTime: language === 'ca' ? '10 min' : '10 min',
      icon: <Zap className="w-6 h-6" />,
    },
  ];

  const filteredPosts = selectedCategory
    ? blogPosts.filter(post => post.category === selectedCategory)
    : blogPosts;

  return (
    <section id="blog" className="py-16 md:py-24 bg-secondary">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {blog.title}
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            {blog.subtitle}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-12 md:mb-16 justify-center">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
              selectedCategory === null
                ? 'bg-accent text-white'
                : 'bg-card text-foreground border border-border hover:border-accent'
            }`}
          >
            {language === 'ca' ? 'Tots' : 'Todos'}
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${
                selectedCategory === cat.id
                  ? 'bg-accent text-white'
                  : 'bg-card text-foreground border border-border hover:border-accent'
              }`}
            >
              <cat.icon className="w-4 h-4" />
              {cat.label}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredPosts.map((post) => {
            const category = categories.find(c => c.id === post.category);
            return (
              <article
                key={post.id}
                className="card-float p-6 md:p-8 flex flex-col hover:shadow-lg transition-all duration-300 group cursor-pointer"
              >
                {/* Icon & Category */}
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-all">
                    {post.icon}
                  </div>
                  <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                    {category?.label}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                  {post.title}
                </h3>
                <p className="text-foreground/70 mb-6 flex-grow">
                  {post.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-xs text-foreground/60">{post.date}</span>
                  <span className="text-xs font-semibold text-accent">{post.readTime}</span>
                </div>

                {/* Read More Link */}
                <a
                  href="#"
                  className="mt-4 inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all group/link"
                >
                  {blog.read_more}
                  <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                </a>
              </article>
            );
          })}
        </div>

        {/* Coming Soon Notice */}
        <div className="text-center p-8 md:p-12 rounded-2xl bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10">
          <BookOpen className="w-12 h-12 text-accent mx-auto mb-4" />
          <p className="text-lg font-semibold text-foreground mb-2">
            {blog.coming_soon}
          </p>
          <p className="text-foreground/70">
            {language === 'ca'
              ? 'Més articles sobre IA, contabilitat i automatització fiscal properament.'
              : 'Más artículos sobre IA, contabilidad y automatización fiscal próximamente.'
            }
          </p>
        </div>
      </div>
    </section>
  );
}
