import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BUSINESS } from '../core/business';

@Component({
  selector: 'app-aviso-privacidad',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="px-4 pb-16 pt-36 sm:px-6">
      <div class="mx-auto max-w-3xl">
        <h1 class="section-title">Aviso de Privacidad Integral</h1>
        <p class="mt-3 text-sm text-slate-500">Versión {{ b.privacyNoticeVersion }}</p>

        <div class="glass-strong prose-legal mt-10 p-8 sm:p-10">
          <h2>1. Identidad y domicilio del responsable</h2>
          <p>
            <strong class="text-white">{{ b.legalName }}</strong> ({{ b.legalType }}), quien opera
            la marca comercial <strong class="text-white">{{ b.brandName }}</strong>, con domicilio
            en {{ b.address }}, y correo electrónico de contacto
            <a [href]="'mailto:' + b.email">{{ b.email }}</a>, es el responsable del tratamiento de
            sus datos personales, conforme a la Ley Federal de Protección de Datos Personales en
            Posesión de los Particulares (LFPDPPP) y su normatividad secundaria.
          </p>

          <h2>2. Datos personales que tratamos</h2>
          <p>Podemos recabar, directamente de usted a través de nuestros formularios web o por contacto directo, los siguientes datos personales:</p>
          <ul>
            <li>Nombre completo.</li>
            <li>Correo electrónico.</li>
            <li>Número telefónico (incluyendo número de WhatsApp).</li>
            <li>Contenido de los mensajes que nos envía.</li>
            <li>Datos técnicos de la sesión (fecha, hora y origen del registro) asociados al consentimiento otorgado.</li>
          </ul>
          <p>No recabamos datos personales sensibles.</p>

          <h2>3. Finalidades del tratamiento</h2>
          <h3>Finalidades primarias (necesarias)</h3>
          <ul>
            <li>Atender sus solicitudes de información y contacto.</li>
            <li>Prestar los servicios de mensajería contratados.</li>
            <li>Acreditar y conservar el registro del consentimiento otorgado para el envío de mensajes por WhatsApp.</li>
            <li>Cumplir obligaciones legales aplicables.</li>
          </ul>
          <h3>Finalidades secundarias (requieren su consentimiento)</h3>
          <ul>
            <li>Envío de comunicaciones comerciales, promocionales e informativas mediante WhatsApp, únicamente cuando usted haya aceptado expresamente la casilla de consentimiento correspondiente.</li>
          </ul>
          <p>
            Si no desea que sus datos se traten para las finalidades secundarias, puede manifestarlo
            escribiendo a <a [href]="'mailto:' + b.email">{{ b.email }}</a> en cualquier momento, sin
            que ello afecte la atención de su solicitud principal.
          </p>

          <h2>4. Consentimiento para comunicaciones por WhatsApp</h2>
          <p>
            El envío de mensajes por WhatsApp se realiza exclusivamente mediante la API oficial de
            WhatsApp Business (Meta) y únicamente a personas que hayan otorgado su consentimiento
            explícito (opt-in). Conservamos como evidencia: el número proporcionado, la fecha y hora
            del consentimiento, el origen (página o medio) y la versión del texto aceptado. Usted
            puede revocar este consentimiento en cualquier momento (ver sección 6).
          </p>

          <h2>5. Limitación de uso o divulgación</h2>
          <p>
            Usted puede limitar el uso o divulgación de sus datos personales enviando una solicitud a
            <a [href]="'mailto:' + b.email">{{ b.email }}</a>, indicando el medio de contacto que
            desea limitar (correo, teléfono o WhatsApp). También puede solicitar su inscripción a
            listados internos de exclusión.
          </p>

          <h2>6. Derechos ARCO y revocación del consentimiento</h2>
          <p>
            Usted tiene derecho a Acceder, Rectificar y Cancelar sus datos personales, así como a
            Oponerse a su tratamiento y a revocar el consentimiento otorgado. Para ejercer estos
            derechos, envíe una solicitud a <a [href]="'mailto:' + b.email">{{ b.email }}</a> con:
          </p>
          <ul>
            <li>Su nombre completo y medio para comunicarle la respuesta.</li>
            <li>Documento que acredite su identidad (o de su representante legal).</li>
            <li>Descripción clara de los datos y del derecho que desea ejercer.</li>
          </ul>
          <p>
            Responderemos en los plazos previstos por la LFPDPPP. La revocación del consentimiento
            para WhatsApp surtirá efectos en un plazo máximo de 5 días hábiles a partir de su
            solicitud.
          </p>

          <h2>7. Transferencias de datos</h2>
          <p>
            No transferimos sus datos personales a terceros sin su consentimiento, salvo los
            supuestos previstos en la ley. Para la prestación del servicio utilizamos proveedores
            tecnológicos (por ejemplo, Meta Platforms y proveedores de infraestructura de
            mensajería) que actúan como encargados del tratamiento conforme a sus propios términos y
            medidas de seguridad.
          </p>

          <h2>8. Cambios al aviso de privacidad</h2>
          <p>
            Cualquier modificación a este aviso se publicará en
            <strong class="text-white">{{ b.website }}/aviso-de-privacidad</strong>, indicando la
            versión y fecha de actualización. Le recomendamos consultarlo periódicamente.
          </p>

          <h2>9. Autoridad</h2>
          <p>
            Si considera que su derecho a la protección de datos ha sido vulnerado, puede acudir a la
            autoridad competente en materia de protección de datos personales en México.
          </p>
        </div>
      </div>
    </section>
  `,
})
export class AvisoPrivacidad {
  protected readonly b = BUSINESS;
}
