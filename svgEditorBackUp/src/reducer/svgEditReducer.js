import produce from "immer";
import { IMAGE_URL, SVG_STRING } from "../constants/actionTypes";

const initialState = {
  originalSvg: null,
  updatedSvg: null,
  imageUrl: null,
  history: {
    history: [],
    undoindex: 0,
  },
  colorMapper: {},
};

const svgEditReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case IMAGE_URL:
        draft.imageUrl = action.payload;
        break;
      case SVG_STRING:
        draft.originalSvg = action.payload;
        break;
      default:
        break;
    }
  });
};

export default svgEditReducer;
