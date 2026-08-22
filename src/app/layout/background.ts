import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  viewChild,
} from '@angular/core';

/**
 * Fondo animado: red de partículas conectadas (estética IA/red neuronal)
 * sobre orbes de luz difuminados. Solo corre en navegador (SSR-safe) y
 * respeta prefers-reduced-motion.
 */
@Component({
  selector: 'app-background',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <!-- Orbes de luz -->
      <div class="orb absolute -top-32 right-[-10%] h-[34rem] w-[34rem] rounded-full bg-brand-500/20"></div>
      <div class="orb-slow absolute left-[-12%] top-1/3 h-[28rem] w-[28rem] rounded-full bg-sky-500/15"></div>
      <div class="orb absolute bottom-[-15%] left-1/3 h-[30rem] w-[30rem] rounded-full bg-emerald-400/10"></div>

      <!-- Rejilla sutil -->
      <div class="grid-overlay absolute inset-0"></div>

      <!-- Red de partículas -->
      <canvas #canvas class="absolute inset-0 h-full w-full opacity-70"></canvas>

      <!-- Viñeta para legibilidad -->
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(11,18,32,0.55)_100%)]"></div>
    </div>
  `,
  styles: `
    .orb,
    .orb-slow {
      filter: blur(90px);
      will-change: transform;
    }
    @media (prefers-reduced-motion: no-preference) {
      .orb { animation: orbDrift 18s ease-in-out infinite alternate; }
      .orb-slow { animation: orbDrift 26s ease-in-out infinite alternate-reverse; }
    }
    @keyframes orbDrift {
      from { transform: translate3d(0, 0, 0) scale(1); }
      to { transform: translate3d(60px, -40px, 0) scale(1.15); }
    }
    .grid-overlay {
      background-image:
        linear-gradient(rgba(148, 163, 184, 0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(148, 163, 184, 0.05) 1px, transparent 1px);
      background-size: 56px 56px;
      mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
      -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
    }
  `,
})
export class Background {
  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => this.initParticles());
  }

  private initParticles(): void {
    const canvas = this.canvasRef().nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    interface P {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
    }
    let particles: P[] = [];
    let width = 0;
    let height = 0;
    let raf = 0;
    const mouse = { x: -9999, y: -9999 };
    const LINK_DIST = 130;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(90, Math.floor((width * height) / 22000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.6,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // atracción sutil hacia el cursor
        const dxm = mouse.x - p.x;
        const dym = mouse.y - p.y;
        const dm = Math.hypot(dxm, dym);
        if (dm < 180 && dm > 0.001) {
          p.x += (dxm / dm) * 0.25;
          p.y += (dym / dm) * 0.25;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(37, 211, 102, 0.55)';
        ctx.fill();
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.hypot(dx, dy);
          if (d < LINK_DIST) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(94, 234, 212, ${(1 - d / LINK_DIST) * 0.18})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };

    const onMouse = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    if (reduced) {
      // una sola pasada estática, sin animación
      draw();
      cancelAnimationFrame(raf);
    } else {
      window.addEventListener('mousemove', onMouse, { passive: true });
      window.addEventListener('mouseleave', onLeave, { passive: true });
      raf = requestAnimationFrame(draw);
    }

    this.destroyRef.onDestroy(() => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('mouseleave', onLeave);
    });
  }
}
