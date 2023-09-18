import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: ICartState = {
  cart: [],
  shippingOption: "",
  shippingCost: 0,
  discountCode: "",
  subtotal: 0,
  total: 0,
  billingAddress: {},
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const selectedProduct = state.cart.find(
        (product) => product.id === action.payload.id
      );
      if (!selectedProduct) {
        const product = { ...action.payload, quantity: 1 };
        state.cart.push(product);
      } else {
        if (selectedProduct.quantity) {
          selectedProduct.quantity += 1;
        } else {
          selectedProduct.quantity = 1;
        }
        state.cart = state.cart.map((product) =>
          product.id === selectedProduct.id ? selectedProduct : product
        );
      }
      state.subtotal = state.cart.reduce(
        (acc, curr) => acc + curr.price * (curr.quantity || 0),
        0
      );
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const existingItemIndex = state.cart.findIndex((item) => item.id === id);
      if (existingItemIndex !== -1) {
        const item = state.cart[existingItemIndex];
        if (item.quantity && item.quantity === 1) {
          state.cart.splice(existingItemIndex, 1);
        } else if (item.quantity) {
          item.quantity--;
        }
        state.subtotal = state.cart.reduce(
          (acc, curr) => acc + curr.price * (curr.quantity || 0),
          0
        );
      }
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const selectedProduct = state.cart.find((product) => product.id === id);
      if (selectedProduct) {
        selectedProduct.quantity = quantity;
        state.cart = state.cart.map((product) =>
          product.id === selectedProduct.id ? selectedProduct : product
        );
        state.subtotal = state.cart.reduce(
          (acc, curr) => acc + curr.price * (curr.quantity || 0),
          0
        );
      }
    },
    clearCart: (state) => {
      state.cart = [];
      state.shippingOption = "";
      state.shippingCost = 0;
      state.discountCode = "";
      state.subtotal = 0;
      state.total = 0;
    },
    setShippingOption: (state, action) => {
      state.shippingOption = action.payload;
    },
    setShippingCost: (state, action) => {
      state.shippingCost = action.payload;
    },
    setDiscountCode: (state, action) => {
      state.discountCode = action.payload;
    },
    setSubtotal: (state) => {
      state.subtotal = state.cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
    },
    setTotal: (state) => {
      state.total = state.subtotal + state.shippingCost;
      if (state.discountCode === "EXAMPLE10") {
        state.total *= 0.9;
      }
    },
    applyDiscountCode: (state, action) => {
      const { discountCode } = action.payload;
      if (discountCode === "EXAMPLE10") {
        state.discountCode = discountCode;
        state.total *= 0.9;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  setShippingOption,
  setShippingCost,
  setDiscountCode,
  setSubtotal,
  setTotal,
  applyDiscountCode,
} = cartSlice.actions;
export default cartSlice.reducer;
