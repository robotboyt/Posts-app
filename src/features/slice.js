import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

export const slice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    onLoading: (state) => {
      state.loading = true;
    },
    offLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { onLoading, offLoading } = slice.actions;

export default slice.reducer;
