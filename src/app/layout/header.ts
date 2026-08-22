import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BUSINESS } from '../core/business';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="glass-nav fixed inset-x-0 top-0 z-50">
      <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a routerLink="/" class="flex items-center gap-2" aria-label="Inicio">
          <span
            class="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 font-bold text-ink-900 shadow-lg shadow-brand-500/30"
            aria-hidden="true"
            >S</span
          >
          <span class="text-lg font-bold tracking-tight text-white">{{ brand }}</span>
        </a>

        <nav class="hidden items-center gap-1 md:flex" aria-label="Navegación principal">
          @for (link of links; track link.path) {
            <a
              [routerLink]="link.path"
              routerLinkActive="bg-white/10 text-white"
              [routerLinkActiveOptions]="{ exact: link.path === '/' }"
              class="rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
              >{{ link.label }}</a
            >
          }
          <a routerLink="/contacto" fragment="whatsapp" class="btn-primary ml-3 !px-4 !py-2 text-sm">
            Solicitar demo
          </a>
        </nav>

        <button
          type="button"
          class="rounded-lg p-2 text-slate-200 hover:bg-white/10 md:hidden"
          (click)="menuOpen.set(!menuOpen())"
          [attr.aria-expanded]="menuOpen()"
          aria-controls="mobile-menu"
          aria-label="Abrir menú"
        >
          <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            @if (menuOpen()) {
              <path stroke-linecap="round" d="M6 18 18 6M6 6l12 12" />
            } @else {
              <path stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16" />
            }
          </svg>
        </button>
      </div>

      @if (menuOpen()) {
        <nav id="mobile-menu" class="border-t border-white/10 px-4 pb-4 pt-2 md:hidden" aria-label="Menú móvil">
          @for (link of links; track link.path) {
            <a
              [routerLink]="link.path"
              routerLinkActive="bg-white/10 text-white"
              [routerLinkActiveOptions]="{ exact: link.path === '/' }"
              (click)="menuOpen.set(false)"
              class="block rounded-lg px-4 py-3 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white"
              >{{ link.label }}</a
            >
          }
        </nav>
      }
    </header>
  `,
})
export class Header {
  protected readonly brand = BUSINESS.brandName;
  protected readonly menuOpen = signal(false);
  protected readonly links = [
    { path: '/', label: 'Inicio' },
    { path: '/nosotros', label: 'Nosotros' },
    { path: '/contacto', label: 'Contacto' },
  ];
}
