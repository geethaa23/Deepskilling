import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-courses-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <section class="courses-layout">
      <div class="container">
        <router-outlet></router-outlet>
      </div>
    </section>
  `,
  styles: [
    `
      .courses-layout { padding: 2rem 1rem; }
      .container { max-width: 1200px; margin: 0 auto; }
    `,
  ],
})
export class CoursesLayout {}
