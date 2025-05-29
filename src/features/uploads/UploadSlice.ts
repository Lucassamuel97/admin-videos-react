import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

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

type UploadProgress = {
    id: string;
    progress: number;
};

const initialState: UploadState[] = [];

const uploadsSlice = createSlice({
    name: "uploads",
    initialState,
    reducers: {
        addUpload(state, action: PayloadAction<UploadState>) {
            state.push({ ...action.payload, status: "idle", progress: 0 });
        },
        removeUpload(state, action: PayloadAction<string>) {
            const index = state.findIndex((upload) => upload.id === action.payload);
            if (index !== -1) {
                state.splice(index, 1);
            }
        },
        setUploadProgress(state, action: PayloadAction<UploadProgress>) {
            const { id, progress } = action.payload;
            const upload = state.find((upload) => upload.id === id);

            if (upload) {
                upload.progress = progress;
            }
        },
    },
});

export const {
    addUpload,
    removeUpload,
    setUploadProgress,
} = uploadsSlice.actions;


// selector
export const selectUploads = (state: RootState) => state.uploadSlice;

export const uploadReducer = uploadsSlice.reducer;