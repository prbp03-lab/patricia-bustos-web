import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/i18n';
import { Menu, X, Globe } from 'lucide-react';

export default function Header() {
  const { language, toggleLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const translations = t(language, 'header');

  const navItems = [
    { key: 'home', label: t(language, 'header.home'), href: '#home' },
    { key: 'about', label: t(language, 'header.about'), href: '#about' },
    { key: 'blog', label: t(language, 'header.blog'), href: '#blog' },
    { key: 'tools', label: t(language, 'header.tools'), href: '#tools' },
    { key: 'contact', label: t(language, 'header.contact'), href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#home" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg group-hover:shadow-lg transition-shadow">
                PB
              </div>
              <span className="hidden sm:inline font-bold text-primary text-lg">Patricia Bustos</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-foreground hover:text-accent transition-colors duration-200 hover:bg-accent/5 rounded-lg"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-lg hover:bg-accent/10 transition-colors duration-200 text-foreground hover:text-accent"
              title={language === 'ca' ? 'Cambiar a Español' : 'Canviar a Català'}
              aria-label="Toggle language"
            >
              <Globe className="w-5 h-5" />
              <span className="text-xs font-semibold ml-1">{language.toUpperCase()}</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-accent/10 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2 animate-fade-in-up">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="block px-4 py-2 text-sm font-medium text-foreground hover:text-accent hover:bg-accent/5 rounded-lg transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
