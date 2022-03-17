import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const userCreds = createSlice({
  name: 'userCreds',
  initialState: {
    region: '',
    credentials: {
      accessKeyId: '',
      secretAccessKey: '',
    }
  },
  reducers: {
    getBackendCreds: (state, action) => {
      state.region = action.payload.region;
      state.credentials.accessKeyId = action.payload.credentials.accessKeyId;
      state.credentials.secretAccessKey = action.payload.credentials.secretAccessKey;
    }
  }
});


export const { getBackendCreds } = userCreds.actions;
export default userCreds.reducer;