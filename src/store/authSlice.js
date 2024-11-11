// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  shopAccessToken: localStorage.getItem('shopAccessToken') || null,
  isShopAccessTokenValid: false,
};

// Create auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action to set the token
    setToken: (state, action) => {
      state.shopAccessToken = action.payload;
    },
    // Action to set token validity (true/false)
    setTokenValid: (state, action) => {
      state.isShopAccessTokenValid = action.payload;
    },
    // Action to clear the token (e.g., on logout)
    clearToken: (state) => {
      state.shopAccessToken = null;
      state.isShopAccessTokenValid = false;
    },
  },
});

// Export actions
export const { setToken, setTokenValid, clearToken } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
