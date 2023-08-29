import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createProduct, deleteProduct, getProducts } from '../api/products';
import { Product } from '../types/Product';

type ProductState = {
  products: Product[],
  loading: boolean,
}

const initialState = {
  products: [],
  loading: false,
} as ProductState;

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  return await getProducts();
});

export const addProduct = createAsyncThunk('products/add',
  async (newProduct: Omit<Product, 'id'>) => {
    return await createProduct(newProduct);
  }
);

export const removeProduct = createAsyncThunk('products/remove',
  async (productId: number) => {
    const deletedProd = await deleteProduct(productId);
    console.log(deletedProd);
    return productId;
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products = [...state.products, action.payload];
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        console.log(action);
        state.products = state.products.filter(product => product.id !== action.payload);
        console.log(state.products);
        
      })
  },
});

export default productSlice.reducer;
export const { actions } = productSlice;
