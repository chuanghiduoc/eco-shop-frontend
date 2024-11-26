/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetProducts } from "@/services/product";

interface Product {
  id: string;
  name: string;
  price: number;
  // Add other relevant fields
 }
 
 interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
 }

 export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiGetProducts();
      if (response.data.message === "success") {

        // Extract products from the response
        const { products } = response.data.data;
        return Array.isArray(products) ? products : [];
      } else {
        return rejectWithValue("Failed to fetch products");
      }
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);


const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
 };

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearProducts: (state) => {
      state.products = [];
    }
  },
  extraReducers: (builder) => {
    // Handling products fetching
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "An unknown error occurred";
      });
  },
});

export const { clearProducts } = productSlice.actions;
export default productSlice.reducer;
