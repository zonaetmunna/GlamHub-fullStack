import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart/cartSlice";
import wishlistSlice from "./wishlist/wishlistSlice";

export const store = configureStore({
  reducer: {
    // [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSlice,
    wishlist: wishlistSlice,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
