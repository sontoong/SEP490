import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextEditorMenuBar from "./tiptap-menubar";

export default function Tiptap(props: TextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: props.value,
    onUpdate: ({ editor }) => {
      if (props.onChange) props.onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "px-3 transition duration-300 min-h-[150px] cursor-text rounded-md border border-gray-200 border-solid   hover:ring-1 focus-within:outline-none focus-within:ring-1 ring-primary",
      },
    },
  });
  return (
    <div>
      <TextEditorMenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

type TextEditorProps = {
  value?: string;
  onChange?: (content: string) => void;
};
