/**
 * ! Patrón Adapter
 *  Permite que objetos con interfaces incompatibles trabajen juntos, también es muy
 *  util para utilizar librerías de terceros en nuestra aplicación sin depender
 *  directamente de ellas.
 *
 * * Es útil cuando se quiere reutilizar una clase que no tiene la interfaz que
 * * necesitamos o cuando queremos crear una capa de abstracción para una librería
 * * de terceros.
 *
 * https://refactoring.guru/es/design-patterns/adapter
 */

import { DenoLoggerAdapter } from "./adapter/deno-logger.adapter.ts";
// import { LocalLoggerAdapter } from "./adapter/local-logger.adapter.ts"

const logger = new DenoLoggerAdapter("01-adapter.ts");

logger.writeLog("Un log normal");
logger.writeWarning("Una alerta normal");
logger.writeError("Algo malo salio");
