/**
 * ! Abstract Factory:
 * Es un patrón de diseño que permite crear familias de objetos relacionados
 * sin especificar sus clases concretas.
 *
 * En lugar de crear objetos individuales directamente,
 * creamos fábricas que producen un conjunto de objetos relacionados.
 *
 * * Es útil cuando necesitas crear objetos que son parte de una familia
 * * y quieres asegurarte de que estos objetos se complementen entre sí.
 *
 * https://refactoring.guru/es/design-patterns/abstract-factory
 */

/**
 *  El propósito del Abstract Factory es crear familias de objetos relacionados
 *  (en este caso, hamburguesas y bebidas) sin especificar las clases concretas
 *  de cada uno de esos objetos en el código principal.
 */

import { COLORS } from "../helpers/colors.ts";

interface Hamburger {
  prepare(): void;
}

interface Drink {
  pour(): void;
}

class ChickenHamburger implements Hamburger {
  prepare(): void {
    console.log("Preparando hamburgesa de pollo");
  }
}

class BeefHamburger implements Hamburger {
  prepare(): void {
    console.log("Preparando hamburgesa de carne");
  }
}

class Water implements Drink {
  pour(): void {
    console.log("Sirviendo un vaso de agua");
  }
}

class Soda implements Drink {
  pour(): void {
    console.log("Sirviendo un vaso de soda");
  }
}

interface RestaurantFactory {
  createHamburger(): Hamburger;
  createDrink(): Drink;
}

class FastFoodRestaurantFactory implements RestaurantFactory {
  createHamburger(): Hamburger {
    return new BeefHamburger();
  }

  createDrink(): Drink {
    return new Soda();
  }
}

class HealthyFoodRestaurantFactory implements RestaurantFactory {
  createHamburger(): Hamburger {
    return new ChickenHamburger();
  }

  createDrink(): Drink {
    return new Water();
  }
}

function main(factory: RestaurantFactory) {
  const hamburger = factory.createHamburger();
  const drink = factory.createDrink();

  hamburger.prepare();
  drink.pour();
}

console.log("%cPedido del menu regular:", COLORS.green);
main(new FastFoodRestaurantFactory());

console.log("%cPedido del menu saludable:", COLORS.yellow);
main(new HealthyFoodRestaurantFactory());
