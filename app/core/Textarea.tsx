import type { JSX } from "preact/jsx-runtime";

export function Textarea(
  props: { state: string; static: boolean; onUpdate?: (s: string) => void },
): JSX.Element {
  if (props.static) {
    return <>{props.state}</>;
  }
  return (
    <textarea
      value={props.state}
      onInput={(e) => props.onUpdate?.((e.target as HTMLTextAreaElement).value)}
    />
  );
}
