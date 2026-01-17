# Patricia Bustos Paco - IA Contable & Fiscal Hub

Plataforma web bilingüe (Catalán/Castellano) que funciona como marca personal, blog de IA en contabilidad y hub de herramientas fiscales.

## 🎯 Características Principales

### 1. **Marca Personal**
- Hero section con presentación profesional
- Sección "Sobre mí" con experiencia, formación e idiomas
- Navegación responsiva con hamburger menu en móvil
- Diseño elegante y moderno

### 2. **Sistema Bilingüe (i18n)**
- Soporte completo para Catalán (ca) y Castellano (es)
- Toggle de idioma en el header sin recargar página
- Persistencia de preferencia de idioma en localStorage
- Detección automática del idioma del navegador

### 3. **Blog de IA Contable**
- Secciones por categorías: PGC, Verifactu, Calendario Fiscal, Automatización con IA
- Filtrado de artículos por categoría
- Diseño de tarjetas con metadatos (fecha, tiempo de lectura)
- Placeholder para contenido futuro

### 4. **Herramientas Fiscales Interactivas**

#### Buscador PGC
- Base de datos de cuentas del Plan General Contable
- Búsqueda por código o nombre
- Tabla responsiva con información completa
- Filtrado en tiempo real

#### El Juego del PGC
- Quiz interactivo con 5 preguntas sobre contabilidad
- Sistema de puntuación
- Explicaciones detalladas de respuestas correctas/incorrectas
- Interfaz gamificada con indicador de progreso
- Bilingüe (Catalán/Castellano)

#### Alertas Fiscales
- Calendario de vencimientos fiscales
- Obligaciones de Hacienda por mes
- Información sobre IVA, retenciones, etc.

### 5. **Habilidades Técnicas (Bento Grid)**
- SAGE 200 (ERP)
- SAP (ERP)
- ChatGPT & Prompt Engineering (IA)
- Dynamics 365 (ERP)
- Diseño visual atractivo con iconos y colores

## 🎨 Diseño

### Filosofía: Profesional Contemporáneo con Carácter Técnico
- **Colores Primarios:**
  - Azul Profesional: #0f172a (confianza, autoridad)
  - Verde Esmeralda: #10b981 (innovación, crecimiento)
  - Grises Cálidos: Slate (sofisticación)

- **Tipografía:**
  - **Títulos:** Poppins Bold (700) - Moderno y geométrico
  - **Cuerpo:** Inter Regular (400) - Legible y profesional
  - **Técnico:** Fira Code - Para términos contables

- **Componentes:**
  - Líneas divisoras orgánicas (SVG curves)
  - Badges de expertise
  - Bento Grid adaptativo
  - Animaciones suaves (200-300ms)
  - Parallax en hero section

## 📱 Responsive Design

- **Mobile (xs, sm):** 320px - 640px
  - Hamburger menu
  - Stack vertical
  - Optimizado para touch

- **Tablet (md):** 768px - 1024px
  - Navegación horizontal
  - Grid 2 columnas
  - Espaciado equilibrado

- **Desktop (lg, xl, 2xl):** 1024px+
  - Navegación completa
  - Grid 4 columnas
  - Máximo ancho 1280px

## 🛠️ Tech Stack

- **Frontend Framework:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4 + shadcn/ui
- **Routing:** Wouter
- **Icons:** Lucide React
- **Internationalization:** Sistema i18n personalizado
- **Build Tool:** Vite

## 📁 Estructura del Proyecto

```
patricia-bustos-web/
├── client/
│   ├── public/
│   │   └── images/
│   │       ├── hero-background.png
│   │       └── profile-accent.png
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── SkillsBento.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── BlogSection.tsx
│   │   │   ├── ToolsSection.tsx
│   │   │   ├── PGCGame.tsx
│   │   │   ├── OrganicDivider.tsx
│   │   │   └── ui/ (shadcn/ui components)
│   │   ├── contexts/
│   │   │   ├── ThemeContext.tsx
│   │   │   └── LanguageContext.tsx
│   │   ├── lib/
│   │   │   └── i18n.ts (Sistema de traducciones)
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css (Estilos globales)
│   └── index.html
├── tailwind.config.ts
├── vite.config.ts
└── package.json
```

## 🚀 Desarrollo

### Instalación
```bash
cd patricia-bustos-web
pnpm install
```

### Servidor de Desarrollo
```bash
pnpm dev
```
El servidor estará disponible en `http://localhost:3000` (o el siguiente puerto disponible)

### Build para Producción
```bash
pnpm build
```

### Preview de Producción
```bash
pnpm preview
```

## 🌐 Idiomas Soportados

- **Catalán (ca):** Interfaz completa en catalán
- **Castellano (es):** Interfaz completa en español

El usuario puede cambiar el idioma mediante el toggle en el header. La preferencia se guarda en localStorage.

## 📊 Secciones de la Web

1. **Header:** Navegación principal + toggle de idioma
2. **Hero:** Presentación con imagen de perfil y CTA
3. **Skills Bento:** Habilidades técnicas en grid 4 columnas
4. **About:** Experiencia, formación, idiomas (tabs interactivos)
5. **Blog:** Artículos sobre IA y contabilidad (filtrable)
6. **Tools:** Herramientas fiscales interactivas
7. **Footer:** Contacto, enlaces rápidos, redes sociales

## 🎮 Interactividad

- **Navegación:** Smooth scroll a secciones
- **Idioma:** Toggle sin recargar página
- **Blog:** Filtrado de artículos por categoría
- **Juego PGC:** Quiz interactivo con puntuación
- **Buscador PGC:** Búsqueda en tiempo real
- **Animaciones:** Fade-in, slide-in, scale-in al cargar

## ♿ Accesibilidad

- Contraste de colores WCAG AA
- Navegación por teclado
- Labels en formularios
- Alt text en imágenes
- Estructura semántica HTML

## 📈 Optimizaciones

- Imágenes optimizadas en `/public/images/`
- CSS purificado (solo clases usadas)
- Lazy loading de componentes
- Caching de assets con hash de contenido
- Tipografía de Google Fonts

## 🔄 Actualizaciones Futuras

- [ ] Integrar blog real con CMS
- [ ] Expandir base de datos del PGC
- [ ] Más preguntas para el Juego del PGC
- [ ] Suscripción a newsletter
- [ ] Formulario de contacto funcional
- [ ] Analytics avanzado
- [ ] Dark mode toggle

## 📝 Notas de Diseño

- El diseño sigue la filosofía "Profesional Contemporáneo con Carácter Técnico"
- Se evitan patrones genéricos (purple gradients, Inter uniform, centered layouts)
- Uso estratégico de espacios en blanco y tipografía de contraste
- Animaciones sutiles para mejorar UX sin distraer
- Líneas divisoras orgánicas para ritmo visual

## 👤 Autor

Patricia Bustos Paco  
Administrativa Contable & Especialista en IA  
📧 prpb03@gmail.com  
📱 678839750  
📍 Granollers, 08402

---

**Última actualización:** Enero 2025  
**Versión:** 1.0.0
