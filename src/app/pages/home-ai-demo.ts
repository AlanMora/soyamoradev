import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';

interface ChatMessage {
  from: 'user' | 'bot';
  text: string;
  tags?: { label: string; tone: 'ai' | 'ok' | 'warn' }[];
}

interface Step {
  delay: number;
  typing?: boolean;
  message?: ChatMessage;
  restart?: boolean;
}

/**
 * Demo simulada del agente IA respondiendo en WhatsApp:
 * clasifica intención, responde 24/7 y detecta opt-out automáticamente.
 */
@Component({
  selector: 'app-ai-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="glass-strong overflow-hidden !rounded-3xl">
      <!-- Barra estilo chat -->
      <div class="flex items-center gap-3 border-b border-white/10 bg-white/5 px-5 py-3.5">
        <img src="avatar.svg" alt="" class="h-9 w-9" />
        <div class="min-w-0">
          <p class="truncate text-sm font-semibold text-white">Tu negocio · Agente IA</p>
          <p class="flex items-center gap-1.5 text-xs text-brand-300">
            <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-400" aria-hidden="true"></span>
            respondiendo 24/7
          </p>
        </div>
        <span class="ml-auto rounded-full bg-brand-500/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-brand-300">
          En vivo
        </span>
      </div>

      <!-- Conversación -->
      <div class="flex min-h-[21rem] flex-col justify-end gap-3 p-5" aria-live="polite">
        @for (m of messages(); track $index) {
          <div class="flex" [class.justify-end]="m.from === 'bot'">
            <div class="max-w-[85%]">
              @if (m.tags?.length) {
                <div class="mb-1 flex flex-wrap justify-end gap-1.5">
                  @for (t of m.tags; track t.label) {
                    <span
                      class="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                      [class]="
                        t.tone === 'ai'
                          ? 'bg-sky-500/15 text-sky-300'
                          : t.tone === 'ok'
                            ? 'bg-brand-500/15 text-brand-300'
                            : 'bg-amber-500/15 text-amber-300'
                      "
                      >{{ t.label }}</span
                    >
                  }
                </div>
              }
              <div
                class="msg-in rounded-2xl px-4 py-2.5 text-sm leading-relaxed"
                [class]="
                  m.from === 'bot'
                    ? 'rounded-br-sm bg-brand-600/90 text-white'
                    : 'rounded-bl-sm border border-white/10 bg-white/8 text-slate-200'
                "
              >
                {{ m.text }}
              </div>
            </div>
          </div>
        }
        @if (typing()) {
          <div class="flex justify-end">
            <div class="msg-in flex items-center gap-1.5 rounded-2xl rounded-br-sm bg-brand-600/60 px-4 py-3">
              <span class="dot h-1.5 w-1.5 rounded-full bg-white/80"></span>
              <span class="dot h-1.5 w-1.5 rounded-full bg-white/80" style="animation-delay: 0.15s"></span>
              <span class="dot h-1.5 w-1.5 rounded-full bg-white/80" style="animation-delay: 0.3s"></span>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: `
    @keyframes msgIn {
      from { opacity: 0; transform: translateY(10px) scale(0.97); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    .msg-in { animation: msgIn 0.28s ease-out; }
    @keyframes dotBlink {
      0%, 80%, 100% { opacity: 0.25; }
      40% { opacity: 1; }
    }
    .dot { animation: dotBlink 1.1s ease-in-out infinite; }
  `,
})
export class AiDemo {
  protected readonly messages = signal<ChatMessage[]>([]);
  protected readonly typing = signal(false);
  private readonly destroyRef = inject(DestroyRef);
  private timer: ReturnType<typeof setTimeout> | null = null;

  private readonly script: Step[] = [
    {
      delay: 800,
      message: { from: 'user', text: 'Hola, ¿hacen envíos a Guadalajara? ¿Cuánto tardan?' },
    },
    { delay: 900, typing: true },
    {
      delay: 1600,
      message: {
        from: 'bot',
        text: '¡Hola! 👋 Sí, enviamos a Guadalajara: llega en 1 a 2 días hábiles. ¿Te comparto la guía de rastreo cuando salga tu pedido?',
        tags: [
          { label: '🤖 Agente IA', tone: 'ai' },
          { label: 'Intención: ventas', tone: 'ok' },
        ],
      },
    },
    { delay: 2200, message: { from: 'user', text: 'Sí porfa. Oye, ¿y puedo pagar contra entrega?' } },
    { delay: 900, typing: true },
    {
      delay: 1500,
      message: {
        from: 'bot',
        text: 'Claro: aceptamos pago contra entrega en zona metropolitana de GDL. Te aparto tu pedido y te mando el recordatorio un día antes. ✅',
        tags: [
          { label: '🤖 Agente IA', tone: 'ai' },
          { label: 'Sentimiento: positivo', tone: 'ok' },
        ],
      },
    },
    { delay: 2400, message: { from: 'user', text: 'ya no me manden promociones porfavor' } },
    { delay: 800, typing: true },
    {
      delay: 1400,
      message: {
        from: 'bot',
        text: 'Entendido, quedas fuera de nuestras promociones desde este momento. Solo recibirás mensajes de tus pedidos activos. 🙌',
        tags: [
          { label: '⚡ Opt-out detectado', tone: 'warn' },
          { label: 'Baja automática registrada', tone: 'warn' },
        ],
      },
    },
    { delay: 4200, restart: true },
  ];

  constructor() {
    afterNextRender(() => this.play(0));
    this.destroyRef.onDestroy(() => {
      if (this.timer) clearTimeout(this.timer);
    });
  }

  private play(index: number): void {
    const step = this.script[index];
    this.timer = setTimeout(() => {
      if (step.restart) {
        this.messages.set([]);
        this.play(0);
        return;
      }
      if (step.typing) {
        this.typing.set(true);
      }
      if (step.message) {
        this.typing.set(false);
        this.messages.update((list) => [...list, step.message!]);
      }
      this.play(index + 1);
    }, step.delay);
  }
}
