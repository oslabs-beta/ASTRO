import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getFuncs = createAsyncThunk(
  'funcs/getFuncs',

  async (credentials) => {

    try {
      const data = await fetch('http://localhost:1111/aws/getLambdaFunctions', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          region: credentials.region,
          credentials: {
            accessKeyId: credentials.credentials.accessKeyId,
            secretAccessKey: credentials.credentials.secretAccessKey
          }
        })
      })
      
      const formattedResponse = await data.json();
      return formattedResponse;
    } 
    catch(e) {console.log(e)}
  } 
) 

export const funcList = createSlice({
  name: 'funcList',
  initialState: {
    funcList: []
  },
  extraReducers: {
    [getFuncs.fulfilled]: (state, action) => {
      state.funcList = action.payload;
    }
  }
});

//createSlice already makes an action creator for each of the different methods inside our reducers//
export const { listChange } = funcList.actions;
//exporting your reducer//
// do we need to export this again if we're already exporting the entire function it's part of?
export default funcList.reducer;