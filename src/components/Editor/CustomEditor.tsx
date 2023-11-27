import "draft-js/dist/Draft.css";

import { convertFromRaw, convertToRaw } from "draft-js";
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
  const [editorState, setEditorState] = useState(() => {
    let initialEditorState = null;
    const savedData = localStorage.getItem("draftRaw");
    if (savedData) {
      const rawContentFromStore = convertFromRaw(JSON.parse(savedData));
      initialEditorState = EditorState.createWithContent(rawContentFromStore);
    } else {
      initialEditorState = EditorState.createEmpty();
    }

    return initialEditorState;
  });
  const [editor, setEditor] = useState<Editor | null>(null);

  useEffect(() => {
    editor?.focus();
  }, [editor]);

  function saveToLocalhost() {
    const contentRaw = convertToRaw(editorState.getCurrentContent());
    localStorage.setItem("draftRaw", JSON.stringify(contentRaw));
  }

  return (
    <>
      <button className={styles.saveButton} onClick={saveToLocalhost}>
        Save
      </button>
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
    </>
  );
}

export default CustomEditor;
