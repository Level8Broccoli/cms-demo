import type { JSX } from "preact/jsx-runtime";
import { createRef } from "preact";
import { useEffect } from "preact/hooks";
import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";

export function Textarea(
  props: { state: string; static: boolean; onUpdate?: (s: string) => void },
): JSX.Element {
  const editorRef = createRef<HTMLDivElement>();

  useEffect(() => {
    new Editor({
      element: editorRef.current ?? undefined,
      content: props.state,
      extensions: [StarterKit],
      onUpdate: (e) => {
        props.onUpdate?.(e.editor.getText());
      },
    });
  }, [props.state]);

  if (props.static) {
    return <>{props.state}</>;
  }
  return <div ref={editorRef} />;
}
