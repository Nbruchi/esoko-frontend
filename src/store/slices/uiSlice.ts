import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UiState {
    theme: "light" | "dark";
    sidebarOpen: boolean;
    searchOpen: boolean;
    notificationsOpen: boolean;
    mobileMenuOpen: boolean;
}

const initialState: UiState = {
    theme: "light",
    sidebarOpen: false,
    searchOpen: false,
    notificationsOpen: false,
    mobileMenuOpen: false,
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<"light" | "dark">) => {
            state.theme = action.payload;
        },
        toggleSidebar: (state) => {
            state.sidebarOpen = !state.sidebarOpen;
        },
        toggleSearch: (state) => {
            state.searchOpen = !state.searchOpen;
        },
        toggleNotifications: (state) => {
            state.notificationsOpen = !state.notificationsOpen;
        },
        toggleMobileMenu: (state) => {
            state.mobileMenuOpen = !state.mobileMenuOpen;
        },
    },
});

export const {
    setTheme,
    toggleSidebar,
    toggleSearch,
    toggleNotifications,
    toggleMobileMenu,
} = uiSlice.actions;

export default uiSlice.reducer;
