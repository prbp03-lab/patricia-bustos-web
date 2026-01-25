import { useLanguage } from '@/contexts/LanguageContext';
import { t, getSection } from '@/lib/i18n';
import { BookOpen, FileText, Calendar, Zap } from 'lucide-react';
import { useState } from 'react';

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

  // Función para obtener icono según categoría
  function getIconForCategory(category: string): React.ReactNode {
    const categoryMap: { [key: string]: React.ReactNode } = {
      'Tecnología': <Zap className="w-6 h-6" />,
      'Fiscalidad': <Calendar className="w-6 h-6" />,
      'PGC': <FileText className="w-6 h-6" />,
    };
    return categoryMap[category] || <BookOpen className="w-6 h-6" />;
  }

  // Artículos estáticos
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: language === 'ca' ? 'ChatGPT 5 i la Comptabilitat Espanyola' : 'ChatGPT 5 y la Contabilidad Española',
      category: 'Tecnología',
      content: language === 'ca' ? 'Explorant com la IA transformarà la gestió comptable...' : 'Explorando cómo la IA transformará la gestión contable...',
      date: '2026-01-15',
      readTime: '5 min',
      excerpt: language === 'ca' ? 'Descobreix l\'impacte de ChatGPT 5 en la comptabilitat moderna' : 'Descubre el impacto de ChatGPT 5 en la contabilidad moderna',
      published: true,
      featured: true,
      icon: getIconForCategory('Tecnología'),
    },
    {
      id: '2',
      title: language === 'ca' ? 'El final de l\'OCR i la IA Predictiva en 2026' : 'El fin del OCR y la IA Predictiva en 2026',
      category: 'Tecnología',
      content: language === 'ca' ? 'Com la IA predictiva està reemplaçant les tecnologies tradicionals...' : 'Cómo la IA predictiva está reemplazando las tecnologías tradicionales...',
      date: '2026-01-10',
      readTime: '7 min',
      excerpt: language === 'ca' ? 'Els nous sistemes de IA predictiva revolucionen l\'automatització' : 'Los nuevos sistemas de IA predictiva revolucionan la automatización',
      published: true,
      icon: getIconForCategory('Tecnología'),
    },
    {
      id: '3',
      title: language === 'ca' ? 'ERPs vs Excel en 2026' : 'ERPs vs Excel en 2026',
      category: 'Fiscalidad',
      content: language === 'ca' ? 'Per què els ERPs segueixen sent essencials per a les empreses...' : 'Por qué los ERPs siguen siendo esenciales para las empresas...',
      date: '2026-01-05',
      readTime: '6 min',
      excerpt: language === 'ca' ? 'Comparativa entre sistemes ERP i fulls de càlcul tradicionals' : 'Comparativa entre sistemas ERP y hojas de cálculo tradicionales',
      published: true,
      icon: getIconForCategory('Fiscalidad'),
    },
  ];

  const categories = [
    { id: 'Tecnología', label: 'Tecnología', icon: Zap, color: 'purple' },
    { id: 'Fiscalidad', label: 'Fiscalidad', icon: Calendar, color: 'amber' },
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
      </div>
    </section>
  );
}
