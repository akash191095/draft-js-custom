import { ContentBlock, EditorState, Modifier, genKey } from "draft-js";
import { List, Map } from "immutable";

import changeCurrentBlockType from "./changeCurrentBlockType";
import handleBlockType from "./handleBlockType";

export const insertEmptyBlock = (
  editorState: EditorState,
  blockType = "unstyled",
  data = {}
) => {
  const contentState = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  const key = selection.getStartKey();
  const currentBlock = contentState.getBlockForKey(key);
  const emptyBlockKey = genKey();
  const emptyBlock = new ContentBlock({
    characterList: List(),
    depth: 0,
    key: emptyBlockKey,
    text: "",
    type: blockType,
    data: Map().merge(data),
  });
  const blockMap = contentState.getBlockMap();
  const blocksBefore = blockMap
    .toSeq()
    .takeUntil((value) => value === currentBlock);
  const blocksAfter = blockMap
    .toSeq()
    .skipUntil((value) => value === currentBlock)
    .rest();
  const augmentedBlocks = [
    [currentBlock.getKey(), currentBlock],
    [emptyBlockKey, emptyBlock],
  ];
  const newBlocks = blocksBefore
    .concat(augmentedBlocks, blocksAfter)
    .toOrderedMap();
  const focusKey = emptyBlockKey;
  const newContentState = contentState.merge({
    blockMap: newBlocks,
    selectionBefore: selection,
    selectionAfter: selection.merge({
      anchorKey: focusKey,
      anchorOffset: 0,
      focusKey,
      focusOffset: 0,
      isBackward: false,
    }),
  });
  //   @ts-expect-error ignore
  return EditorState.push(editorState, newContentState, "split-block");
};

export function checkCharacterForState(
  editorState: EditorState,
  character: string
): EditorState {
  const newEditorState = handleBlockType(editorState, character);
  return newEditorState;
}

const insertText = (editorState: EditorState, text: string) => {
  const selection = editorState.getSelection();
  const content = editorState.getCurrentContent();
  const newContentState = Modifier.insertText(
    content,
    selection,
    text,
    editorState.getCurrentInlineStyle()
  );
  return EditorState.push(editorState, newContentState, "insert-fragment");
};

export default insertText;

export function checkReturnForState(editorState: EditorState) {
  let newEditorState = editorState;
  const contentState = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  const key = selection.getStartKey();
  const currentBlock = contentState.getBlockForKey(key);
  const type = currentBlock.getType();
  const text = currentBlock.getText();

  if (type === "CODE_BLOCK") {
    if (/```\s*$/.test(text)) {
      newEditorState = changeCurrentBlockType(newEditorState, type, "");
      newEditorState = insertEmptyBlock(newEditorState);
    }
  } else {
    newEditorState = insertEmptyBlock(editorState);
  }
  return newEditorState;
}
