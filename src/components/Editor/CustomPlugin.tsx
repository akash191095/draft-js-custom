import { checkCharacterForState, insertEmptyBlock } from "./editorUtils";

import { EditorState } from "draft-js";
import { Map } from "immutable";
import styles from "./customEditor.module.css";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomComponent(props: any) {
  return <span className={styles.heading} {...props}></span>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Bold(props: any) {
  return <span className={styles.bold} {...props}></span>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function RedLine(props: any) {
  return <span className={styles.redLine} {...props}></span>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function UnderLine(props: any) {
  return <span className={styles.underline} {...props}></span>;
}

const createCustomPlugin = () => {
  const store = {};
  return {
    store,
    blockRenderMap: Map({
      HEADING: {
        element: "h1",
        wrapper: <CustomComponent />,
      },
      BOLD: {
        element: "span",
        wrapper: <Bold />,
      },
      REDLINE: {
        element: "span",
        wrapper: <RedLine />,
      },
      UNDERLINE: {
        element: "span",
        wrapper: <UnderLine />,
      },
    }),
    // @ts-expect-error no types
    initialize({ setEditorState, getEditorState }) {
      // @ts-expect-error ignore
      store.setEditorState = setEditorState;
      // @ts-expect-error ignore
      store.getEditorState = getEditorState;
    },
    handleBeforeInput(character: string, editorState: EditorState) {
      if (character.match(/[A-z0-9_*~`]/)) {
        return "not-handled";
      }
      const newEditorState = checkCharacterForState(editorState, character);
      if (editorState !== newEditorState) {
        // @ts-expect-error ignore
        store.setEditorState(newEditorState);
        return "handled";
      }
      return "not-handled";
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleReturn(_ev: any, editorState: EditorState) {
      const newEditorState = insertEmptyBlock(editorState);
      if (editorState !== newEditorState) {
        // @ts-expect-error ignore
        store.setEditorState(newEditorState);
        return "handled";
      }
      return "not-handled";
    },
  };
};

export default createCustomPlugin;
