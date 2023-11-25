import "draft-js/dist/Draft.css";

import { Editor, EditorState } from "draft-js";
import { useEffect, useState } from "react";

import styles from "./customEditor.module.css";

function CustomEditor() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [editor, setEditor] = useState<Editor | null>(null);

  useEffect(() => {
    editor?.focus();
  }, [editor]);

  return (
    <div className={styles.container}>
      <Editor
        ref={(editor) => setEditor(editor)}
        editorState={editorState}
        onChange={setEditorState}
        placeholder="Start writing..."
      />
    </div>
  );
}

export default CustomEditor;
