import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BUSINESS } from '../core/business';

@Component({
  selector: 'app-terminos',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="px-4 pb-16 pt-36 sm:px-6">
      <div class="mx-auto max-w-3xl">
        <h1 class="section-title">Términos y Condiciones</h1>
        <p class="mt-3 text-sm text-slate-500">Última actualización: 21 de agosto de 2026</p>

        <div class="glass-strong prose-legal mt-10 p-8 sm:p-10">
          <h2>1. Identificación</h2>
          <p>
            Este sitio web, {{ b.website }}, es operado por
            <strong class="text-white">{{ b.legalName }}</strong> ({{ b.legalType }}), bajo la marca
            comercial <strong class="text-white">{{ b.brandName }}</strong>. Contacto:
            <a [href]="'mailto:' + b.email">{{ b.email }}</a>.
          </p>

          <h2>2. Objeto</h2>
          <p>
            {{ b.brandName }} ofrece servicios de mensajería empresarial por WhatsApp mediante la API
            oficial de WhatsApp Business (Meta): campañas de difusión, notificaciones
            transaccionales, conversaciones con clientes e integraciones vía API.
          </p>

          <h2>3. Uso aceptable</h2>
          <ul>
            <li>El cliente se obliga a enviar mensajes únicamente a destinatarios que hayan otorgado consentimiento explícito (opt-in) verificable.</li>
            <li>Queda prohibido el envío de spam, contenido ilícito, engañoso o contrario a las políticas de WhatsApp Business y de Meta.</li>
            <li>El cliente es responsable de la veracidad y licitud del contenido de sus mensajes y de sus bases de datos de contactos.</li>
          </ul>

          <h2>4. Políticas de la plataforma</h2>
          <p>
            El servicio está sujeto a las políticas de WhatsApp Business Platform y de Meta,
            incluyendo la aprobación de plantillas de mensajes, límites de envío y calificación de
            calidad del número. {{ b.brandName }} no garantiza aprobaciones ni tiempos de respuesta
            que dependan de Meta.
          </p>

          <h2>5. Contratación, pagos y cancelaciones</h2>
          <p>
            Las condiciones comerciales (alcance, precios, vigencia, facturación y cancelación) se
            pactan por escrito en la propuesta o contrato correspondiente a cada cliente. En caso de
            conflicto entre dichos documentos y estos términos, prevalecerá lo pactado por escrito.
          </p>

          <h2>6. Propiedad intelectual</h2>
          <p>
            Los contenidos de este sitio (textos, diseño, logotipos y software) son propiedad de
            {{ b.legalName }} o se usan con autorización. WhatsApp y Meta son marcas de sus
            respectivos titulares; su mención no implica asociación ni patrocinio.
          </p>

          <h2>7. Limitación de responsabilidad</h2>
          <p>
            {{ b.brandName }} no será responsable por interrupciones o fallas atribuibles a terceros
            (incluyendo Meta, proveedores de conectividad o infraestructura), caso fortuito o fuerza
            mayor, ni por el uso que el cliente haga del servicio en contravención de estos términos.
          </p>

          <h2>8. Datos personales</h2>
          <p>
            El tratamiento de datos personales se rige por nuestro
            <a href="/aviso-de-privacidad">Aviso de Privacidad</a>.
          </p>

          <h2>9. Modificaciones</h2>
          <p>
            Podremos actualizar estos términos en cualquier momento. La versión vigente estará
            siempre publicada en {{ b.website }}/terminos con su fecha de actualización.
          </p>

          <h2>10. Legislación aplicable</h2>
          <p>
            Estos términos se rigen por las leyes de los Estados Unidos Mexicanos. Para cualquier
            controversia, las partes se someten a los tribunales competentes de México, renunciando a
            cualquier otro fuero.
          </p>
        </div>
      </div>
    </section>
  `,
})
export class Terminos {
  protected readonly b = BUSINESS;
}
