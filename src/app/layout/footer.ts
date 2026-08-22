import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BUSINESS } from '../core/business';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <footer class="mt-24 border-t border-white/10 bg-black/20">
      <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div class="grid gap-10 md:grid-cols-3">
          <div>
            <p class="text-lg font-bold text-white">{{ b.brandName }}</p>
            <p class="mt-2 max-w-xs text-sm leading-relaxed text-slate-400">
              {{ b.description }}
            </p>
          </div>
          <div>
            <p class="text-sm font-semibold uppercase tracking-wider text-slate-400">Legal</p>
            <ul class="mt-3 space-y-2 text-sm">
              <li><a routerLink="/aviso-de-privacidad" class="text-slate-300 hover:text-white">Aviso de Privacidad</a></li>
              <li><a routerLink="/terminos" class="text-slate-300 hover:text-white">Términos y Condiciones</a></li>
              <li><a routerLink="/contacto" class="text-slate-300 hover:text-white">Contacto</a></li>
            </ul>
          </div>
          <div>
            <p class="text-sm font-semibold uppercase tracking-wider text-slate-400">Contacto</p>
            <ul class="mt-3 space-y-2 text-sm text-slate-300">
              <li>
                <a [href]="'mailto:' + b.email" class="hover:text-white">{{ b.email }}</a>
              </li>
              <li>{{ b.phone }}</li>
              <li>{{ b.address }}</li>
            </ul>
          </div>
        </div>
        <div class="mt-10 border-t border-white/10 pt-6 text-sm text-slate-500">
          <p>© {{ year }} {{ b.brandName }}. Todos los derechos reservados.</p>
          <p class="mt-1">
            {{ b.brandName }} es una marca operada por {{ b.legalName }},
            {{ b.legalType }}.
          </p>
        </div>
      </div>
    </footer>
  `,
})
export class Footer {
  protected readonly b = BUSINESS;
  protected readonly year = new Date().getFullYear();
}
