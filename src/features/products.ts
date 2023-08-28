// import { createAsyncThunk, createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
// import {Product} from '../types/Product';
// import { getProducts } from '../api/products';

// export const init = createAsyncThunk('products/fetch', async () => {
//   return getProducts();
// });

// const initialState: Product[] = [];

// export const productsSlice = createSlice({
//   name: 'products',
//   initialState,
//   reducers: {
//   },
//   extraReducers: (builder) => {
//     builder.addCase(init.fulfilled, (state, action) => {
//       state.products = action.payload;
//     });
//   },
// });

// export default productsSlice.reducer;
// export const { actions } = productsSlice;
