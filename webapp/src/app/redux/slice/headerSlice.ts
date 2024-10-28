import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HeaderState {
  paths?: { title?: string; path?: string }[];
}

const initialState: HeaderState = {
  paths: [{ title: "", path: "" }],
};
export const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    setHeaderTitle: (state, action: PayloadAction<HeaderState["paths"]>) => {
      state.paths = action.payload;
    },
  },
});

export const { setHeaderTitle } = headerSlice.actions;

export default headerSlice.reducer;
