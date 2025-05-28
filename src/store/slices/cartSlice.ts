import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "@/types";

interface CartState {
    items: CartItem[];
    isOpen: boolean;
}

const initialState: CartState = {
    items: [],
    isOpen: false,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCartItems: (state, action: PayloadAction<CartItem[]>) => {
            state.items = action.payload;
        },
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.items.find(
                (item) => item.productId === action.payload.productId
            );
            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
        },
        updateCartItem: (
            state,
            action: PayloadAction<{ productId: string; quantity: number }>
        ) => {
            const item = state.items.find(
                (item) => item.productId === action.payload.productId
            );
            if (item) {
                item.quantity = action.payload.quantity;
            }
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(
                (item) => item.productId !== action.payload
            );
        },
        clearCart: (state) => {
            state.items = [];
        },
        toggleCart: (state) => {
            state.isOpen = !state.isOpen;
        },
    },
});

export const {
    setCartItems,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    toggleCart,
} = cartSlice.actions;

export default cartSlice.reducer;
