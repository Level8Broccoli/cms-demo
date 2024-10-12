import type { Signal } from "@preact/signals";
import { Textarea } from "./core/Textarea.tsx";

export type AppState = {
  text: string;
};

export function App(
  props: {
    ctx?: {
      static: boolean;
      save: () => void;
    };
    state: Signal<AppState>;
  },
) {
  console.log("this runs");
  return (
    <>
      <h1>Kemet CMS</h1>
      <p>
        <Textarea
          state={props.state.value.text}
          static={props.ctx?.static ?? true}
          onUpdate={(s) => (props.state.value = { text: s })}
        />
      </p>
      {props.ctx?.static === false
        ? (
          <button onClick={props.ctx?.save}>
            Save
          </button>
        )
        : null}
    </>
  );
}
