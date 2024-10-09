import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HeaderState {
  headerTitle: { title?: string; path?: string };
}

const initialState: HeaderState = {
  headerTitle: { title: "", path: "" },
};
export const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    setHeaderTitle: (
      state,
      action: PayloadAction<HeaderState["headerTitle"]>,
    ) => {
      state.headerTitle = action.payload;
    },
  },
});

export const { setHeaderTitle } = headerSlice.actions;

export default headerSlice.reducer;
