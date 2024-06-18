declare global {
  declare module "solid-js" {
    namespace JSX {
      /** Extend directives for `use-*` syntax. */
      interface Directives {
        draggable: (node: HTMLFormElement) => void;
      }
    }
  }
}

export {};
