import { COLORS } from "../helpers/colors.ts";

interface Notification {
  send(): void;
}

class EmailNotification implements Notification {
  constructor(private readonly email: string) {}

  send(): void {
    console.log(
      `Enviando notificación vía email a ${this.email}`,
      COLORS.yellow,
    );
  }
}

class WhatsappNotification implements Notification {
  constructor(private readonly phoneNumber: string) {}

  send(): void {
    console.log(
      `Enviando notificación vía WhatsApp al número ${this.phoneNumber}`,
      COLORS.green,
    );
  }
}

abstract class NotificationFactory {
  protected abstract createNotification(): Notification;

  generateNotification(): void {
    const notification = this.createNotification();
    notification.send();
  }
}

class EmailNotificationFactory extends NotificationFactory {
  constructor(private readonly email: string) {
    super();
  }

  protected createNotification(): Notification {
    return new EmailNotification(this.email);
  }
}

class WhatsappNotificationFactory extends NotificationFactory {
  constructor(private readonly phoneNumber: string) {
    super();
  }

  protected createNotification(): Notification {
    return new WhatsappNotification(this.phoneNumber);
  }
}

function main(): void {
  let notification: NotificationFactory;

  const notificationType = prompt(
    "%c¿Qué tipo de medio desea usar para notificar? (email/whatsapp)",
    COLORS.purple,
  );

  switch (notificationType) {
    case "email": {
      const email = prompt("%c¿Cuál es el email del receptor?", COLORS.cyan);

      if (!email) {
        throw new Error("El email es requerido");
      }

      notification = new EmailNotificationFactory(email);
      break;
    }

    case "whatsapp": {
      const phoneNumber = prompt(
        "%c¿Cuál es el número del receptor?",
        COLORS.orange,
      );

      if (!phoneNumber) {
        throw new Error("El número es requerido");
      }

      notification = new WhatsappNotificationFactory(phoneNumber);
      break;
    }

    default:
      throw new Error("Tipo de notificación no válido");
  }

  notification.generateNotification();
}

main();
