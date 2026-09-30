/**
 * ! Patrón Builder:
 * Es un patrón de diseño creacional que nos permite construir objetos complejos
 * paso a paso.
 *
 * El patrón nos permite producir distintos tipos y representaciones
 * de un objeto empleando el mismo código de construcción.
 *
 * * Es útil cuando necesitamos construir un objeto complejo con muchas partes
 * * y queremos que el proceso de construcción sea independiente de las partes
 * * que lo componen.
 *
 * https://refactoring.guru/es/design-patterns/builder
 */

import { COLORS } from "../helpers/colors.ts";

class Computer {
  public cpu: string = "cpu - not defined";
  public ram: string = "ram - not defined";
  public storage: string = "storage - not defined";
  public gpu?: string = "gpu - not defined";

  displayConfiguration() {
    console.log(`Configuracion de la computadora:
      CPU: ${this.cpu}
      RAM: ${this.ram}
      Almanenamiento: ${this.storage}
      GPU: ${this.gpu}
      `);
  }
}

class ComputerBuilder {
  private computer: Computer;

  // podemos recibir la instancia o crearla dentro del constructor
  constructor() {
    this.computer = new Computer();
  }

  setCPU(cpu: string): ComputerBuilder {
    this.computer.cpu = cpu;
    return this;
  }

  setRAM(ram: string): ComputerBuilder {
    this.computer.ram = ram;
    return this;
  }

  setStorage(storage: string): ComputerBuilder {
    this.computer.storage = storage;
    return this;
  }

  setGPU(gpu: string): ComputerBuilder {
    this.computer.gpu = gpu;
    return this;
  }

  build(): Computer {
    return this.computer;
  }
}

const basicComputer: Computer = new ComputerBuilder()
  .setCPU("Ryzen 7 3700x")
  .setRAM("4GB")
  .setStorage("500 GB")
  .build();

console.log("%cComputadora basica:", COLORS.blue);
basicComputer.displayConfiguration();

const gamerComputer: Computer = new ComputerBuilder()
  .setCPU("Ryzen 7 3700x")
  .setRAM("16GB")
  .setStorage("1000 GB")
  .setGPU("RTX 5070 TI")
  .build();

console.log("%cComputadora basica:", COLORS.blue);
basicComputer.displayConfiguration();

console.log("%cComputadora basica:", COLORS.red);
gamerComputer.displayConfiguration();
