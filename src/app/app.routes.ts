import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home').then((m) => m.Home),
    title: 'SoyAmoraDev — Mensajería por WhatsApp con la API oficial de Meta',
  },
  {
    path: 'nosotros',
    loadComponent: () => import('./pages/nosotros').then((m) => m.Nosotros),
    title: 'Nosotros — SoyAmoraDev',
  },
  {
    path: 'contacto',
    loadComponent: () => import('./pages/contacto').then((m) => m.Contacto),
    title: 'Contacto — SoyAmoraDev',
  },
  {
    path: 'aviso-de-privacidad',
    loadComponent: () => import('./pages/aviso-privacidad').then((m) => m.AvisoPrivacidad),
    title: 'Aviso de Privacidad — SoyAmoraDev',
  },
  {
    path: 'terminos',
    loadComponent: () => import('./pages/terminos').then((m) => m.Terminos),
    title: 'Términos y Condiciones — SoyAmoraDev',
  },
  { path: '**', redirectTo: '' },
];
