import { EditorState } from "draft-js";
import changeCurrentBlockType from "./changeCurrentBlockType";

const sharps = (len: number) => {
  let ret = "";
  while (ret.length < len) {
    ret += "#";
  }
  return ret;
};

const blockTypes = [
  null,
  "HEADING",
  "header-two",
  "header-three",
  "header-four",
  "header-five",
  "header-six",
];

const handleBlockType = (editorState: EditorState, character: string) => {
  const currentSelection = editorState.getSelection();
  const key = currentSelection.getStartKey();
  const text = editorState.getCurrentContent().getBlockForKey(key).getText();
  const position = currentSelection.getAnchorOffset();
  const line = [text.slice(0, position), character, text.slice(position)].join(
    ""
  );

  for (let i = 1; i <= 6; i += 1) {
    if (line.indexOf(`${sharps(i)} `) === 0) {
      return changeCurrentBlockType(
        editorState,
        // @ts-expect-error ignore
        blockTypes[i],
        line.replace(/^#+\s/, "")
      );
    }
  }

  if (line === "* ") {
    return changeCurrentBlockType(editorState, "BOLD", "");
  }
  if (line === "** ") {
    return changeCurrentBlockType(editorState, "REDLINE", "");
  }
  if (line === "*** ") {
    return changeCurrentBlockType(editorState, "UNDERLINE", "");
  }
  return editorState;
};

export default handleBlockType;
