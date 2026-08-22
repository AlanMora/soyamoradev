import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BUSINESS } from '../core/business';

/**
 * Registro de consentimiento WhatsApp (opt-in).
 * WhatsApp/Twilio exigen opt-in explícito antes de enviar mensajes:
 * se conserva número, fecha/hora, origen y versión del texto aceptado.
 */
interface WhatsAppConsentRecord {
  name: string;
  email: string;
  phone: string;
  message: string;
  whatsappOptIn: boolean;
  consentTextVersion: string;
  consentTimestamp: string;
  consentSource: string;
}

@Component({
  selector: 'app-contacto',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <section class="px-4 pb-16 pt-36 sm:px-6">
      <div class="mx-auto max-w-6xl">
        <h1 class="section-title">Contacto</h1>
        <p class="mt-4 max-w-2xl text-slate-400">
          ¿Quieres enviar mensajes por WhatsApp con la API oficial? Escríbenos y te respondemos en
          menos de 24 horas hábiles.
        </p>

        <div class="mt-12 grid gap-8 lg:grid-cols-5">
          <!-- Datos del responsable -->
          <aside class="space-y-6 lg:col-span-2">
            <div class="glass p-8">
              <h2 class="text-lg font-semibold text-white">Datos del negocio</h2>
              <dl class="mt-4 space-y-4 text-sm">
                <div>
                  <dt class="font-medium text-slate-400">Marca comercial</dt>
                  <dd class="mt-1 text-slate-200">{{ b.brandName }}</dd>
                </div>
                <div>
                  <dt class="font-medium text-slate-400">Responsable</dt>
                  <dd class="mt-1 text-slate-200">{{ b.legalName }}</dd>
                </div>
                <div>
                  <dt class="font-medium text-slate-400">Correo</dt>
                  <dd class="mt-1">
                    <a [href]="'mailto:' + b.email" class="text-brand-400 hover:underline">{{ b.email }}</a>
                  </dd>
                </div>
                <div>
                  <dt class="font-medium text-slate-400">Teléfono</dt>
                  <dd class="mt-1 text-slate-200">{{ b.phone }}</dd>
                </div>
                <div>
                  <dt class="font-medium text-slate-400">Ubicación</dt>
                  <dd class="mt-1 text-slate-200">{{ b.address }}</dd>
                </div>
              </dl>
            </div>
            <div class="glass p-8 text-sm leading-relaxed text-slate-400">
              Tus datos se tratan conforme a nuestro
              <a routerLink="/aviso-de-privacidad" class="text-brand-400 hover:underline">Aviso de Privacidad</a>.
            </div>
          </aside>

          <!-- Formulario -->
          <div class="glass-strong p-8 lg:col-span-3" id="whatsapp">
            @if (sent()) {
              <div class="flex flex-col items-center py-12 text-center" role="status">
                <span class="flex h-14 w-14 items-center justify-center rounded-full bg-brand-500/20 text-2xl" aria-hidden="true">✓</span>
                <h2 class="mt-4 text-xl font-semibold text-white">¡Mensaje registrado!</h2>
                <p class="mt-2 max-w-sm text-slate-400">
                  Gracias por escribirnos. Te contactaremos en breve al correo o número que proporcionaste.
                </p>
                <button type="button" class="btn-ghost mt-8" (click)="reset()">Enviar otro mensaje</button>
              </div>
            } @else {
              <h2 class="text-lg font-semibold text-white">Escríbenos</h2>
              <form [formGroup]="form" (ngSubmit)="submit()" class="mt-6 space-y-5" novalidate>
                <div>
                  <label for="name" class="mb-1.5 block text-sm font-medium text-slate-300">Nombre completo *</label>
                  <input id="name" type="text" formControlName="name" autocomplete="name" class="glass-input" placeholder="Tu nombre" />
                  @if (invalid('name')) {
                    <p class="mt-1.5 text-sm text-red-400">Ingresa tu nombre.</p>
                  }
                </div>

                <div class="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label for="email" class="mb-1.5 block text-sm font-medium text-slate-300">Correo electrónico *</label>
                    <input id="email" type="email" formControlName="email" autocomplete="email" class="glass-input" placeholder="tu@correo.com" />
                    @if (invalid('email')) {
                      <p class="mt-1.5 text-sm text-red-400">Ingresa un correo válido.</p>
                    }
                  </div>
                  <div>
                    <label for="phone" class="mb-1.5 block text-sm font-medium text-slate-300">Teléfono (WhatsApp) *</label>
                    <input id="phone" type="tel" formControlName="phone" autocomplete="tel" class="glass-input" placeholder="+52 55 1234 5678" />
                    @if (invalid('phone')) {
                      <p class="mt-1.5 text-sm text-red-400">Ingresa un teléfono válido (10 a 15 dígitos).</p>
                    }
                  </div>
                </div>

                <div>
                  <label for="message" class="mb-1.5 block text-sm font-medium text-slate-300">Mensaje *</label>
                  <textarea id="message" rows="4" formControlName="message" class="glass-input resize-none" placeholder="Cuéntanos qué necesitas..."></textarea>
                  @if (invalid('message')) {
                    <p class="mt-1.5 text-sm text-red-400">Escribe un mensaje (mínimo 10 caracteres).</p>
                  }
                </div>

                <!-- Opt-in WhatsApp: consentimiento independiente, NO pre-marcado -->
                <div class="glass !rounded-xl p-4">
                  <label class="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      formControlName="whatsappOptIn"
                      class="mt-1 h-4 w-4 shrink-0 rounded border-white/30 bg-white/10 accent-brand-500"
                    />
                    <span class="text-sm leading-relaxed text-slate-300">{{ b.whatsappOptInText }}</span>
                  </label>
                </div>

                <div>
                  <label class="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      formControlName="privacyAccepted"
                      class="mt-1 h-4 w-4 shrink-0 rounded border-white/30 bg-white/10 accent-brand-500"
                    />
                    <span class="text-sm leading-relaxed text-slate-300">
                      He leído y acepto el
                      <a routerLink="/aviso-de-privacidad" class="text-brand-400 hover:underline">Aviso de Privacidad</a>. *
                    </span>
                  </label>
                  @if (invalid('privacyAccepted')) {
                    <p class="mt-1.5 text-sm text-red-400">Debes aceptar el Aviso de Privacidad.</p>
                  }
                </div>

                <button type="submit" class="btn-primary w-full" [disabled]="form.invalid && form.touched">
                  Enviar mensaje
                </button>
                <p class="text-center text-xs text-slate-500">
                  Aviso simplificado: {{ b.legalName }} tratará tus datos para atender tu solicitud y,
                  solo si lo autorizas, contactarte por WhatsApp. Consulta el aviso integral en
                  <a routerLink="/aviso-de-privacidad" class="text-brand-400 hover:underline">/aviso-de-privacidad</a>.
                </p>
              </form>
            }
          </div>
        </div>
      </div>
    </section>
  `,
})
export class Contacto {
  private readonly fb = inject(FormBuilder);
  protected readonly b = BUSINESS;
  protected readonly sent = signal(false);

  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s-]{10,15}$/)]],
    message: ['', [Validators.required, Validators.minLength(10)]],
    whatsappOptIn: [false], // opcional: consentimiento independiente para WhatsApp
    privacyAccepted: [false, [Validators.requiredTrue]],
  });

  protected invalid(control: string): boolean {
    const c = this.form.get(control);
    return !!c && c.invalid && (c.dirty || c.touched);
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    const record: WhatsAppConsentRecord = {
      name: v.name,
      email: v.email,
      phone: v.phone,
      message: v.message,
      whatsappOptIn: v.whatsappOptIn,
      consentTextVersion: BUSINESS.whatsappOptInVersion,
      consentTimestamp: new Date().toISOString(),
      consentSource: 'web:soyamoradev.com/contacto',
    };
    // TODO: enviar `record` al backend para persistir el consentimiento
    // (número, fecha/hora, origen, versión del texto e IP/session del lado servidor).
    console.info('[consent-record]', record);
    this.sent.set(true);
  }

  protected reset(): void {
    this.form.reset();
    this.sent.set(false);
  }
}
