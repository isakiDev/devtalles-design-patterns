/**
 * ! Patrón Bridge
 * Este patrón nos permite desacoplar una abstracción de su implementación,
 * de tal forma que ambas puedan variar independientemente.
 *
 * * Es útil cuando se tienen múltiples implementaciones de una abstracción
 * * Se puede utilizar para separar la lógica de negocio de la lógica de presentación
 * * Se puede utilizar para separar la lógica de la interfaz de usuario también.
 *
 */

import { COLORS } from "../helpers/colors.ts";

// 1. Interfaz NotificationChannel
// Define el método `send`, que cada canal de comunicación implementará.
interface NotificationChannel {
  send(message: string): void;
}

// 2. Implementaciones de Canales de Comunicación

class EmailChannel implements NotificationChannel {
  send(message: string): void {
    console.log(`Enviando correo electrónico: ${message}`);
  }
}

class SMSChannel implements NotificationChannel {
  send(message: string): void {
    console.log(`Enviando SMS: ${message}`);
  }
}

class PushNotificationChannel implements NotificationChannel {
  send(message: string): void {
    console.log(`Enviando Push: ${message}`);
  }
}

// 3. Clase Abstracta Notification
// Define la propiedad `channel` y el método `notify`

abstract class Notification {
  protected channels: NotificationChannel[];

  constructor(channels: NotificationChannel[]) {
    this.channels = channels;
  }

  abstract notify(message: string): void;
  abstract setChannel(channel: NotificationChannel): void;
}

// 4. Clases Concretas de Notificaciones

class AlertNotification extends Notification {
  notify(message: string): void {
    console.log("\n%cNotificación de Alerta:", COLORS.red);
    this.channels.forEach((channel) => channel.send(message));
  }

  setChannel(channel: NotificationChannel): void {
    this.channels.push(channel);
  }
}

class ReminderNotification extends Notification {
  notify(message: string): void {
    console.log("\n%cNotificación de Recordatorio:", COLORS.blue);
    this.channels.forEach((channel) => channel.send(message));
  }

  setChannel(channel: NotificationChannel): void {
    this.channels.push(channel);
  }
}

class PushNotification extends Notification {
  override notify(message: string): void {
    console.log("\n%cNotificación de Push:", COLORS.green);
    this.channels.forEach((channel) => channel.send(message));
  }

  override setChannel(channel: NotificationChannel): void {
    this.channels.push(channel);
  }
}

// 5. Código Cliente para Probar el Bridge
// Deben de implementar todo lo que haga falta en las clases anteriores
function main() {
  const channels: NotificationChannel[] = [
    new EmailChannel(),
    new SMSChannel(),
    new PushNotificationChannel(),
  ];

  const alert = new AlertNotification(channels);
  alert.notify("Se ha detectado un acceso no autorizado.");
}

main();
