import { Textarea } from "./core/Textarea.tsx";

export function App(
  props: {
    ctx?: {
      static: boolean;
      updateTextfield: (s: string) => void;
      save: () => void;
    };
    state: { textfield: string };
  },
) {
  console.log("this runs");
  return (
    <>
      <h1>CMS Test</h1>
      <p>
        <Textarea
          state={props.state.textfield}
          static={props.ctx?.static ?? true}
          onUpdate={props.ctx?.updateTextfield}
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
