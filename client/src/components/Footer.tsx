import { useLanguage } from '@/contexts/LanguageContext';
import { t, getSection } from '@/lib/i18n';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';

export default function Footer() {
  const { language } = useLanguage();
  const footer = getSection(language, 'footer');

  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/in/patricia-bustos-paco/', label: 'LinkedIn' },
  ];

  return (
    <footer id="contact" className="bg-primary text-white py-12 md:py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold">{footer.contact_title}</h3>
            
            <div className="space-y-4">
              <a
                href={`mailto:${footer.email}`}
                className="flex items-center gap-3 hover:text-accent transition-colors group"
              >
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>{footer.email}</span>
              </a>
              
              <a
                href={`tel:${footer.phone}`}
                className="flex items-center gap-3 hover:text-accent transition-colors group"
              >
                <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>{footer.phone}</span>
              </a>
              
              <div className="flex items-center gap-3 text-white/80">
                <MapPin className="w-5 h-5" />
                <span>{footer.location}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold">
              {language === 'ca' ? 'Enllaços Ràpids' : 'Enlaces Rápidos'}
            </h3>
            
            <ul className="space-y-2">
              <li>
                <a href="#home" className="hover:text-accent transition-colors">
                  {t(language, 'header.home')}
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-accent transition-colors">
                  {t(language, 'header.about')}
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:text-accent transition-colors">
                  {t(language, 'header.blog')}
                </a>
              </li>
              <li>
                <a href="#tools" className="hover:text-accent transition-colors">
                  {t(language, 'header.tools')}
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold">{footer.follow}</h3>
            
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="p-3 rounded-lg bg-white/10 hover:bg-accent text-white transition-all duration-200 group"
                    title={social.label}
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                );
              })}
            </div>

            {/* Newsletter Signup */}
            <div className="space-y-3">
              <p className="text-sm text-white/80">
                {language === 'ca'
                  ? 'Subscriu-te per a actualitzacions'
                  : 'Suscríbete para actualizaciones'
                }
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder={language === 'ca' ? 'El teu email' : 'Tu email'}
                  className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-accent transition-colors"
                />
                <button className="px-4 py-2 rounded-lg bg-accent text-primary font-semibold hover:bg-accent/90 transition-colors">
                  {language === 'ca' ? 'OK' : 'OK'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          {/* Bottom Info */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/70">
            <p>{footer.rights}</p>
            
            <div className="flex gap-6">
              <a href="#" className="hover:text-accent transition-colors">
                {language === 'ca' ? 'Privacitat' : 'Privacidad'}
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                {language === 'ca' ? 'Condicions' : 'Términos'}
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                {language === 'ca' ? 'Cookies' : 'Cookies'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
