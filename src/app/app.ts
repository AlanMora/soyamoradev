import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header';
import { Footer } from './layout/footer';
import { AvatarWidget } from './layout/avatar-widget';
import { Background } from './layout/background';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, Header, Footer, AvatarWidget, Background],
  template: `
    <app-background />
    <app-header />
    <main>
      <router-outlet />
    </main>
    <app-footer />
    <app-avatar-widget />
  `,
})
export class App {}
