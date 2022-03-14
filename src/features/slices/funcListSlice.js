import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getFuncs = createAsyncThunk(
  'funcs/getFuncs',
  //async func goes here
  async () => {

    try {
      const data = await fetch('http://localhost:1111/aws/getLambdaFunctions', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          region: 'us-east-1',
          credentials: {
            accessKeyId: '',
            secretAccessKey: ''
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

// const res = Promise.resolve(data()).then(res => {dispatch({ type: 'listChange', payload: res })}).catch(err => console.log(err))

//createSlice already makes an action creator for each of the difference methods inside our reducers//
export const { listChange } = funcList.actions;
//exporting your reducer//
export default funcList.reducer;