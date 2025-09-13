# Iwa Crece — App (Expo React Native)

Este es un *starter* listo para correr como base del ecosistema de tu libro y curso.

## Requisitos
- Node.js LTS (18+)
- npm o yarn
- Expo CLI (no es obligatorio instalar globalmente; puedes usar `npx`)

## Cómo correr
```bash
cd iwa-crece-app-starter
npm install
npm start    # o: npx expo start
```
Escanea el QR con la app *Expo Go* en tu iPhone/Android.

## Estructura
- `App.js` navegación con pestañas y stack para detalle de capítulos
- `screens/` pantallas principales (Inicio, Capítulos, Audio, Curso, Tienda, Perfil)
- `data/mockData.js` datos de ejemplo
- `assets/` iconos/splash (reemplaza por tus gráficos reales)

## Personalización rápida
- **Capítulos**: edita `data/mockData.js` o conéctalo a un backend (p.ej., Supabase).
- **Audio**: sube tus MP3 (192 kbps, 44.1 kHz, mono para ACX) a un hosting y cambia las URLs.
- **Tienda**: pega el enlace a tu producto en Amazon KDP/Kindle, Shopify o TikTok Shop.

## Próximos pasos sugeridos
1. Autenticación ligera (Expo AuthSession) o Supabase Auth.
2. Sincronizar contenido desde Supabase (Postgres + Storage) o Firebase.
3. Reproductor con cola, descargas y *background audio*.
4. Progreso del curso y compras in‑app (IAP) si deseas monetizar módulos.
5. Localización ES/EN y *dark mode*.
6. *Branding*: integra tus colores, caracoles y portada.

¡Éxitos! 💪
## Consulta estratégica (nueva)

La pestaña **Consulta** implementa el flujo que definiste:
**Oddu Toyale + Oddu (Ire/Osogbo) + tipo + Orisha que defiende.**

- El motor (`lib/engine.js`) arma un texto que:
  1) Describe el **rol del orisha** dentro del Oddu Toyale.
  2) Encadena **refranes del oddu Toyale** con **refranes del oddu de resultado** (Ire/Osogbo).
  3) Cierra con una **sugerencia de solución** en función del tipo (p. ej., *ire ariku*, *osogbo ofo*).

> Reemplaza los refranes de ejemplo en `data/oddus.js` por tu contenido real y amplía los **ORISHA_ROLES** y **SOLUTION_TEMPLATES**.
