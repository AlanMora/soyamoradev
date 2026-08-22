import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BUSINESS } from '../core/business';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <!-- Hero -->
    <section class="relative overflow-hidden px-4 pb-20 pt-36 sm:px-6">
      <div class="mx-auto max-w-6xl">
        <div class="mx-auto max-w-3xl text-center">
          <span class="glass inline-flex items-center gap-2 !rounded-full px-4 py-1.5 text-sm text-brand-300">
            <span class="h-2 w-2 rounded-full bg-brand-400" aria-hidden="true"></span>
            API oficial de WhatsApp Business · Meta
          </span>
          <h1 class="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
            Mensajería por WhatsApp,
            <span class="bg-gradient-to-r from-brand-400 to-emerald-300 bg-clip-text text-transparent">
              oficial y a escala
            </span>
          </h1>
          <p class="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
            {{ b.brandName }} es un sistema de envío de mensajes por WhatsApp construido sobre la
            <strong class="text-white">API oficial de WhatsApp Business (Meta)</strong>: campañas,
            notificaciones transaccionales y conversaciones con tus clientes en México, con
            consentimiento verificable y cumplimiento normativo.
          </p>
          <div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a routerLink="/contacto" class="btn-primary">Solicitar demo</a>
            <a routerLink="/nosotros" class="btn-ghost">Conoce más</a>
          </div>
        </div>

        <!-- Glass stats strip -->
        <div class="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
          @for (stat of stats; track stat.label) {
            <div class="glass px-6 py-5 text-center">
              <p class="text-2xl font-bold text-white">{{ stat.value }}</p>
              <p class="mt-1 text-sm text-slate-400">{{ stat.label }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Servicios -->
    <section class="px-4 py-16 sm:px-6" aria-labelledby="servicios-title">
      <div class="mx-auto max-w-6xl">
        <h2 id="servicios-title" class="section-title text-center">¿Qué hacemos?</h2>
        <p class="mx-auto mt-4 max-w-2xl text-center text-slate-400">
          Todo lo que necesitas para comunicarte con tus clientes por WhatsApp de forma legal,
          profesional y medible.
        </p>
        <div class="mt-12 grid gap-6 md:grid-cols-3">
          @for (f of features; track f.title) {
            <article class="glass p-6 transition hover:-translate-y-1 hover:border-brand-400/30">
              <div
                class="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/15 text-xl"
                aria-hidden="true"
              >
                {{ f.icon }}
              </div>
              <h3 class="mt-4 text-lg font-semibold text-white">{{ f.title }}</h3>
              <p class="mt-2 text-sm leading-relaxed text-slate-400">{{ f.text }}</p>
            </article>
          }
        </div>
      </div>
    </section>

    <!-- Cumplimiento -->
    <section class="px-4 py-16 sm:px-6" aria-labelledby="cumplimiento-title">
      <div class="mx-auto max-w-6xl">
        <div class="glass-strong grid gap-10 p-8 md:grid-cols-2 md:p-12">
          <div>
            <h2 id="cumplimiento-title" class="section-title">Cumplimiento primero</h2>
            <p class="mt-4 leading-relaxed text-slate-300">
              Solo enviamos mensajes a personas que dieron su
              <strong class="text-white">consentimiento explícito (opt-in)</strong>, como lo exige
              WhatsApp. Registramos número, fecha, origen y versión del texto aceptado, y tratamos
              los datos personales conforme a la Ley Federal de Protección de Datos Personales en
              Posesión de los Particulares.
            </p>
            <a routerLink="/aviso-de-privacidad" class="btn-ghost mt-8">Ver Aviso de Privacidad</a>
          </div>
          <ul class="space-y-4">
            @for (item of compliance; track item) {
              <li class="flex items-start gap-3">
                <span
                  class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500/20 text-sm text-brand-300"
                  aria-hidden="true"
                  >✓</span
                >
                <span class="text-slate-300">{{ item }}</span>
              </li>
            }
          </ul>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="px-4 py-16 sm:px-6">
      <div class="mx-auto max-w-3xl text-center">
        <h2 class="section-title">¿Listo para empezar?</h2>
        <p class="mt-4 text-slate-400">
          Escríbenos y te ayudamos a conectar tu negocio con la API oficial de WhatsApp Business.
        </p>
        <a routerLink="/contacto" class="btn-primary mt-8">Contáctanos</a>
      </div>
    </section>
  `,
})
export class Home {
  protected readonly b = BUSINESS;

  protected readonly stats = [
    { value: 'API oficial', label: 'WhatsApp Business Platform (Meta)' },
    { value: 'Opt-in 100%', label: 'Consentimiento explícito y auditable' },
    { value: 'México', label: 'Cumplimiento LFPDPPP' },
  ];

  protected readonly features = [
    {
      icon: '📣',
      title: 'Campañas de difusión',
      text: 'Envía plantillas aprobadas por Meta a tus listas con consentimiento: promociones, avisos y novedades, con métricas de entrega y lectura.',
    },
    {
      icon: '🔔',
      title: 'Notificaciones transaccionales',
      text: 'Confirmaciones de pedido, recordatorios de cita y alertas de servicio, enviados de forma automática desde tus sistemas.',
    },
    {
      icon: '💬',
      title: 'Conversaciones y soporte',
      text: 'Bandeja de entrada para responder a tus clientes, con historial, etiquetas y asignación a tu equipo.',
    },
    {
      icon: '🧩',
      title: 'Integración vía API',
      text: 'Conecta tu CRM, e-commerce o sistema interno con nuestra API y webhooks para envíos y recepción de mensajes.',
    },
    {
      icon: '🗂️',
      title: 'Gestión de plantillas',
      text: 'Creación, envío a aprobación y versionado de plantillas de mensaje conforme a las políticas de WhatsApp.',
    },
    {
      icon: '📊',
      title: 'Reportes y auditoría',
      text: 'Trazabilidad completa: quién recibió qué, cuándo y bajo qué consentimiento. Exportable para auditorías.',
    },
  ];

  protected readonly compliance = [
    'Opt-in explícito antes de cualquier envío, registrado con fecha, origen y versión del texto aceptado.',
    'Uso exclusivo de la API oficial de WhatsApp Business: sin bots no autorizados ni riesgo de bloqueo.',
    'Aviso de privacidad conforme a los artículos 14 y 15 de la LFPDPPP (México).',
    'Baja inmediata: el usuario puede revocar su consentimiento en cualquier momento.',
  ];
}
