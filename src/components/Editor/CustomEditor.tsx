import "draft-js/dist/Draft.css";

import { useEffect, useState } from "react";

import Editor from "@draft-js-plugins/editor";
import { EditorState } from "draft-js";
import createCustomPlugin from "./CustomPlugin";
import styles from "./customEditor.module.css";

const plugins = [createCustomPlugin()];

const styleMap = {
  HEADING: {
    textDecoration: "line-through",
  },
};

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
        plugins={plugins}
        customStyleMap={styleMap}
      />
    </div>
  );
}

export default CustomEditor;
