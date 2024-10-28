// import { Envs } from "../utils/env";

import { useState } from "react";
import { TextEditor } from "../components/rte";
import { Input } from "../components/inputs";

export default function TestPage() {
  const [text, setText] = useState<string>();

  return (
    <>
      <TextEditor value={text} onChange={setText} />
      <Input.TextArea />
    </>
  );
}
