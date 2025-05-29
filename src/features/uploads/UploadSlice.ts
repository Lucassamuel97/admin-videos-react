import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const STATUS = {
  IDDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  FAILED: "failed",
} as const;

export type Status = typeof STATUS[keyof typeof STATUS];

export interface UploadState {
  id: string;
  file: File;
  field: string;
  videoId: string;
  progress?: number;
  status?: Status;
}

const initialState: UploadState[] = [];

const uploadsSlice = createSlice({
  name: "uploads",
  initialState,
  reducers: {},
});

export const uploadReducer = uploadsSlice.reducer;