/**
 * ! Patrón Prototype:

 * Es un patrón de diseño creacional que nos permite copiar objetos existentes sin hacer
 * que el código dependa de sus clases.
 * 
 * * Es útil cuando queremos duplicar el contenido, 
 * * el título y el autor de un documento, por ejemplo o cualquier objeto complejo.
 * 
 * https://refactoring.guru/es/design-patterns/prototype
 */

import { COLORS } from "../helpers/colors.ts";

class DocumentResource {
  public title: string;
  private content: string;
  public author: string;

  constructor(title: string, content: string, author: string) {
    this.title = title;
    this.content = content;
    this.author = author;
  }

  clone(): DocumentResource {
    return new DocumentResource(this.title, this.content, this.author);
  }

  displayInfo(): void {
    console.log(`
     Title: ${this.title}
     Content: ${this.content} 
     Author: ${this.author}
    `);
  }
}

function main() {
  const document1 = new DocumentResource("Cotizacion", "500 dolares", "Gaspar");

  console.log("%cDocumento 1:", COLORS.yellow, document1);
  document1.displayInfo();

  //! Hace una copia superficial: las propiedades primitivas se copian,
  //! pero las referencias a objetos/arrays internos se mantienen.
  // const document2 = { ...document1 };

  //! Hace una copia profunda, pero no conserva
  //! el prototipo de la clase DocumentResource.
  // const document2 = structuredClone(document1);

  // * Aplicando el patron Prototype
  const document2 = document1.clone();

  console.log("%cDocumento 2:", COLORS.blue, document2);
  document2.displayInfo();
}

main();
