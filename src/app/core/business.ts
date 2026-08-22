/**
 * Datos de identidad del negocio.
 * IMPORTANTE (Meta Business Verification): estos datos deben coincidir
 * exactamente con la entidad legal (Constancia de Situación Fiscal).
 */
export const BUSINESS = {
  brandName: 'SoyAmoraDev',
  legalName: 'Alan Eduardo Vázquez Mora',
  legalType: 'Persona Física con Actividad Empresarial',
  email: 'hola@soyamoradev.com',
  phone: '+52 000 000 0000', // TODO: reemplazar con teléfono real registrado ante Meta
  address: 'Ciudad de México, México', // TODO: domicilio fiscal completo
  website: 'https://soyamoradev.com',
  description:
    'SoyAmoraDev ofrece un sistema de envío de mensajes por WhatsApp a través de la API oficial de WhatsApp Business (Meta), para empresas en México.',
  privacyNoticeVersion: '1.0 — 21 de agosto de 2026',
  whatsappOptInText:
    'Acepto recibir comunicaciones de SoyAmoraDev mediante WhatsApp en el número proporcionado. Puedo revocar este consentimiento en cualquier momento escribiendo a hola@soyamoradev.com.',
  whatsappOptInVersion: 'v1.0-2026-08-21',
} as const;
