/**
 * ! Inmutabilidad con copia
 * Aunque la inmutabilidad es una buena práctica, no siempre es posible.
 * En estos casos, se puede hacer una copia del objeto y modificar la copia.
 *
 *  * Es útil para mantener un historial de estados en aplicaciones interactivas.
 *
 */

import { COLORS } from "../helpers/colors.ts";

class CodeEditorState {
  readonly content: string;
  readonly cursorPosition: number;
  readonly unsavedChanges: boolean;

  constructor(
    content: string,
    cursorPosition: number,
    unsavedChanges: boolean,
  ) {
    this.content = content;
    this.cursorPosition = cursorPosition;
    this.unsavedChanges = unsavedChanges;
  }

  copyWith({
    content,
    cursorPosition,
    unsavedChanges,
  }: Partial<CodeEditorState>): CodeEditorState {
    return new CodeEditorState(
      content ?? this.content,
      cursorPosition ?? this.cursorPosition,
      unsavedChanges ?? this.unsavedChanges,
    );
  }

  displayState() {
    console.log("%cEstado del editor:", COLORS.green);
    console.log(`
      Contenido: ${this.content}
      Cursor Pos: ${this.cursorPosition}
      Unsaved changes: ${this.unsavedChanges}
    `);
  }
}

class CodeEditorHistory {
  private history: CodeEditorState[] = [];
  private currentIndex: number = -1;

  save(state: CodeEditorState): void {
    if (this.currentIndex < this.history.length - 1) {
      this.history = this.history.splice(0, this.currentIndex + 1);
    }

    this.history.push(state);
    this.currentIndex++;
  }

  redo(): CodeEditorState | null {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      return this.history[this.currentIndex];
    }

    return null;
  }

  undo(): CodeEditorState | null {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      return this.history[this.currentIndex];
    }

    return null;
  }
}

function main() {
  const history = new CodeEditorHistory();

  let editorState = new CodeEditorState('console.log("Hola Mundo");', 2, false);
  console.log("%cEstado inicial", COLORS.blue);
  history.save(editorState);
  editorState.displayState();

  editorState = editorState.copyWith({
    content: "console.log('Hola Mundo desde Chile');",
    cursorPosition: 3,
    unsavedChanges: true,
  });
  history.save(editorState);
  console.log("%cDespues del primer cambio", COLORS.yellow);
  editorState.displayState();

  console.log("%cDespues de mover el cursor", COLORS.pink);
  editorState = editorState.copyWith({
    cursorPosition: 5,
  });
  history.save(editorState);
  editorState.displayState();

  console.log("%cDespues del undo", COLORS.cyan);
  editorState = history.undo()!;
  editorState.displayState();

  console.log("%cDespues del redo", COLORS.brown);
  editorState = history.redo()!;
  editorState.displayState();
}

main();
