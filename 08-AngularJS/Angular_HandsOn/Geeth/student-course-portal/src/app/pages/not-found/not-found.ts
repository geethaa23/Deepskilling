import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="not-found">
      <div class="container">
        <h1>Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
      </div>
    </section>
  `,
  styles: [
    `
      .not-found { padding: 2rem 1rem; text-align: center; }
      .not-found .container { max-width: 700px; margin: 0 auto; background: white; padding: 2rem; border-radius: 18px; box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08); }
    `,
  ],
})
export class NotFound {}
