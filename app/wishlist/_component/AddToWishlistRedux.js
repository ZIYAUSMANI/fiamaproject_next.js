"use client";
import React, { useState } from "react";
import { Heart } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";

import WishlistModal from "@/component/modals/WishlistModal";
import { addToWishlist } from "@/store/Slice/wishlistSlice";


const AddToWishlistRedux = ({ product }) => {
    const [showModal, setShowModal] = useState(false);
    const [isAlreadyExists, setIsAlreadyExists] = useState(false);

    const dispatch = useDispatch();

    const { wishlistItems = [] } = useSelector(
        (state) => state.wishlist
    );

    const found = wishlistItems.some(
        (item) => item.id === product.id
    );

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleAddToWishlist = () => {
        if (found) {
            setIsAlreadyExists(true);
        } else {
            dispatch(addToWishlist(product));
            setIsAlreadyExists(false);
        }

        setShowModal(true);
    };

    return (
        <>
            <Heart
                className="text-white"
                onClick={handleAddToWishlist}
                style={{ cursor: "pointer" }}
            />

            <WishlistModal
                show={showModal}
                handleClose={handleCloseModal}
                product={product}
                isAlreadyExists={isAlreadyExists}
            />
        </>
    );
};

export default AddToWishlistRedux;