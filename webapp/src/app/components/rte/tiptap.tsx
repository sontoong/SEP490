import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextEditorMenuBar from "./tiptap-menubar";
import { useEffect } from "react";
import Placeholder from "@tiptap/extension-placeholder";
import { Form } from "../form";

export default function Tiptap(props: TextEditorProps) {
  const { status } = Form.Item.useStatus();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder: props.placeholder,
        emptyEditorClass:
          "cursor-text before:content-[attr(data-placeholder)] before:absolute before:top-4 before:left-3 before:text-slate-400 before:text-[16px] before:opacity-50 before-pointer-events-none",
      }),
    ],
    content: props.value,
    onUpdate: ({ editor }) => {
      const content = editor.getText().trim() ? editor.getHTML() : "";
      props.onChange?.(content);
    },
    editorProps: {
      attributes: {
        class: `px-3 transition duration-300 min-h-[150px] cursor-text rounded-lg border border-gray-200 border-solid hover:ring-1 focus-within:outline-none ring-primary text-[16px] ${
          status === "error"
            ? "!ring-[#ff4d4f] border-[#ff4d4f] hover:border-red-300 hover:ring-0 focus-within:!border-[#ff4d4f]"
            : "border-gray-200 ring-primary focus-within:ring-1"
        }`,
      },
    },
  });

  useEffect(() => {
    if (editor && !editor.isDestroyed && editor.getHTML() !== props.value) {
      editor?.commands.setContent(props.value ?? null);
    }
  }, [editor, props.value]);

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
  placeholder?: string;
};
