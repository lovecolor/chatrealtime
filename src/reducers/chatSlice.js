import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


 





const chatSlice = createSlice({
    name: 'mess',
    initialState: [],
    reducers: {
        add: (state,action) => {
            state.push(action.payload)
        },
        
    },
    
  });
  
  const { reducer:chatReducer ,actions} = chatSlice;
  export const { add} = actions;
  export default chatReducer;