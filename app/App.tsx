import { Textarea } from "./core/Textarea.tsx";

export function App(
  props: { ctx?: { static: boolean }; state: { textfield: string } },
) {
  console.log("this runs");
  return (
    <>
      <h1>CMS Test (modified)</h1>
      <p>
        <Textarea
          state={props.state.textfield}
          static={props?.ctx?.static ?? true}
        />
      </p>
      <button onClick={() => console.log("button has been clicked")}>
        click me
      </button>
    </>
  );
}
