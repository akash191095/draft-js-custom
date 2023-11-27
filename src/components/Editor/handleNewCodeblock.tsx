import { EditorState } from "draft-js";
import changeCurrentBlockType from "./changeCurrentBlockType";
import { insertEmptyBlock } from "./editorUtils";

const handleNewCodeBlock = (editorState: EditorState) => {
  const contentState = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  const key = selection.getStartKey();
  const currentBlock = contentState.getBlockForKey(key);
  const matchData = /^```([\w-]+)?$/.exec(currentBlock.getText());
  const isLast = selection.getEndOffset() === currentBlock.getLength();
  if (matchData && isLast) {
    const data = {};
    const language = matchData[1];
    if (language) {
      // @ts-expect-error ignore
      data.language = language;
    }
    return changeCurrentBlockType(editorState, "code-block", "", data);
  }
  const type = currentBlock.getType();
  if (type === "code-block" && isLast) {
    return insertEmptyBlock(editorState, "code-block", currentBlock.getData());
  }
  return editorState;
};

export default handleNewCodeBlock;
