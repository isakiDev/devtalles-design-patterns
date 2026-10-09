/**
 * ! Patrón Flyweight
 * Es un patrón de diseño estructural que nos permite usar objetos compartidos
 * para soportar eficientemente grandes cantidades de objetos.
 *
 * * Es útil cuando necesitamos una gran cantidad de objetos y queremos reducir
 * * la cantidad de memoria que utilizan.
 *
 * https://refactoring.guru/es/design-patterns/flyweight
 */

import { COLORS } from "../helpers/colors.ts";

interface Location {
  display(coordinates: { x: number; y: number }): void;
}

// Flyweight
class LocationMark implements Location {
  private type: string;
  private iconImage: string;

  constructor(type: string, image: string) {
    this.type = type;
    this.iconImage = image;
  }

  display(coordinates: { x: number; y: number }): void {
    console.log(
      `Coords: ${this.type} en ${coordinates.x}, ${coordinates.y} con icono %c[${this.iconImage}]`,
      COLORS.green,
    );
  }
}

// Fabrica de Flyweights
class LocationFactory {
  private icons: Record<string, LocationMark> = {};

  getLocationMark(type: string): LocationMark {
    if (!this.icons[type]) {
      console.log(
        `%cCreando una nueva instacia del icono: ${type}`,
        COLORS.red,
      );
      const iconImage = `imagen_de_${type}.png`;
      this.icons[type] = new LocationMark(type, iconImage);
    }

    return this.icons[type];
  }
}

class MapLocation {
  private coordinates: { x: number; y: number };
  private icon: LocationMark;

  constructor(x: number, y: number, icon: LocationMark) {
    this.coordinates = { x, y };
    this.icon = icon;
  }

  display() {
    this.icon.display(this.coordinates);
  }
}

function main() {
  const factory = new LocationFactory();

  const locations = [
    new MapLocation(10, 20, factory.getLocationMark("hospital")),
    new MapLocation(20, 50, factory.getLocationMark("hospital")),

    new MapLocation(15, 20, factory.getLocationMark("parque")),
    new MapLocation(20, 30, factory.getLocationMark("parque")),
    new MapLocation(30, 50, factory.getLocationMark("parque")),
  ];

  locations.forEach((location) => location.display());
}

main();
