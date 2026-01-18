import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/i18n';
import { Download } from 'lucide-react';

export default function HeroSection() {
  const { language } = useLanguage();
  const hero = t(language, 'hero');

  return (
    <section id="home" className="hero-section pt-20 pb-12 md:pb-20">
      {/* Background Image */}
      <div
        className="hero-bg"
        style={{
          backgroundImage: 'url(/images/hero-background.png)',
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/40 via-background/70 to-background" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8 animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 w-fit">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-sm font-medium text-accent">
                {language === 'ca' ? 'Especialista en IA Contable' : 'Especialista en IA Contable'}
              </span>
            </div>

            {/* Title */}
            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight">
                {t(language, 'hero.title')}
              </h1>
              <p className="text-xl md:text-2xl font-semibold text-accent">
                {t(language, 'hero.subtitle')}
              </p>
            </div>

            {/* Description */}
            <p className="text-lg text-foreground/80 leading-relaxed max-w-xl">
              {t(language, 'hero.description')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="/CVPatriciaBustosPaco.pdf"
                download="CVPatriciaBustosPaco.pdf"
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                {language === 'ca' ? 'Descarregar CV' : 'Descargar CV'}
              </a>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-8 border-t border-border">
              <div>
                <p className="text-2xl md:text-3xl font-bold text-primary">15+</p>
                <p className="text-sm text-foreground/60">
                  {language === 'ca' ? 'Anys d\'experiència' : 'Años de experiencia'}
                </p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-accent">4</p>
                <p className="text-sm text-foreground/60">
                  {language === 'ca' ? 'Sistemes ERP' : 'Sistemas ERP'}
                </p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-primary">100%</p>
                <p className="text-sm text-foreground/60">
                  {language === 'ca' ? 'Compromís' : 'Compromiso'}
                </p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="hidden md:flex items-center justify-center animate-slide-in-right">
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
              {/* Decorative Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-3xl blur-2xl" />

              {/* Image Container */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-accent/30 shadow-2xl">
                <img
                  src="https://imgur.com/wYSV3zS.jpg"
                  alt="Patricia Bustos Paco"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-card border-2 border-accent rounded-2xl p-4 shadow-xl">
                <p className="text-sm font-semibold text-primary">
                  {language === 'ca' ? 'IA + Comptabilitat' : 'IA + Contabilidad'}
                </p>
                <p className="text-xs text-foreground/60">
                  {language === 'ca' ? 'Transformant la gestió' : 'Transformando la gestión'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-accent rounded-full flex items-center justify-center">
          <div className="w-1 h-2 bg-accent rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
