import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BUSINESS } from '../core/business';
import { AiDemo } from './home-ai-demo';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, AiDemo],
  template: `
    <!-- Hero -->
    <section class="relative overflow-hidden px-4 pb-20 pt-36 sm:px-6">
      <div class="mx-auto max-w-6xl">
        <div class="grid items-center gap-12 [perspective:1200px] lg:grid-cols-2" data-hero-zone>
          <div class="text-center lg:text-left" data-hero>
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
            <p class="mt-6 text-lg leading-relaxed text-slate-300">
              {{ b.brandName }} es un sistema de envío de mensajes por WhatsApp construido sobre la
              <strong class="text-white">API oficial de WhatsApp Business (Meta)</strong>: campañas,
              notificaciones transaccionales y conversaciones con tus clientes en México, con
              consentimiento verificable y cumplimiento normativo.
            </p>
            <div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <a routerLink="/contacto" class="btn-primary">Solicitar demo</a>
              <a routerLink="/nosotros" class="btn-ghost">Conoce más</a>
            </div>
          </div>

          <!-- Mascota presentando el sistema -->
          <div class="relative mx-auto w-full max-w-md [transform-style:preserve-3d]" data-scene aria-hidden="true">
            <img
              src="mascot.svg"
              alt=""
              data-depth="18"
              class="mx-auto h-[22rem] w-auto drop-shadow-[0_0_40px_rgba(37,211,102,0.25)] will-change-transform sm:h-[26rem]"
            />
          </div>
        </div>

        <!-- Glass stats strip -->
        <div class="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
          @for (stat of stats; track stat.label) {
            <div class="glass px-6 py-5 text-center" data-reveal>
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
            <article class="glass p-6 transition hover:-translate-y-1 hover:border-brand-400/30" data-reveal>
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

    <!-- IA: diferenciador -->
    <section class="px-4 py-16 sm:px-6" aria-labelledby="ia-title">
      <div class="mx-auto max-w-6xl">
        <div class="text-center">
          <span class="glass inline-flex items-center gap-2 !rounded-full px-4 py-1.5 text-sm text-sky-300">
            <span aria-hidden="true">🤖</span> Inteligencia Artificial integrada
          </span>
          <h2 id="ia-title" class="section-title mt-6">IA que trabaja por ti, 24/7</h2>
          <p class="mx-auto mt-4 max-w-2xl text-slate-400">
            No solo enviamos mensajes: nuestro agente IA entiende, responde y protege tu número.
            Esto es lo que nos diferencia de un panel de envíos común.
          </p>
        </div>

        <div class="mt-14 grid items-center gap-10 lg:grid-cols-2">
          <!-- Demo en vivo -->
          <app-ai-demo data-reveal />

          <!-- Capacidades IA -->
          <div class="grid gap-4 sm:grid-cols-2">
            @for (f of aiFeatures; track f.title) {
              <article class="glass p-5 transition hover:-translate-y-1 hover:border-sky-400/30" data-reveal>
                <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/15 text-lg" aria-hidden="true">
                  {{ f.icon }}
                </div>
                <h3 class="mt-3 font-semibold text-white">{{ f.title }}</h3>
                <p class="mt-1.5 text-sm leading-relaxed text-slate-400">{{ f.text }}</p>
              </article>
            }
          </div>
        </div>
      </div>
    </section>

    <!-- Scrollytelling: así funciona -->
    <section data-story aria-labelledby="story-title">
      <div data-story-pin class="flex min-h-screen items-center overflow-hidden px-4 sm:px-6">
        <div class="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div class="mx-auto [perspective:1100px]">
            <div class="relative will-change-transform" data-story-robot>
              <img
                src="mascot.svg"
                alt=""
                class="story-pose h-[18rem] w-auto drop-shadow-[0_0_50px_rgba(37,211,102,0.3)] sm:h-[24rem]"
              />
              <img
                src="mascot-pose2.svg"
                alt=""
                class="story-pose absolute inset-0 h-[18rem] w-auto drop-shadow-[0_0_50px_rgba(56,189,248,0.3)] sm:h-[24rem]"
              />
              <img
                src="mascot-pose3.svg"
                alt=""
                class="story-pose absolute inset-0 h-[18rem] w-auto drop-shadow-[0_0_50px_rgba(37,211,102,0.35)] sm:h-[24rem]"
              />
            </div>
          </div>
          <div class="relative h-80 sm:h-72">
            <h2 id="story-title" class="sr-only">Así funciona</h2>
            @for (s of storySteps; track s.step) {
              <div class="story-step absolute inset-0 flex flex-col justify-center">
                <p class="text-sm font-bold uppercase tracking-[0.25em] text-brand-400">
                  Paso {{ s.step }} / 3
                </p>
                <h3 class="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  {{ s.title }}
                </h3>
                <p class="mt-4 max-w-md text-lg leading-relaxed text-slate-300">{{ s.text }}</p>
              </div>
            }
            <div class="absolute bottom-0 left-0 flex gap-2" aria-hidden="true">
              @for (s of storySteps; track s.step) {
                <span class="story-dot h-1.5 w-8 rounded-full bg-white/15"></span>
              }
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Cumplimiento -->
    <section class="px-4 py-16 sm:px-6" aria-labelledby="cumplimiento-title">
      <div class="mx-auto max-w-6xl">
        <div class="glass-strong grid gap-10 p-8 md:grid-cols-2 md:p-12" data-reveal>
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
      <div class="mx-auto max-w-3xl text-center" data-reveal>
        <h2 class="section-title">¿Listo para empezar?</h2>
        <p class="mt-4 text-slate-400">
          Escríbenos y te ayudamos a conectar tu negocio con la API oficial de WhatsApp Business.
        </p>
        <a routerLink="/contacto" class="btn-primary mt-8">Contáctanos</a>
      </div>
    </section>
  `,
  styles: `
    /* Solo el primer paso es visible por defecto; GSAP controla el resto.
       Evita que los pasos se encimen antes de inicializar las animaciones. */
    .story-step:not(:first-of-type),
    .story-pose:not(:first-of-type) {
      opacity: 0;
      visibility: hidden;
    }
    /* Sin animaciones: los pasos se muestran apilados y legibles */
    @media (prefers-reduced-motion: reduce) {
      [data-story-pin] { min-height: auto; padding-block: 4rem; }
      .story-step { position: static; margin-block: 2rem; opacity: 1; visibility: visible; }
      .story-dot { display: none; }
    }
  `,
})
export class Home {
  protected readonly b = BUSINESS;
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => this.initAnimations());
  }

  /** Animaciones GSAP: entrada del hero, parallax 3D con el mouse y reveals al scroll. */
  private initAnimations(): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const el = this.host.nativeElement;
    const ctx = gsap.context(() => {
      // Entrada cinematográfica del hero
      gsap.from('[data-hero] > *', {
        y: 32,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
      });
      gsap.from('[data-depth]', {
        scale: 0.85,
        opacity: 0,
        duration: 1.1,
        stagger: 0.15,
        delay: 0.3,
        ease: 'back.out(1.4)',
      });

      // Scrollytelling: robot pineado; cada paso cambia texto Y postura del robot
      const steps = gsap.utils.toArray<HTMLElement>('.story-step');
      const dots = gsap.utils.toArray<HTMLElement>('.story-dot');
      const poses = gsap.utils.toArray<HTMLElement>('.story-pose');
      const robot = el.querySelector<HTMLElement>('[data-story-robot]');
      if (steps.length === 3 && poses.length === 3 && robot) {
        gsap.set(steps.slice(1), { autoAlpha: 0, y: 70 });
        gsap.set(poses.slice(1), { autoAlpha: 0, scale: 0.9, rotationY: 40 });
        gsap.set(dots[0], { backgroundColor: 'rgba(37,211,102,0.9)' });
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: '[data-story]',
            pin: '[data-story-pin]',
            start: 'top top',
            end: '+=2400',
            scrub: 1,
          },
        });
        tl.fromTo(robot, { scale: 0.94 }, { scale: 1.02, duration: 1 }, 0)
          // Paso 1 → 2: texto y cambio de postura (giro tipo "voltea y cambia")
          .to(steps[0], { autoAlpha: 0, y: -70, duration: 0.4 }, 0.8)
          .to(dots[0], { backgroundColor: 'rgba(255,255,255,0.15)', duration: 0.2 }, 0.8)
          .to(poses[0], { autoAlpha: 0, scale: 0.9, rotationY: -40, duration: 0.35 }, 0.85)
          .fromTo(steps[1], { autoAlpha: 0, y: 70 }, { autoAlpha: 1, y: 0, duration: 0.4 }, 1.05)
          .fromTo(
            poses[1],
            { autoAlpha: 0, scale: 0.9, rotationY: 40 },
            { autoAlpha: 1, scale: 1.06, rotationY: 0, duration: 0.4 },
            1.05,
          )
          .to(dots[1], { backgroundColor: 'rgba(37,211,102,0.9)', duration: 0.2 }, 1.05)
          // Paso 2 → 3
          .to(steps[1], { autoAlpha: 0, y: -70, duration: 0.4 }, 1.85)
          .to(dots[1], { backgroundColor: 'rgba(255,255,255,0.15)', duration: 0.2 }, 1.85)
          .to(poses[1], { autoAlpha: 0, scale: 0.9, rotationY: -40, duration: 0.35 }, 1.9)
          .fromTo(steps[2], { autoAlpha: 0, y: 70 }, { autoAlpha: 1, y: 0, duration: 0.4 }, 2.1)
          .fromTo(
            poses[2],
            { autoAlpha: 0, scale: 0.9, rotationY: 40 },
            { autoAlpha: 1, scale: 1.1, rotationY: 0, duration: 0.4 },
            2.1,
          )
          .to(dots[2], { backgroundColor: 'rgba(37,211,102,0.9)', duration: 0.2 }, 2.1)
          .to(robot, { y: -10, duration: 0.8 }, 2.2);
      }

      // Reveals al hacer scroll
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((target) => {
        gsap.from(target, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: target, start: 'top 88%', once: true },
        });
      });
    }, el);

    // Parallax 3D: cada capa se mueve según su data-depth, la escena se inclina
    const zone = el.querySelector<HTMLElement>('[data-hero-zone]');
    const scene = el.querySelector<HTMLElement>('[data-scene]');
    const layers = Array.from(el.querySelectorAll<HTMLElement>('[data-depth]')).map((layer) => ({
      setX: gsap.quickTo(layer, 'x', { duration: 0.6, ease: 'power3.out' }),
      setY: gsap.quickTo(layer, 'y', { duration: 0.6, ease: 'power3.out' }),
      depth: Number(layer.dataset['depth'] ?? 0),
    }));
    const tiltX = scene ? gsap.quickTo(scene, 'rotationY', { duration: 0.8, ease: 'power3.out' }) : null;
    const tiltY = scene ? gsap.quickTo(scene, 'rotationX', { duration: 0.8, ease: 'power3.out' }) : null;

    const onMove = (e: MouseEvent) => {
      if (!zone) return;
      const rect = zone.getBoundingClientRect();
      const rx = (e.clientX - rect.left) / rect.width - 0.5;
      const ry = (e.clientY - rect.top) / rect.height - 0.5;
      for (const l of layers) {
        l.setX(rx * l.depth);
        l.setY(ry * l.depth);
      }
      tiltX?.(rx * 10);
      tiltY?.(ry * -8);
    };
    const onLeave = () => {
      for (const l of layers) {
        l.setX(0);
        l.setY(0);
      }
      tiltX?.(0);
      tiltY?.(0);
    };
    zone?.addEventListener('mousemove', onMove, { passive: true });
    zone?.addEventListener('mouseleave', onLeave, { passive: true });

    this.destroyRef.onDestroy(() => {
      ctx.revert();
      zone?.removeEventListener('mousemove', onMove);
      zone?.removeEventListener('mouseleave', onLeave);
    });
  }

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

  protected readonly aiFeatures = [
    {
      icon: '💬',
      title: 'Agente IA 24/7',
      text: 'Responde preguntas frecuentes al instante, en tu tono de marca, y escala a un humano cuando la conversación lo requiere.',
    },
    {
      icon: '🎯',
      title: 'Clasificación de intención',
      text: 'Cada mensaje entrante se etiqueta automáticamente: venta, soporte, queja o baja, y se enruta al flujo correcto.',
    },
    {
      icon: '✍️',
      title: 'Plantillas generadas con IA',
      text: 'Redacta plantillas con alta probabilidad de aprobación por Meta y variantes A/B para mejorar conversión.',
    },
    {
      icon: '📈',
      title: 'Mejor hora de envío',
      text: 'La IA aprende cuándo responde cada contacto y programa tus campañas en su horario de mayor apertura.',
    },
    {
      icon: '🧠',
      title: 'Análisis de sentimiento',
      text: 'Detecta clientes molestos en tiempo real y los prioriza para atención humana antes de que escalen.',
    },
    {
      icon: '🛡️',
      title: 'Opt-out automático',
      text: 'Entiende frases como "ya no me manden" y da de baja al contacto al instante: protege tu número y tu cumplimiento.',
    },
  ];

  protected readonly storySteps = [
    {
      step: 1,
      title: 'Conecta tu número',
      text: 'Onboarding guiado a la API oficial de WhatsApp Business (Meta): verificación, display name y plantillas aprobadas.',
    },
    {
      step: 2,
      title: 'Automatiza con IA',
      text: 'El agente IA responde 24/7, clasifica intenciones, detecta sentimiento y escala a tu equipo cuando hace falta.',
    },
    {
      step: 3,
      title: 'Escala con cumplimiento',
      text: 'Campañas a miles de contactos con opt-in verificable, baja automática y trazabilidad completa para auditorías.',
    },
  ];

  protected readonly compliance = [
    'Opt-in explícito antes de cualquier envío, registrado con fecha, origen y versión del texto aceptado.',
    'Uso exclusivo de la API oficial de WhatsApp Business: sin bots no autorizados ni riesgo de bloqueo.',
    'Aviso de privacidad conforme a los artículos 14 y 15 de la LFPDPPP (México).',
    'Baja inmediata: el usuario puede revocar su consentimiento en cualquier momento.',
  ];
}
