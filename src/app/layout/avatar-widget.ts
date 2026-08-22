import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BUSINESS } from '../core/business';

@Component({
  selector: 'app-avatar-widget',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <div class="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <!-- Panel de diálogo -->
      @if (open()) {
        <div
          class="glass-strong w-72 origin-bottom-right animate-pop p-5 sm:w-80"
          role="dialog"
          aria-label="Asistente virtual"
        >
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-center gap-3">
              <img src="avatar.svg" alt="" class="h-11 w-11" />
              <div>
                <p class="text-sm font-semibold text-white">Asistente {{ b.brandName }}</p>
                <p class="flex items-center gap-1.5 text-xs text-brand-300">
                  <span class="h-1.5 w-1.5 rounded-full bg-brand-400" aria-hidden="true"></span>
                  En línea
                </p>
              </div>
            </div>
            <button
              type="button"
              class="rounded-lg p-1 text-slate-400 transition hover:bg-white/10 hover:text-white"
              (click)="open.set(false)"
              aria-label="Cerrar asistente"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="mt-4 rounded-xl rounded-tl-sm border border-white/10 bg-white/5 p-3 text-sm leading-relaxed text-slate-300">
            ¡Hola! 👋 Soy el asistente de <strong class="text-white">{{ b.brandName }}</strong>.
            ¿Quieres enviar mensajes por WhatsApp con la API oficial de Meta? Te ayudo a empezar.
          </div>

          <div class="mt-4 flex flex-col gap-2">
            <a routerLink="/contacto" (click)="open.set(false)" class="btn-primary !py-2.5 text-sm">
              Solicitar una demo
            </a>
            <a routerLink="/nosotros" (click)="open.set(false)" class="btn-ghost !py-2.5 text-sm">
              Conocer el servicio
            </a>
            <a [href]="'mailto:' + b.email" class="text-center text-xs text-slate-400 hover:text-brand-300">
              o escríbenos a {{ b.email }}
            </a>
          </div>
        </div>
      }

      <!-- Botón avatar -->
      <button
        type="button"
        (click)="toggle()"
        class="group relative h-16 w-16 rounded-full shadow-2xl shadow-brand-500/30 transition duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-brand-300 motion-safe:animate-float"
        [attr.aria-expanded]="open()"
        aria-label="Abrir asistente virtual"
      >
        <img src="avatar.svg" alt="" class="h-full w-full" />
        @if (!open() && !dismissedHint()) {
          <span
            class="glass absolute -top-1 right-full mr-3 hidden w-max max-w-[11rem] !rounded-xl px-3 py-2 text-xs text-slate-200 sm:block"
          >
            ¿Necesitas ayuda? 💬
          </span>
        }
      </button>
    </div>
  `,
  styles: `
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-6px); }
    }
    .animate-float {
      animation: float 3.5s ease-in-out infinite;
    }
    @keyframes pop {
      from { opacity: 0; transform: scale(0.92) translateY(8px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }
    .animate-pop {
      animation: pop 0.18s ease-out;
    }
  `,
})
export class AvatarWidget {
  protected readonly b = BUSINESS;
  protected readonly open = signal(false);
  protected readonly dismissedHint = signal(false);

  protected toggle(): void {
    this.open.update((v) => !v);
    this.dismissedHint.set(true);
  }
}
