import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import ErrorBoundary from "./components/ErrorBoundary";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import SkillsBento from "./components/SkillsBento";
import AboutSection from "./components/AboutSection";
import BlogSection from "./components/BlogSection";
import ToolsSection from "./components/ToolsSection";
import Footer from "./components/Footer";

/**
 * Aplicación Principal - Patricia Bustos Paco
 * Plataforma bilingüe (Catalán/Castellano) para marca personal, blog de IA contable y herramientas fiscales
 * 
 * Diseño: Profesional Contemporáneo con Carácter Técnico
 * - Colores: Azul Profesional (#0f172a) + Verde Esmeralda (#10b981)
 * - Tipografía: Poppins (títulos) + Inter (cuerpo) + Fira Code (técnico)
 * - Responsive: Mobile-first con breakpoints Tailwind (sm, md, lg, xl)
 */

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <div className="min-h-screen bg-background text-foreground">
            {/* Header con navegación responsiva y toggle de idioma */}
            <Header />

            {/* Secciones Principales */}
            <main>
              {/* Hero Section - Presentación inicial */}
              <HeroSection />

              {/* Skills Bento Grid - Habilidades técnicas */}
              <SkillsBento />

              {/* About Section - Experiencia, formación e idiomas */}
              <AboutSection />

              {/* Blog Section - Artículos sobre IA y contabilidad */}
              <BlogSection />

              {/* Tools Section - Herramientas fiscales interactivas */}
              <ToolsSection />
            </main>

            {/* Footer con contacto e información */}
            <Footer />
          </div>
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
