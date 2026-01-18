# Ideas de Diseño - Patricia Bustos Paco

## Enfoque Seleccionado: Profesional Contemporáneo con Carácter Técnico

### Filosofía de Diseño
**Movimiento de Diseño:** Minimalismo Corporativo + Modernismo Técnico  
**Concepto Central:** Una plataforma que equilibra la sofisticación profesional con la accesibilidad técnica, transmitiendo confianza, expertise y innovación.

### Principios Fundamentales
1. **Claridad Jerárquica:** Información organizada con precisión, sin ruido visual. Cada elemento tiene propósito.
2. **Elegancia Técnica:** Uso estratégico de espacios en blanco, tipografía de contraste y acentos de color que evocan tecnología y precisión.
3. **Humanidad Corporativa:** Aunque técnico, el diseño mantiene calidez mediante fotografía auténtica y microinteracciones sutiles.
4. **Accesibilidad Cognitiva:** Estructura clara que permite a usuarios técnicos y no técnicos navegar sin fricción.

### Filosofía de Color
- **Primario:** Azul Profesional (#0f172a / Slate-900) - Confianza, profesionalismo, estabilidad
- **Acento:** Verde Esmeralda (#10b981) - Crecimiento, innovación, energía positiva
- **Neutros:** Grises cálidos (Slate-50, Slate-100, Slate-200) - Sofisticación sin frialdad
- **Propósito Emocional:** El azul establece autoridad; el verde humaniza y señala acciones/innovación

### Paradigma de Layout
- **Hero Asimétrico:** Imagen de perfil con biografía a la izquierda; contenido técnico destacado a la derecha
- **Secciones Alternas:** Contenido y visualización intercalados (texto-imagen-texto-imagen) para ritmo visual
- **Bento Grid Adaptativo:** Para habilidades técnicas (SAGE, SAP, ChatGPT, Dynamics 365) - 2x2 en desktop, 1x4 en móvil
- **Tarjetas Flotantes:** Componentes con sombras sutiles y bordes redondeados que crean profundidad

### Elementos Distintivos
1. **Líneas Divisoras Orgánicas:** SVG dividers con curvas suaves entre secciones (no líneas rectas)
2. **Badges de Expertise:** Etiquetas con icono + texto para tecnologías (SAGE, SAP, etc.)
3. **Indicadores de Progreso Visual:** Para el blog (artículos por categoría) y herramientas (estado de alertas fiscales)

### Filosofía de Interacción
- **Transiciones Suaves:** Todas las interacciones (hover, click) tienen animaciones de 200-300ms
- **Feedback Inmediato:** Botones cambian color/escala al interactuar; formularios validan en tiempo real
- **Navegación Intuitiva:** El toggle de idioma está siempre visible; menú hamburguesa en móvil con transición suave

### Animaciones
- **Entrada de Página:** Fade-in + slide-up para secciones (staggered, 100ms entre elementos)
- **Hover en Tarjetas:** Scale(1.02) + shadow increase
- **Toggle de Idioma:** Rotación suave (180°) del icono + fade del texto
- **Scroll Animations:** Parallax suave en hero; fade-in de elementos al entrar en viewport
- **Carga de Datos:** Skeleton loaders con gradiente animado

### Sistema Tipográfico
- **Display/Títulos:** Poppins Bold (700) - Moderno, geométrico, legible
- **Subtítulos:** Poppins SemiBold (600) - Jerarquía clara
- **Body/Párrafos:** Inter Regular (400) - Legible, neutral, profesional
- **Énfasis:** Inter SemiBold (600) - Para destacar dentro de párrafos
- **Código/Técnico:** Fira Code - Monoespaciado para términos contables (PGC, SAP, etc.)

### Paleta de Colores Completa
| Uso | Color | Hex | OKLCH |
|-----|-------|-----|-------|
| Fondo Principal | Slate-50 | #f8fafc | oklch(0.98 0.001 286) |
| Fondo Secundario | Slate-100 | #f1f5f9 | oklch(0.96 0.001 286) |
| Borde | Slate-200 | #e2e8f0 | oklch(0.92 0.004 286) |
| Texto Principal | Slate-900 | #0f172a | oklch(0.14 0.005 286) |
| Texto Secundario | Slate-600 | #475569 | oklch(0.55 0.016 286) |
| Primario (Botones) | Azul-700 | #0f172a | oklch(0.14 0.005 286) |
| Acento (Highlights) | Verde-500 | #10b981 | oklch(0.65 0.15 150) |
| Éxito | Verde-600 | #059669 | oklch(0.60 0.15 150) |
| Advertencia | Ámbar-500 | #f59e0b | oklch(0.68 0.15 50) |
| Error | Rojo-600 | #dc2626 | oklch(0.55 0.20 25) |

---

## Alternativa 1: Diseño Audaz y Moderno (Probabilidad: 0.08)

**Movimiento:** Neomorfismo + Gradientes Atrevidos  
**Concepto:** Plataforma vibrante y energética que rompe con lo corporativo tradicional.

### Características Clave
- Gradientes audaces (Azul → Púrpura → Verde)
- Formas geométricas complejas (hexágonos, triángulos)
- Tipografía Display muy grande (Montserrat Black)
- Animaciones complejas y efectos 3D
- Colores saturados y contrastantes

### Por Qué No Fue Seleccionado
Aunque visualmente impactante, podría distraer del contenido técnico y restar credibilidad en un contexto contable/fiscal donde la profesionalidad es crítica.

---

## Alternativa 2: Minimalismo Extremo (Probabilidad: 0.07)

**Movimiento:** Diseño Suizo + Brutalism Digital  
**Concepto:** Máxima claridad, tipografía grande, ausencia de decoración.

### Características Clave
- Blanco y negro predominante
- Tipografía sans-serif en tamaños muy grandes
- Grillas estrictas (12-column)
- Mínimas imágenes; enfoque en texto
- Bordes duros, sin redondeado

### Por Qué No Fue Seleccionado
Aunque elegante, podría resultar demasiado frío y poco accesible para usuarios no técnicos. Falta de humanidad visual.

---

## Notas de Implementación

### Breakpoints Tailwind
- `sm`: 640px (móvil grande)
- `md`: 768px (tablet)
- `lg`: 1024px (desktop)
- `xl`: 1280px (desktop grande)
- `2xl`: 1536px (ultrawide)

### Componentes Clave a Desarrollar
1. **Header Responsivo:** Logo + Nav + Toggle Idioma + Hamburger Menu
2. **Hero Section:** Imagen de perfil + Biografía + CTA
3. **Bento Grid:** Habilidades técnicas (SAGE, SAP, ChatGPT, Dynamics 365)
4. **Blog Section:** Filtros por categoría (PGC, Verifactu, Calendario Fiscal)
5. **App PGC:** Buscador filtrable con base de datos de cuentas
6. **Juego del PGC:** Quiz o Drag & Drop interactivo
7. **Footer:** Enlaces, contacto, redes sociales

### Tipografía - Google Fonts
```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet" />
```

### Variables CSS Personalizadas
```css
--primary-blue: #0f172a;
--accent-green: #10b981;
--text-primary: #0f172a;
--text-secondary: #475569;
--bg-light: #f8fafc;
--border-color: #e2e8f0;
```
