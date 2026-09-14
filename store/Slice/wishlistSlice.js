import { createSlice } from "@reduxjs/toolkit";

export const wishlistSlice = createSlice({
    name: "wishlist",

    initialState: {
        UserID: 1,
        wishlistItems: []
    },
    reducers: {

        addToWishlist: (state, action) => {
            let newItem = {
                id: action.payload.id,
                title: action.payload.title,
                price: action.payload.price,
                thumbnail: action.payload.thumbnail,
                availabilityStatus: action.payload.availabilityStatus,
            };
            state.wishlistItems = [...state.wishlistItems, newItem];
        }
        , removeFromWishlist: (state, action) => {
            state.wishlistItems = state.wishlistItems.filter((product) => product.id !== action.payload);
        },
    },
});
export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;