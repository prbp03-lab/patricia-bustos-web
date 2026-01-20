import { useLanguage } from '@/contexts/LanguageContext';
import { t, getSection } from '@/lib/i18n';
import { BookOpen, FileText, Calendar, Zap } from 'lucide-react';
import { useState } from 'react';
import { trpc } from '@/lib/trpc';

interface BlogPost {
  id: string;
  title: string;
  category: string;
  content: string;
  date: string;
  readTime: string;
  excerpt: string;
  published: boolean;
  featured?: boolean;
  icon: React.ReactNode;
}

export default function BlogSection() {
  const { language } = useLanguage();
  const blog = getSection(language, 'blog');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Cargar artículos desde tRPC (que obtiene de Notion en el servidor)
  const { data: articles = [], isLoading: loading } = trpc.blog.articles.useQuery();

  const blogPosts: BlogPost[] = articles.map(article => ({
    ...article,
    readTime: `${article.readTime} min`,
    icon: getIconForCategory(article.category),
  }));

  const categories = [
    { id: 'PGC', label: blog.categories?.pgc, icon: FileText, color: 'blue' },
    { id: 'Verifactu', label: blog.categories?.verifactu, icon: Calendar, color: 'green' },
    { id: 'Fiscal', label: blog.categories?.fiscal_calendar, icon: Calendar, color: 'amber' },
    { id: 'IA', label: blog.categories?.ia_automation, icon: Zap, color: 'purple' },
  ];

  // Función para obtener icono según categoría
  function getIconForCategory(category: string): React.ReactNode {
    const categoryMap: { [key: string]: React.ReactNode } = {
      'PGC': <FileText className="w-6 h-6" />,
      'Verifactu': <Calendar className="w-6 h-6" />,
      'Fiscal': <Calendar className="w-6 h-6" />,
      'IA': <Zap className="w-6 h-6" />,
      'Tecnología': <Zap className="w-6 h-6" />,
      'Fiscalidad': <Calendar className="w-6 h-6" />,
    };
    return categoryMap[category] || <BookOpen className="w-6 h-6" />;
  }

  // Fallback: artículos de ejemplo si Notion no está disponible
  const fallbackPosts: BlogPost[] = [
    {
      id: '1',
      title: language === 'ca' ? 'Introducció al PGC 2025' : 'Introducción al PGC 2025',
      category: 'PGC',
      excerpt: language === 'ca' 
        ? 'Descobreix les novetats del Pla General Comptable per a 2025 i com adaptar-te als canvis normatius.'
        : 'Descubre las novedades del Plan General Contable para 2025 y cómo adaptarte a los cambios normativos.',
      date: '2025-01-15',
      readTime: '5 min',
      icon: <FileText className="w-6 h-6" />,
      published: true,
      content: '',
    },
    {
      id: '2',
      title: language === 'ca' ? 'Verifactu: Guia Completa' : 'Verifactu: Guía Completa',
      category: 'Verifactu',
      excerpt: language === 'ca'
        ? 'Tot el que necessites saber sobre la facturació electrònica i els requisits de Verifactu.'
        : 'Todo lo que necesitas saber sobre la facturación electrónica y los requisitos de Verifactu.',
      date: '2025-01-10',
      readTime: '8 min',
      icon: <Calendar className="w-6 h-6" />,
      published: true,
      content: '',
    },
    {
      id: '3',
      title: language === 'ca' ? 'Automatització amb ChatGPT' : 'Automatización con ChatGPT',
      category: 'IA',
      excerpt: language === 'ca'
        ? 'Com utilitzar ChatGPT per automatitzar tasques comptables i estalviar temps.'
        : 'Cómo utilizar ChatGPT para automatizar tareas contables y ahorrar tiempo.',
      date: '2025-01-05',
      readTime: '10 min',
      icon: <Zap className="w-6 h-6" />,
      published: true,
      content: '',
    },
  ];

  const displayPosts = blogPosts.length > 0 ? blogPosts : fallbackPosts;

  const filteredPosts = selectedCategory
    ? displayPosts.filter(post => post.category === selectedCategory)
    : displayPosts;

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

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
            </div>
            <p className="mt-4 text-foreground/70">
              {language === 'ca' ? 'Carregant articles...' : 'Cargando artículos...'}
            </p>
          </div>
        )}

        {/* Blog Posts Grid */}
        {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredPosts.length > 0 ? filteredPosts.map((post) => {
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
          }) : (
            <div className="col-span-full text-center py-12">
              <p className="text-foreground/70">
                {language === 'ca' ? 'No hi ha articles disponibles.' : 'No hay artículos disponibles.'}
              </p>
            </div>
          )}
        </div>
        )}

        {/* Notion Info */}
        {!loading && blogPosts.length === 0 && (
          <div className="text-center p-8 md:p-12 rounded-2xl bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10">
            <BookOpen className="w-12 h-12 text-accent mx-auto mb-4" />
            <p className="text-lg font-semibold text-foreground mb-2">
              {language === 'ca' ? 'Gestiona el blog desde Notion' : 'Gestiona el blog desde Notion'}
            </p>
            <p className="text-foreground/70">
              {language === 'ca'
                ? 'Añade artículos a tu base de datos de Notion y aparecerán aquí automáticamente.'
                : 'Añade artículos a tu base de datos de Notion y aparecerán aquí automáticamente.'
              }
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
