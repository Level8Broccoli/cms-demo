import type { JSX } from "preact/jsx-runtime";

export function Textarea(
  props: { state: string; static: boolean },
): JSX.Element {
  if (props.static) {
    return <>{props.state}</>;
  }
  return <textarea value={props.state} />;
}
