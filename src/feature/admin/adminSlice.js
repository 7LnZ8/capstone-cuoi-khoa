import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
  token: null,
  ghiDanh: null,
};

const adminSlice = createSlice({
  name: "adminSlice",
  initialState,
  reducers: {},
});

export const {} = adminSlice.actions;

export default adminSlice.reducer;
