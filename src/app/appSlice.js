import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
    name: 'app',
    initialState: { userName: 'Guest' },
});

export default appSlice.reducer;
