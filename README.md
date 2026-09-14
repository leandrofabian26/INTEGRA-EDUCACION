# INTEGRA

Plataforma de formación en tecnología para docentes de 55 a 65 años de la vereda Agua bonita, San José del Guaviare. Hace parte del proyecto de grado *Brecha generacional en el aula rural: INTEGRA y la inclusión digital de docentes en Agua bonita, Guaviare* (Maestría en Educación, Corporación Universitaria Iberoamericana).

## Principios de diseño

- **Pensada para docentes de 55 a 65 años.** Letra grande (base 20 px en escritorio, 18 px en móvil), fuente Atkinson Hyperlegible, alto contraste (WCAG AA en todo el texto), botones de mínimo 52 px de alto con borde visible, icono + texto siempre, y control **A− / A+** para agrandar toda la interfaz.
- **Una sola cosa importante por pantalla.** Inicio abre con "Continuar donde quedé". El menú tiene cinco entradas: Inicio, Mis módulos, Foro, Mi avance, Ayuda.
- **Módulos por pasos (cápsulas de 5 a 10 minutos).** Cada paso sigue la misma secuencia: qué va a lograr → cómo se hace → practíquelo ahora → «Lo logré, siguiente paso» o «Necesito ayuda» (que abre las trabas más comunes y el enlace al foro). Se puede volver a cualquier paso y repasar un módulo completo. Cada «Necesito ayuda» queda registrado.
- **Foro con respuestas.** Preguntas y respuestas entre colegas, con nombre real; todo funciona sin señal y se marca como enviado cuando vuelve.
- **Cuestionario de autopercepción integrado** (Anexo A de la tesis): 24 preguntas, una por pantalla, con botones grandes. Se pide al empezar (inicio) y al completar los seis módulos (cierre); se exporta a CSV desde Mi cuenta.
- **Lenguaje claro.** "Entrar" en vez de "Iniciar sesión"; errores en frases completas que dicen qué hacer.
- **Funciona sin internet.** Es una aplicación web instalable (PWA): tras la primera carga, todo queda guardado en el equipo y abre sin señal. Las cuentas, el avance, los mensajes del foro y el registro de uso se guardan en el mismo computador (IndexedDB). Un indicador en la cabecera muestra siempre si hay conexión; al volver la señal, los mensajes pendientes del foro se marcan como enviados.
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
  content/pasos.ts          Pasos de cada módulo: texto, práctica, «si se traba»
  content/cuestionario.ts   Preguntas del cuestionario de autopercepción
  lib/almacen.ts            Almacén local (IndexedDB): usuarios, avance, foro, eventos
  lib/fontSize.ts           Escala de letra guardada en el equipo
  hooks/useSesion.ts        Quién está usando el equipo
  hooks/useAvance.ts        Avance real por módulo (leer / completar paso / reiniciar)
  hooks/useConexion.ts      Estado de la conexión en tiempo real
  components/layout/        Navegación, cabecera, control de letra, indicador de
                            conexión, ruta protegida
  components/               Estado de módulo, barra de avance, ilustraciones SVG
  pages/                    Welcome, Login, Register, Dashboard (Inicio), Modulos,
                            ModuloDetalle (visor de pasos), Forum (con respuestas),
                            Avance, Ayuda, Cuestionario, Profile (Mi cuenta), NotFound
public/iconos/              Iconos de la aplicación instalable
vite.config.ts              Configuración de la PWA (manifest + service worker)
```

## Datos y registro de uso

Todo se guarda en el navegador del equipo, en la base `integra` (IndexedDB):

| Almacén | Contenido |
|---|---|
| `usuarios` | nombre, correo, sede y contraseña cifrada (SHA-256) |
| `avance` | pasos completados por módulo y fecha |
| `foro` | mensajes con estado `pendiente` (sin señal) o `enviado` |
| `eventos` | registro de uso: entrar, salir, abrir módulo, paso completado, módulo completado, necesito ayuda, foro (publicar y responder), cuestionario, cambios de conexión, sincronización, exportaciones |
| `respuestas` | respuestas a mensajes del foro, con estado `pendiente` o `enviado` |
| `cuestionarios` | respuestas del cuestionario de autopercepción (inicio y cierre) |

En **Mi cuenta** hay dos botones de descarga en CSV (separador `;`, compatible con Excel): el registro de uso y los cuestionarios. Alimentan las fuentes "registros de la plataforma" y "cuestionario de autopercepción" del Capítulo III de la tesis. No incluyen contraseñas.

## Editar los módulos

Los textos de los pasos están en `src/content/pasos.ts`. Cada paso tiene: `titulo`, `lograra` (al terminar podrá…), `como` (lista de instrucciones), `ilustracion` (una de las claves de `src/components/Ilustracion.tsx`), `practica` y `siSeTraba` (preguntas y respuestas). Para cambiar un módulo basta con editar ese archivo; no hay que tocar componentes.

Cuando exista un servidor, el único punto que hay que conectar es `sincronizarPendientes()` en `src/lib/almacen.ts`.

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
4. La primera vez, el navegador ofrece "Instalar INTEGRA". Al aceptar, queda como una aplicación con su propio icono y abre aunque no haya señal.

> El service worker requiere `localhost` o HTTPS; abrir `index.html` directamente con doble clic (`file://`) no activa el modo sin conexión.

## Hoja de ruta

- **Entrega 1:** base visual y estructura para docentes mayores.
- **Entrega 2:** modo sin conexión (PWA), cuentas y avance guardados en el equipo, foro con cola de envío, indicador de conexión, registro de uso exportable.
- **Entrega 3 (esta versión):** módulos por pasos con ilustraciones y práctica guiada, foro con respuestas, cuestionario de autopercepción integrado y exportable.
- **Siguiente:** contenido definitivo de los módulos a partir del ciclo 1 con los docentes; servidor de sincronización para compartir el foro entre equipos.
