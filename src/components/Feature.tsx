import type { JSXElement } from "solid-js";

export interface Props {
  left: JSXElement;
  right: JSXElement;
  class?: string;
}

export function Feature(props: Props): JSXElement {
  return (
    <section class={`grid grid-cols-12 gap-4 py-24 ${props.class ?? ""}`}>
      <div class="col-start-2 col-span-5 flex flex-col justify-center space-y-4">
        {props.left}
      </div>
      <div class="col-start-7 col-span-5  w-full h-full flex items-center justify-center">
        {props.right}
      </div>
    </section>
  );
}
