import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

// NotificationService is provided at this component level, so every app-notification instance gets its own
// NotificationService instance rather than sharing the root singleton. This is useful for isolated,
// component-scoped state that should not be visible globally.
@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  providers: [NotificationService],
  template: `
    <section class="notification-card">
      <h3>Notification Panel</h3>
      <button type="button" (click)="notifySample()">Notify</button>
      <button type="button" (click)="clear()" class="secondary">Clear</button>
      <ul>
        <li *ngFor="let message of notificationService.messages">{{ message }}</li>
      </ul>
    </section>
  `,
  styles: [
    `
      .notification-card { padding: 1rem; border: 1px solid #cbd5e1; border-radius: 12px; background: #f8fafc; }
      .notification-card h3 { margin-top: 0; }
      .notification-card button { margin-right: 0.75rem; padding: 0.6rem 0.95rem; border: none; border-radius: 10px; background: #2563eb; color: white; cursor: pointer; }
      .notification-card button.secondary { background: #64748b; }
      ul { margin-top: 0.75rem; padding-left: 1.25rem; }
    `,
  ],
})
export class Notification {
  constructor(public notificationService: NotificationService) {}

  notifySample(): void {
    this.notificationService.notify('New message at ' + new Date().toLocaleTimeString());
  }

  clear(): void {
    this.notificationService.clear();
  }
}
