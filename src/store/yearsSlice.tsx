import { createSlice } from '@reduxjs/toolkit';
import { getMinYear, getMaxYear } from '../api/booksThunks';

type YearState = {
  minYear: number;
  maxYear: number;
};

const initialState: YearState = {
  minYear: 0,
  maxYear: 0,
};

export const yearsSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getMinYear.fulfilled, (state, action) => {
      state.minYear = action.payload.response.docs[0].year;
    });
    builder.addCase(getMaxYear.fulfilled, (state, action) => {
      state.maxYear = action.payload.response.docs[0].year;
    });
  },
});

export default yearsSlice.reducer;
