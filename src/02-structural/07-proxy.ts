/**
 * ! Patrón Proxy
 * Este patrón se utiliza para controlar el acceso a un objeto, es decir,
 * se crea un objeto que actúa como intermediario entre el cliente y el objeto real.
 *
 * * Es útil cuando necesitamos controlar el acceso a un objeto,
 * * por ejemplo, para verificar si el cliente tiene permiso
 * * para acceder a ciertos métodos o propiedades.
 *
 * https://refactoring.guru/es/design-patterns/proxy
 *
 */

import { COLORS } from "../helpers/colors.ts";

class Player {
  name: string;
  level: number;

  constructor(name: string, level: number) {
    this.name = name;
    this.level = level;
  }
}

interface Room {
  enter(player: Player): void;
}

class SecretRoom implements Room {
  enter(player: Player): void {
    console.log(`%cBienvenido a la sala secreta, ${player.name}`, COLORS.blue);
    console.log(`%cUn gran enemigo te espera, ${player.name}`, COLORS.blue);
  }
}

// Clase Proxy
class MagicPortal implements Room {
  private room: Room;

  constructor(room: Room) {
    this.room = room;
  }

  enter(player: Player): void {
    if (player.level >= 10) {
      this.room.enter(player);
      return;
    }

    console.log(
      `%cLo siento mucho ${player.name}, tu nivel es muy bajo (${player.level})`,
      COLORS.red,
    );
  }
}

function main() {
  const player = new Player("Gaspar", 8);
  const playerTwo = new Player("Gabriel", 20);

  const room = new SecretRoom();

  new MagicPortal(room).enter(player);
  new MagicPortal(room).enter(playerTwo);
}

main();
