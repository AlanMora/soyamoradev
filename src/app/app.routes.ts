import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home').then((m) => m.Home),
    title: 'SoyAmoreDev — Mensajería por WhatsApp con la API oficial de Meta',
  },
  {
    path: 'nosotros',
    loadComponent: () => import('./pages/nosotros').then((m) => m.Nosotros),
    title: 'Nosotros — SoyAmoreDev',
  },
  {
    path: 'contacto',
    loadComponent: () => import('./pages/contacto').then((m) => m.Contacto),
    title: 'Contacto — SoyAmoreDev',
  },
  {
    path: 'aviso-de-privacidad',
    loadComponent: () => import('./pages/aviso-privacidad').then((m) => m.AvisoPrivacidad),
    title: 'Aviso de Privacidad — SoyAmoreDev',
  },
  {
    path: 'terminos',
    loadComponent: () => import('./pages/terminos').then((m) => m.Terminos),
    title: 'Términos y Condiciones — SoyAmoreDev',
  },
  { path: '**', redirectTo: '' },
];
