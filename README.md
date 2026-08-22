# SoyAmoreDev

Sitio web oficial de **SoyAmoreDev** — sistema de envío de mensajes por WhatsApp mediante la **API oficial de WhatsApp Business (Meta)**.

Construido para cumplir con los requisitos de **Meta Business Verification**: identidad del negocio consistente, HTTPS, información de contacto verificable, Aviso de Privacidad conforme a la LFPDPPP (México) y consentimiento explícito (opt-in) para comunicaciones por WhatsApp.

## Stack

- **Angular 22** — standalone components, signals, `ChangeDetectionStrategy.OnPush`, lazy routes, control flow (`@if` / `@for`)
- **SSR + Prerender** (`@angular/ssr`) — las 5 rutas se prerenderizan como HTML estático (los crawlers de Meta ven contenido real)
- **TailwindCSS v4** — sistema de diseño glassmorphism (`.glass`, `.glass-strong`, `.glass-nav`, `.glass-input`)
- Reactive Forms con validación y registro de consentimiento (número, fecha/hora, origen y versión del texto aceptado)

## Estructura

| Ruta | Contenido |
|---|---|
| `/` | Inicio — qué es el negocio y qué hace |
| `/nosotros` | Descripción del negocio e identidad legal |
| `/contacto` | Datos del responsable + formulario con opt-in de WhatsApp |
| `/aviso-de-privacidad` | Aviso integral (arts. 14 y 15 LFPDPPP) |
| `/terminos` | Términos y Condiciones |

## Desarrollo

```bash
npm install
npm start          # dev server en http://localhost:4200
npm run build      # build de producción + prerender
npm run serve:ssr:soyamoredev  # servir el bundle SSR
```

## Pendientes antes de la verificación de Meta

- [ ] Reemplazar teléfono y domicilio reales en `src/app/core/business.ts`
- [ ] Desplegar en `https://soyamoredev.com` con HTTPS
- [ ] Configurar correo empresarial `hola@soyamoredev.com` (mismo dominio que el sitio)
- [ ] Conectar el formulario de contacto a un backend que persista el registro de consentimiento (incluir IP/session del lado servidor)

---

SoyAmoreDev es una marca operada por **Alan Eduardo Vázquez Mora**.
