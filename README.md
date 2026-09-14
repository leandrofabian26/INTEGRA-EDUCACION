# INTEGRA

Plataforma de formación en tecnología para docentes de 55 a 65 años de la vereda Agua bonita, San José del Guaviare. Hace parte del proyecto de grado *Brecha generacional en el aula rural: INTEGRA y la inclusión digital de docentes en Agua bonita, Guaviare* (Maestría en Educación, Corporación Universitaria Iberoamericana).

## Principios de diseño

- **Pensada para docentes de 55 a 65 años.** Letra grande (base 20 px en escritorio, 18 px en móvil), fuente Atkinson Hyperlegible, alto contraste (WCAG AA en todo el texto), botones de mínimo 52 px de alto con borde visible, icono + texto siempre, y control **A− / A+** para agrandar toda la interfaz.
- **Una sola cosa importante por pantalla.** Inicio abre con "Continuar donde quedé". El menú tiene cinco entradas: Inicio, Mis módulos, Foro, Mi avance, Ayuda.
- **Lenguaje claro.** "Entrar" en vez de "Iniciar sesión"; errores en frases completas que dicen qué hacer.
- **Sin dependencias de internet en la interfaz.** Fuentes autoalojadas, sin imágenes externas. (El modo sin conexión completo —PWA y guardado local— llega en la Entrega 2.)
- **Nada que distraiga.** Sin modo oscuro, sin animaciones decorativas, sin imágenes de relleno.

## Paleta

| Uso | Color |
|---|---|
| Fondo (papel) | `#FFFDF7` |
| Texto (tinta) | `#1A1A1A` |
| Primario (río): botones, enlaces, módulo activo | `#1D4E89` |
| Completado (selva) | `#2E6B3A` |
| En curso / avisos (ámbar) | `#8A5200` |
| Bordes y paneles (arena) | `#E6DFCE` |

Los estados nunca se comunican solo con color: siempre llevan icono y texto.

## Estructura

```
src/
  content/modulos.ts        Módulos iniciales (se reemplazan con los del ciclo 1)
  components/layout/        Navegación, cabecera, control de letra
  components/               Estado de módulo, barra de avance
  pages/                    Welcome, Login, Register, Dashboard (Inicio), Modulos,
                            ModuloDetalle, Forum, Avance, Ayuda, Profile, NotFound
  lib/fontSize.ts           Escala de letra guardada en el equipo
```

## Desarrollo

```sh
npm install
npm run dev        # http://localhost:8080
npm run build      # genera dist/
npm run lint
```

## Instalar en un computador de la sede (sin internet)

1. En un equipo con internet: `npm install && npm run build`.
2. Copie la carpeta `dist/` a una memoria USB.
3. En el computador de la sede, sirva la carpeta con cualquier servidor local (por ejemplo `npx serve dist` si hay Node, o Python: `python -m http.server 8080` dentro de `dist/`) y abra `http://localhost:8080` en el navegador.

## Hoja de ruta

- **Entrega 1 (esta versión):** base visual y estructura para docentes mayores.
- **Entrega 2:** modo sin conexión (PWA), guardado local de avance y foro, indicador de conexión, registros de uso exportables para la investigación.
- **Entrega 3:** módulos por pasos (cápsulas de 5–10 minutos), foro con respuestas, cuestionario de autopercepción integrado.
