import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BUSINESS } from '../core/business';

@Component({
  selector: 'app-nosotros',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <section class="px-4 pb-16 pt-36 sm:px-6">
      <div class="mx-auto max-w-4xl">
        <h1 class="section-title">Quiénes somos</h1>
        <p class="mt-6 text-lg leading-relaxed text-slate-300">
          <strong class="text-white">{{ b.brandName }}</strong> es una marca mexicana dedicada al
          desarrollo de soluciones de mensajería empresarial. Nuestro producto principal es un
          sistema de envío de mensajes por WhatsApp construido sobre la
          <strong class="text-white">API oficial de WhatsApp Business (Meta)</strong>, que permite a
          negocios en México comunicarse con sus clientes de forma legal, medible y segura.
        </p>

        <div class="mt-12 grid gap-6 md:grid-cols-2">
          <div class="glass p-8">
            <h2 class="text-xl font-semibold text-white">Nuestra misión</h2>
            <p class="mt-3 leading-relaxed text-slate-400">
              Que cualquier negocio, sin importar su tamaño, pueda usar WhatsApp como canal oficial
              de comunicación con sus clientes: con consentimiento, sin riesgos de bloqueo y con
              total trazabilidad.
            </p>
          </div>
          <div class="glass p-8">
            <h2 class="text-xl font-semibold text-white">Cómo trabajamos</h2>
            <p class="mt-3 leading-relaxed text-slate-400">
              Solo utilizamos la plataforma oficial de Meta. Cada número de destino cuenta con
              opt-in explícito y auditable, y los datos personales se tratan conforme a la
              legislación mexicana vigente (LFPDPPP).
            </p>
          </div>
        </div>

        <div class="glass-strong mt-12 p-8">
          <h2 class="text-xl font-semibold text-white">Identidad legal</h2>
          <dl class="mt-4 grid gap-x-8 gap-y-4 text-sm sm:grid-cols-2">
            <div>
              <dt class="font-medium text-slate-400">Marca comercial</dt>
              <dd class="mt-1 text-slate-200">{{ b.brandName }}</dd>
            </div>
            <div>
              <dt class="font-medium text-slate-400">Operada por</dt>
              <dd class="mt-1 text-slate-200">{{ b.legalName }} — {{ b.legalType }}</dd>
            </div>
            <div>
              <dt class="font-medium text-slate-400">Sitio web</dt>
              <dd class="mt-1 text-slate-200">{{ b.website }}</dd>
            </div>
            <div>
              <dt class="font-medium text-slate-400">Correo</dt>
              <dd class="mt-1 text-slate-200">{{ b.email }}</dd>
            </div>
          </dl>
          <p class="mt-6 text-sm text-slate-500">
            {{ b.brandName }} es una marca operada por {{ b.legalName }}.
          </p>
        </div>

        <div class="mt-12 text-center">
          <a routerLink="/contacto" class="btn-primary">Hablemos de tu proyecto</a>
        </div>
      </div>
    </section>
  `,
})
export class Nosotros {
  protected readonly b = BUSINESS;
}
